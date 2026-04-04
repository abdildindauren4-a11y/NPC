/**
 * imageGenService.ts
 * Орталық сурет генерация қызметі.
 * Фонда тыныш жұмыс жасайды — пайдаланушы басқа бөлімде не жасап жатқанына
 * байланысты емес. imagePrompt → imageUrl айналдырады.
 *
 * Архитектура:
 *  - generateSingleImage(prompt)  → base64 data URL немесе null
 *  - enrichGameWithImages(data)   → questions/cards/pairs ішіне imageUrl қосады
 *  - enrichAssessmentWithImages(tasks) → task ішіне imageUrl қосады
 *  - Concurrency: бір уақытта 2 сурет (rate limit үшін)
 *  - Cache: localStorage-та 24 сағат сақтайды (қайталану жоқ)
 */

// ─── Типтер ───────────────────────────────────────────────────────────────────

export interface ImageGenProgress {
  total: number;
  done: number;
  current?: string;
  status: 'idle' | 'running' | 'done' | 'error';
}

export type ProgressCallback = (p: ImageGenProgress) => void;

// ─── Кэш ──────────────────────────────────────────────────────────────────────

const CACHE_KEY = 'bilge_img_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 сағат

interface CacheEntry {
  url: string;
  ts: number;
}

const getCache = (): Record<string, CacheEntry> => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
};

const setCache = (cache: Record<string, CacheEntry>) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage толса өтіп кет
  }
};

const getCached = (prompt: string): string | null => {
  const cache = getCache();
  const key = prompt.toLowerCase().trim().slice(0, 120);
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    delete cache[key];
    setCache(cache);
    return null;
  }
  return entry.url;
};

const setCached = (prompt: string, url: string) => {
  const cache = getCache();
  const key = prompt.toLowerCase().trim().slice(0, 120);
  cache[key] = { url, ts: Date.now() };
  // Кэш өлшемін шектейміз (макс 50 жазба)
  const keys = Object.keys(cache);
  if (keys.length > 50) {
    const oldest = keys.sort((a, b) => cache[a].ts - cache[b].ts)[0];
    delete cache[oldest];
  }
  setCache(cache);
};

// ─── Негізгі генератор ────────────────────────────────────────────────────────

/**
 * Бір сурет генерациялайды.
 * Кэшті тексереді → server proxy арқылы жібереді → base64 data URL қайтарады.
 */
export const generateSingleImage = async (
  prompt: string,
  aspectRatio: string = '1:1'
): Promise<string | null> => {
  if (!prompt || prompt.trim().length < 3) return null;

  // Кэш тексеру
  const cached = getCached(prompt);
  if (cached) return cached;

  try {
    const apiKey = localStorage.getItem('GEMINI_API_KEY') ||
      localStorage.getItem('gemini_api_key') ||
      localStorage.getItem('IMAGE_GEN_API_KEY') || '';

    const response = await fetch('/api/gemini/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Educational illustration, clean and clear: ${prompt}. Style: flat design, bright colors, suitable for school textbook.`,
        aspectRatio,
        apiKey: apiKey.trim(),
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const url = data.imageUrl || null;

    if (url) {
      setCached(prompt, url);
    }

    return url;
  } catch (err) {
    console.warn('ImageGen: generation failed for prompt:', prompt.slice(0, 50), err);
    return null;
  }
};

// ─── Concurrency утилита ──────────────────────────────────────────────────────

const runWithConcurrency = async <T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
  onEach?: (index: number) => void
): Promise<R[]> => {
  const results: R[] = new Array(items.length);
  let idx = 0;

  const worker = async () => {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i], i);
      onEach?.(i);
      // Rate limit: 800ms арасы
      await new Promise(r => setTimeout(r, 800));
    }
  };

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker);
  await Promise.all(workers);
  return results;
};

// ─── Ойын деректерін суретпен байыту ─────────────────────────────────────────

/**
 * Ойын деректеріндегі imagePrompt → imageUrl айналдырады.
 * Kahoot, Flashcards, Memory, TrueFalse, Matching типтерін қолдайды.
 * Өзгеріс болмаса бастапқы объектіні қайтарады.
 */
export const enrichGameWithImages = async (
  gameData: any,
  onProgress?: ProgressCallback
): Promise<any> => {
  if (!gameData) return gameData;

  const type = gameData.type?.toLowerCase();

  // Web ойындарды өткізіп жіберу (олардың өз логикасы бар)
  if (type === 'web') return gameData;

  // Сурет бар элементтерді жинау
  interface ImageItem {
    obj: any;
    field: string;
  }

  const items: ImageItem[] = [];

  if (type === 'kahoot' && Array.isArray(gameData.questions)) {
    gameData.questions.forEach((q: any) => {
      if (q.imagePrompt && !q.imageUrl) items.push({ obj: q, field: 'imagePrompt' });
    });
  }
  if (type === 'flashcards' && Array.isArray(gameData.cards)) {
    gameData.cards.forEach((c: any) => {
      if (c.imagePrompt && !c.imageUrl) items.push({ obj: c, field: 'imagePrompt' });
    });
  }
  if (type === 'memory' && Array.isArray(gameData.cards)) {
    // Memory: жұп карталар — тек бірінші жартысын генерациялаймыз
    const seen = new Set<string>();
    gameData.cards.forEach((c: any) => {
      if (c.imagePrompt && !c.imageUrl && !seen.has(c.imagePrompt)) {
        seen.add(c.imagePrompt);
        items.push({ obj: c, field: 'imagePrompt' });
      }
    });
  }
  if (type === 'truefalse' && Array.isArray(gameData.questions)) {
    gameData.questions.forEach((q: any) => {
      if (q.imagePrompt && !q.imageUrl) items.push({ obj: q, field: 'imagePrompt' });
    });
  }
  if (type === 'matching' && Array.isArray(gameData.pairs)) {
    gameData.pairs.forEach((p: any) => {
      if (p.imagePrompt && !p.imageUrl) items.push({ obj: p, field: 'imagePrompt' });
    });
  }

  if (items.length === 0) return gameData;

  onProgress?.({ total: items.length, done: 0, status: 'running' });

  let done = 0;
  await runWithConcurrency(
    items,
    2, // Бір уақытта 2 сурет
    async (item) => {
      const url = await generateSingleImage(item.obj[item.field]);
      if (url) item.obj.imageUrl = url;
    },
    () => {
      done++;
      onProgress?.({
        total: items.length,
        done,
        status: done < items.length ? 'running' : 'done',
      });
    }
  );

  // Memory: жұп карталарға бірдей imageUrl қою
  if (type === 'memory' && Array.isArray(gameData.cards)) {
    const promptToUrl: Record<string, string> = {};
    gameData.cards.forEach((c: any) => {
      if (c.imageUrl && c.imagePrompt) promptToUrl[c.imagePrompt] = c.imageUrl;
    });
    gameData.cards.forEach((c: any) => {
      if (!c.imageUrl && c.imagePrompt && promptToUrl[c.imagePrompt]) {
        c.imageUrl = promptToUrl[c.imagePrompt];
      }
    });
  }

  onProgress?.({ total: items.length, done: items.length, status: 'done' });
  return { ...gameData };
};

// ─── БЖБ/ТЖБ тапсырмаларын суретпен байыту ───────────────────────────────────

/**
 * AssessmentData.tasks ішіндегі imagePrompt → imageUrl.
 * Тек imagePrompt бар және imageUrl жоқ тапсырмаларды өңдейді.
 */
export const enrichAssessmentWithImages = async (
  tasks: any[],
  onProgress?: ProgressCallback
): Promise<any[]> => {
  if (!tasks || tasks.length === 0) return tasks;

  const toProcess = tasks.filter(
    (t: any) => t.imagePrompt && !t.imageUrl && t.imagePrompt.trim().length > 3
  );

  if (toProcess.length === 0) return tasks;

  onProgress?.({ total: toProcess.length, done: 0, status: 'running' });

  let done = 0;
  await runWithConcurrency(
    toProcess,
    2,
    async (task) => {
      const url = await generateSingleImage(task.imagePrompt, '16:9');
      if (url) task.imageUrl = url;
    },
    () => {
      done++;
      onProgress?.({
        total: toProcess.length,
        done,
        status: done < toProcess.length ? 'running' : 'done',
      });
    }
  );

  onProgress?.({ total: toProcess.length, done: toProcess.length, status: 'done' });
  return [...tasks];
};

// ─── Сурет жүктелу статусы утилитасы ─────────────────────────────────────────

/** Ойын типі суретті қолдайды ма? */
export const gameTypeSupportsImages = (type: string): boolean => {
  return ['kahoot', 'flashcards', 'memory', 'truefalse', 'matching'].includes(
    type?.toLowerCase() || ''
  );
};

/** imagePrompt бар элементтер санын есептейді */
export const countImagePrompts = (gameData: any): number => {
  if (!gameData) return 0;
  const type = gameData.type?.toLowerCase();
  if (type === 'kahoot') return (gameData.questions || []).filter((q: any) => q.imagePrompt).length;
  if (type === 'flashcards') return (gameData.cards || []).filter((c: any) => c.imagePrompt).length;
  if (type === 'memory') {
    const seen = new Set<string>();
    (gameData.cards || []).forEach((c: any) => { if (c.imagePrompt) seen.add(c.imagePrompt); });
    return seen.size;
  }
  if (type === 'truefalse') return (gameData.questions || []).filter((q: any) => q.imagePrompt).length;
  if (type === 'matching') return (gameData.pairs || []).filter((p: any) => p.imagePrompt).length;
  return 0;
};

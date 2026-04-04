/**
 * GameLabView.tsx — Ойын Зертханасы
 * 4-сатылы AI агент pipeline:
 *   Агент 1: Талдаушы   — мұғалім сұранысын терең талдайды
 *   Агент 2: Дизайнер   — ойын тұжырымдамасын жасайды
 *   Агент 3: Архитект   — техникалық жоспар + UX спецификациясы
 *   Агент 4: Кодер      — 2000+ жол толық ойын коды
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import {
  Beaker,
  Sparkles,
  Brain,
  Palette,
  Code2,
  Play,
  ChevronRight,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  Share2,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Lightbulb,
  Target,
  Layers,
  Zap,
  BookOpen,
  RotateCcw,
  Eye,
  EyeOff,
  Download,
  Monitor,
  Tablet,
  Smartphone,
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { callGemini } from '../services/ai-api';
import { safeJsonParse } from '../lib/ai-utils';
import { ImageEnrichmentBadge } from '../components/Common/ImageEnrichmentBadge';
import { ImageGenProgress } from '../services/imageGenService';

// ─── Типтер ───────────────────────────────────────────────────────────────────

interface AgentStep {
  id: 'analyzer' | 'designer' | 'architect' | 'coder';
  label: string;
  labelKz: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

type StepStatus = 'idle' | 'running' | 'done' | 'error';

interface StepState {
  status: StepStatus;
  output: string;
  error?: string;
  startTime?: number;
  duration?: number;
}

interface GameLabState {
  analyzer: StepState;
  designer: StepState;
  architect: StepState;
  coder: StepState;
}

interface ParsedGame {
  type: string;
  html: string;
  css: string;
  js: string;
  instructions?: string;
}

interface GameLabViewProps {
  isApiOk: boolean;
  onOpenApiModal: () => void;
  addNotification: (title: string, message: string, type: string) => void;
  showToast: (message: string) => void;
}

// ─── Константтар ──────────────────────────────────────────────────────────────

const AGENT_STEPS: AgentStep[] = [
  {
    id: 'analyzer',
    label: 'Analyzer',
    labelKz: 'Талдаушы',
    icon: <Brain size={18} />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    borderColor: 'border-violet-200 dark:border-violet-800',
    description: 'Сұранысты терең талдайды, мақсатты анықтайды',
  },
  {
    id: 'designer',
    label: 'Designer',
    labelKz: 'Дизайнер',
    icon: <Palette size={18} />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    description: 'Ойын тұжырымдамасы мен дизайн жоспарын жасайды',
  },
  {
    id: 'architect',
    label: 'Architect',
    labelKz: 'Архитект',
    icon: <Layers size={18} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    description: 'Техникалық спецификация мен код жоспарын қалыптастырады',
  },
  {
    id: 'coder',
    label: 'Coder',
    labelKz: 'Кодер',
    icon: <Code2 size={18} />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    description: '2000+ жол HTML/CSS/JS ойын коды',
  },
];

const EXAMPLE_PROMPTS = [
  { emoji: '🌍', text: 'Қазақстан картасы бойынша географиялық викторина жаса, 8-сынып үшін, облыстарды дұрыс орналастыру керек' },
  { emoji: '⚗️', text: 'Химия элементтерін таблица бойынша үйрететін drag-and-drop ойын, 9-сынып' },
  { emoji: '🔢', text: 'Математика: бөлшектерді жинайтын аркада ойны, 6-сынып үшін, 3 деңгейлі' },
  { emoji: '📜', text: 'Қазақ хандығының тарихы бойынша интерактивті хронология ойыны, оқиғаларды дұрыс ретке қою керек' },
  { emoji: '🔬', text: 'Биология: жасуша бөліктерін орналастыру (drag & label), анимациямен, 8-сынып' },
  { emoji: '🎯', text: 'Орыс тілі: сөздерді дұрыс сөйлем ретіне қою, 5-сынып, ойнатқылы тапсырмалар' },
];

// ─── Агент промпттары ─────────────────────────────────────────────────────────

const buildAnalyzerPrompt = (userRequest: string): string => `
Сен — білім беру ойындарының сарапшысы. Мұғалімнің сұранысын терең талда.

СҰРАНЫС: "${userRequest}"

Қазақша толық талдау жаз (Markdown форматында):

## 🎯 Негізгі мақсат
(Ойынның оқу мақсаты не? Қандай білік пен дағды дамытылады?)

## 👥 Аудитория
(Жас, сынып, білім деңгейі, ерекшеліктер)

## 🧩 Ойын механикасы
(Қандай ойын механикасы оқу мақсатына сай? 3-5 нұсқа ұсын)

## 🏆 Геймификация элементтері
(Ұпай, деңгей, прогресс, жетістік белгілері)

## 🎨 Визуалды стиль ұсынысы
(Түстер, стиль, характерлер, анимациялар)

## ⚠️ Техникалық шектеулер
(Не мүмкін, не мүмкін емес браузерде)

## ✅ Жетістік көрсеткіштері
(Оқушы ойыннан кейін не білуі керек?)
`.trim();

const buildDesignerPrompt = (userRequest: string, analyzerOutput: string): string => `
Сен — UI/UX дизайнер және ойын дизайнері. Талдау нәтижесі негізінде толық дизайн жоспарын жаса.

БАСТАПҚЫ СҰРАНЫС: "${userRequest}"

ТАЛДАУШЫ АГЕНТ НӘТИЖЕСІ:
${analyzerOutput}

Қазақша толық дизайн спецификациясын жаз (Markdown форматында):

## 🎮 Ойын атауы және тұжырымдама
(Атауы, слоган, қысқаша сипаттама)

## 🖥️ Экран макеті (Layout)
Әр экран/бетті егжей-тегжейлі сипатта:
- Бастапқы экран (Start Screen): не бар, қайда орналасқан
- Ойын экраны (Game Screen): UI элементтері, батырмалар, индикаторлар
- Нәтиже экраны (Result Screen): не көрсетіледі

## 🎨 Дизайн жүйесі
- Негізгі түс палитрасы (hex кодтары)
- Шрифт стилі
- Батырмалар стилі
- Анимация принциптері

## 🕹️ Ойын флоу (User Flow)
1. Оқушы ойынды ашады → не болады
2. Ойын барысындағы негізгі интеракциялар
3. Ойын аяқталғандағы флоу

## 🏅 Геймификация детальдары
- Ұпай есептеу алгоритмі
- Деңгейлер жүйесі (егер бар болса)
- Жетістік белгілері (badge) дизайны
- Прогресс индикаторы

## 📱 Responsive дизайн
- Мобильдегі макет
- Планшеттегі макет
- Десктоптегі макет
`.trim();

const buildArchitectPrompt = (userRequest: string, designOutput: string): string => `
Сен — senior frontend архитект. Дизайн спецификациясы негізінде толық техникалық жоспар жаса.

БАСТАПҚЫ СҰРАНЫС: "${userRequest}"

ДИЗАЙН СПЕЦИФИКАЦИЯСЫ:
${designOutput}

Қазақша техникалық архитектура жаз (Markdown форматында):

## 🏗️ Техникалық стек
- HTML5 семантикалық тэгтер тізімі
- CSS: Tailwind utility classes + custom CSS (конкретті класс атаулары)
- JavaScript: ES6+ функциялар, state management

## 📦 Деректер структурасы (Data Model)
\`\`\`javascript
// Конкретті JS object/array структурасы
const GAME_DATA = { ... }
const GAME_STATE = { ... }
\`\`\`

## ⚙️ Негізгі функциялар тізімі
Барлық функцияларды толық атымен жаз:
- initGame() — не жасайды
- renderQuestion(index) — не жасайды
- checkAnswer(answer) — не жасайды
- updateScore(points) — не жасайды
- [т.б. барлық функциялар]

## 🎬 Анимациялар
Конкретті CSS animation/transition код үзінділері

## 🔊 Дыбыс эффектілері
Web Audio API арқылы қалай жасалады (код үзіндісі)

## 🔄 Event handlers тізімі
- onClick, onDrag, onKeyPress т.б.

## 📐 Код структурасы
\`\`\`
HTML: 
  - <head> → meta, title, CDN
  - <body> → 3 негізгі section (start, game, result)
  
CSS (Tailwind + custom):
  - :root variables
  - animations keyframes
  - component styles

JS:
  - Constants (30 жол)
  - Data (50 жол) 
  - State management (40 жол)
  - UI functions (400+ жол)
  - Game logic (500+ жол)
  - Event listeners (100+ жол)
  - Init (50 жол)
\`\`\`

## ✅ Код сапа чек-листі
- [ ] Mobile-first responsive
- [ ] Accessibility (aria labels)
- [ ] Error handling
- [ ] Performance (requestAnimationFrame)
- [ ] Memory leaks жоқ
`.trim();

const buildCoderPrompt = (userRequest: string, architectOutput: string): string => `
Сен — junior developer емес, senior full-stack developer. Архитектуралық жоспар негізінде ТОЛЫҚ, ЖҰМЫС ІСТЕЙТІН ойын коды жаз.

БАСТАПҚЫ СҰРАНЫС: "${userRequest}"

АРХИТЕКТ ЖОСПАРЫ:
${architectOutput}

МАҢЫЗДЫ ТАЛАПТАР:
1. JSON форматы: {"type": "web", "html": "...", "css": "...", "js": "...", "instructions": "..."}
2. Жауап ТЕК ҚАНА таза JSON. Markdown блоктары (\`\`\`json) БОЛМАСЫН.
3. КОД КӨЛЕМІ: HTML 200+ жол, CSS 300+ жол, JS 1500+ жол. Барлығы 2000+ жол болуы МІНДЕТТІ.
4. Tailwind CSS CDN қолдан: <script src="https://cdn.tailwindcss.com"></script>
5. Барлық мәтіндер ҚАЗАҚ ТІЛІНДЕ болсын.
6. НАҚТЫ ойын логикасы: сұрақтар, деңгейлер, ұпай жүйесі толық жұмыс істесін.
7. Анимациялар: CSS keyframes + JS requestAnimationFrame.
8. Дыбыс: Web Audio API арқылы 3+ дыбыс эффекті (дұрыс жауап, қате жауап, ойын аяқталды).
9. Responsive: мобиль (320px), планшет (768px), десктоп (1200px) барлығы жұмыс істесін.
10. LocalStorage: прогресс, жоғары ұпай сақталсын.
11. Ойын сапасы: кем дегенде 10+ сұрақ/тапсырма, 3 деңгей немесе таймер болсын.

HTML ТАЛАПТАРЫ:
- Semantic HTML5 тэгтер
- 3 негізгі section: #start-screen, #game-screen, #result-screen
- Прогресс бар, таймер, ұпай индикаторы
- Барлық интерактивті элементтерде data-атрибуттар

CSS ТАЛАПТАРЫ:
- :root-та CSS variables (--primary, --secondary, --success, --error т.б.)
- Кем дегенде 5 @keyframes animation
- Hover, active, focus state барлық батырмаларда
- Dark theme support (@media prefers-color-scheme)
- Tailwind extend classes

JS ТАЛАПТАРЫ:
- Барлық const/let/function нақты аттармен
- GAME_CONFIG: конфигурация объекті
- QUESTIONS/ITEMS: кем дегенде 15 сұрақ/тапсырма
- GameState: толық state management
- initGame(), startGame(), endGame() функциялары
- Ұпай алгоритмі (уақыт бонусы, streak бонусы)
- localStorage.setItem/getItem арқылы сақтау
- Confetti немесе particle animation (ойын аяқталғанда)
- Web Audio API: oscillator арқылы дыбыс эффектілер

instructions өрісіне: Қазақша, мұғалімге арналған нұсқаулық жаз (қалай ашады, оқушыларға сілтеме береді).
`.trim();

// ─── Утилита функциялар ──────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const callGeminiText = async (prompt: string): Promise<string> => {
  const result = await callGemini({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      thinkingConfig: { thinkingLevel: 'MINIMAL' },
    },
  });

  const text = (result as any)?.text;
  if (text) return text;
  // fallback: proxy response format
  const candidates = (result as any)?.candidates || [];
  if (candidates[0]) {
    return (candidates[0]?.content?.parts || []).map((p: any) => p.text || '').join('');
  }
  throw new Error('Агент жауап бермеді');
};

const callGeminiJSON = async (prompt: string): Promise<ParsedGame> => {
  const result = await callGemini({
    model: 'gemini-3-flash-preview',
    contents: prompt + '\n\nMАҢЫЗДЫ: Тек таза JSON қайтар. Markdown блоктары болмасын.',
    config: {
      temperature: 0.4,
      maxOutputTokens: 65536,
      responseMimeType: 'application/json',
      thinkingConfig: { thinkingLevel: 'LOW' },
    },
  });

  const text = (result as any)?.text || 
    ((result as any)?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || '').join('');

  if (!text) throw new Error('Кодер агент жауап бермеді');

  const parsed = safeJsonParse(text);
  if (!parsed || parsed.type !== 'web') throw new Error('Кодер агент дұрыс JSON бермеді');
  return parsed as ParsedGame;
};

// ─── Компонент: Агент карточкасы ─────────────────────────────────────────────

interface AgentCardProps {
  step: AgentStep;
  state: StepState;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const AgentCard: React.FC<AgentCardProps> = ({ step, state, isExpanded, onToggle, index }) => {
  const isActive = state.status === 'running';
  const isDone = state.status === 'done';
  const isError = state.status === 'error';

  const getStatusIcon = () => {
    if (isActive) return <Loader2 size={16} className="animate-spin text-blue-500" />;
    if (isDone) return <CheckCircle2 size={16} className="text-emerald-500" />;
    if (isError) return <AlertCircle size={16} className="text-red-500" />;
    return <span className={`w-6 h-6 rounded-full border-2 ${step.borderColor} flex items-center justify-center text-xs font-bold ${step.color}`}>{index + 1}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`card overflow-hidden transition-all duration-300 ${
        isActive ? `border-blue-300 dark:border-blue-600 shadow-blue-100 dark:shadow-blue-900/20 shadow-md` : ''
      } ${isDone ? `border-emerald-200 dark:border-emerald-800` : ''}`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
          isDone || isActive ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'cursor-default'
        }`}
        disabled={state.status === 'idle' && !isDone}
      >
        {/* Status icon */}
        <div>{getStatusIcon()}</div>

        {/* Agent icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${step.bgColor} ${step.color} flex-shrink-0`}>
          {step.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{step.labelKz}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${step.bgColor} ${step.color}`}>{step.label}</span>
            {state.duration && (
              <span className="text-[10px] text-slate-400 ml-auto">{(state.duration / 1000).toFixed(1)}с</span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{step.description}</p>
        </div>

        {/* Expand */}
        {isDone && (
          <div className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={16} />
          </div>
        )}
      </button>

      {/* Running animation */}
      {isActive && (
        <div className="px-4 pb-4">
          <div className="flex gap-1.5 items-center text-xs text-slate-500">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span>Жұмыс жасалуда...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="px-4 pb-4">
          <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-2">{state.error}</p>
        </div>
      )}

      {/* Expanded output */}
      <AnimatePresence>
        {isDone && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 dark:border-slate-700 mx-4 mb-4 pt-4">
              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-xs max-h-80 overflow-y-auto">
                <ReactMarkdown>{state.output}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Компонент: Ойын превью ───────────────────────────────────────────────────

interface GamePreviewProps {
  game: ParsedGame;
  viewSize: 'mobile' | 'tablet' | 'desktop';
}

const GamePreview: React.FC<GamePreviewProps> = ({ game, viewSize }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const docContent = `<!DOCTYPE html>
<html lang="kk">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      ${game.css}
      body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
    </style>
  </head>
  <body>
    ${game.html}
    <script>
      ${game.js.replace(/<\/script>/g, '<\\/script>')}
    </script>
  </body>
</html>`;

    const blob = new Blob([docContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [game]);

  const getWidth = () => {
    if (viewSize === 'mobile') return '390px';
    if (viewSize === 'tablet') return '768px';
    return '100%';
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div
        className="transition-all duration-300 h-full"
        style={{ width: getWidth() }}
      >
        <iframe
          ref={iframeRef}
          className="w-full h-full border-none rounded-2xl"
          sandbox="allow-scripts allow-modals allow-forms"
          title="Ойын превью"
        />
      </div>
    </div>
  );
};

// ─── Негізгі компонент ────────────────────────────────────────────────────────

const GameLabView: React.FC<GameLabViewProps> = ({
  isApiOk,
  onOpenApiModal,
  addNotification,
  showToast,
}) => {
  const [userRequest, setUserRequest] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<ParsedGame | null>(null);
  const [viewSize, setViewSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [activePanel, setActivePanel] = useState<'pipeline' | 'preview'>('pipeline');
  const [codeTab, setCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [showCode, setShowCode] = useState(false);

  const [steps, setSteps] = useState<GameLabState>({
    analyzer: { status: 'idle', output: '' },
    designer: { status: 'idle', output: '' },
    architect: { status: 'idle', output: '' },
    coder: { status: 'idle', output: '' },
  });

  const abortRef = useRef(false);

  const updateStep = useCallback(
    (id: keyof GameLabState, update: Partial<StepState>) => {
      setSteps(prev => ({
        ...prev,
        [id]: { ...prev[id], ...update },
      }));
    },
    []
  );

  const resetAll = useCallback(() => {
    abortRef.current = true;
    setSteps({
      analyzer: { status: 'idle', output: '' },
      designer: { status: 'idle', output: '' },
      architect: { status: 'idle', output: '' },
      coder: { status: 'idle', output: '' },
    });
    setGameResult(null);
    setExpandedStep(null);
    setIsRunning(false);
    setActivePanel('pipeline');
    setTimeout(() => {
      abortRef.current = false;
    }, 100);
  }, []);

  const runPipeline = useCallback(async () => {
    if (!userRequest.trim()) {
      showToast('Ойын сұранысын жазыңыз ⚠️');
      return;
    }

    abortRef.current = false;
    setIsRunning(true);
    setGameResult(null);
    setSteps({
      analyzer: { status: 'idle', output: '' },
      designer: { status: 'idle', output: '' },
      architect: { status: 'idle', output: '' },
      coder: { status: 'idle', output: '' },
    });

    let analyzerOut = '';
    let designerOut = '';
    let architectOut = '';

    // ── Агент 1: Талдаушы ──
    try {
      if (abortRef.current) return;
      const t0 = Date.now();
      updateStep('analyzer', { status: 'running', startTime: t0 });

      const prompt = buildAnalyzerPrompt(userRequest);
      analyzerOut = await callGeminiText(prompt);

      updateStep('analyzer', {
        status: 'done',
        output: analyzerOut,
        duration: Date.now() - t0,
      });
      setExpandedStep('analyzer');
      await sleep(400);
    } catch (err: any) {
      updateStep('analyzer', { status: 'error', error: err.message });
      addNotification('Талдаушы қатесі ❌', err.message, 'error');
      setIsRunning(false);
      return;
    }

    // ── Агент 2: Дизайнер ──
    try {
      if (abortRef.current) return;
      const t0 = Date.now();
      updateStep('designer', { status: 'running', startTime: t0 });

      const prompt = buildDesignerPrompt(userRequest, analyzerOut);
      designerOut = await callGeminiText(prompt);

      updateStep('designer', {
        status: 'done',
        output: designerOut,
        duration: Date.now() - t0,
      });
      setExpandedStep('designer');
      await sleep(400);
    } catch (err: any) {
      updateStep('designer', { status: 'error', error: err.message });
      addNotification('Дизайнер қатесі ❌', err.message, 'error');
      setIsRunning(false);
      return;
    }

    // ── Агент 3: Архитект ──
    try {
      if (abortRef.current) return;
      const t0 = Date.now();
      updateStep('architect', { status: 'running', startTime: t0 });

      const prompt = buildArchitectPrompt(userRequest, designerOut);
      architectOut = await callGeminiText(prompt);

      updateStep('architect', {
        status: 'done',
        output: architectOut,
        duration: Date.now() - t0,
      });
      setExpandedStep('architect');
      await sleep(400);
    } catch (err: any) {
      updateStep('architect', { status: 'error', error: err.message });
      addNotification('Архитект қатесі ❌', err.message, 'error');
      setIsRunning(false);
      return;
    }

    // ── Агент 4: Кодер ──
    try {
      if (abortRef.current) return;
      const t0 = Date.now();
      updateStep('coder', { status: 'running', startTime: t0 });

      const prompt = buildCoderPrompt(userRequest, architectOut);
      const game = await callGeminiJSON(prompt);

      updateStep('coder', {
        status: 'done',
        output: `Ойын кодталды:\n- HTML: ${game.html.split('\n').length} жол\n- CSS: ${game.css.split('\n').length} жол\n- JS: ${game.js.split('\n').length} жол\n- Жалпы: ${(game.html + game.css + game.js).split('\n').length} жол`,
        duration: Date.now() - t0,
      });

      setGameResult(game);
      setExpandedStep('coder');
      setActivePanel('preview');
      addNotification('Ойын дайын! 🎮', 'Зертхана ойынды сәтті жасады', 'success');
    } catch (err: any) {
      updateStep('coder', { status: 'error', error: err.message });
      addNotification('Кодер қатесі ❌', err.message, 'error');
    } finally {
      setIsRunning(false);
    }
  }, [userRequest, updateStep, addNotification, showToast]);

  const handleSave = async () => {
    if (!gameResult) return;
    const user = auth.currentUser;
    if (!user) {
      showToast('Сақтау үшін жүйеге кіріңіз');
      return;
    }
    setIsSaving(true);
    try {
      const topicMatch = userRequest.match(/[А-ЯӘІҢҒҮҰҚӨШа-яәіңғүұқөш\w\s]+/);
      const title = topicMatch ? topicMatch[0].trim().slice(0, 60) : 'Зертхана ойыны';
      await addDoc(collection(db, 'library'), {
        userId: user.uid,
        type: 'Ойын',
        title: `🧪 ${title}`,
        subject: 'Зертхана',
        grade: '',
        data: { ...gameResult, labRequest: userRequest },
        date: new Date().toLocaleDateString('kk-KZ'),
        createdAt: serverTimestamp(),
      });
      showToast('Ойын кітапханаға сақталды! ✅');
    } catch (err) {
      showToast('Сақтау кезінде қате ❌');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      showToast('Сілтемені көшіру мүмкін болмады');
    }
  };

  const handleDownload = () => {
    if (!gameResult) return;
    const html = `<!DOCTYPE html>
<html lang="kk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>${gameResult.css}</style>
</head>
<body>
${gameResult.html}
<script>
${gameResult.js}
</script>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bilge-game.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Ойын жүктелді! ✅');
  };

  const totalLines = gameResult
    ? (gameResult.html + gameResult.css + gameResult.js).split('\n').length
    : 0;

  const pipelineDone = steps.coder.status === 'done';
  const anyRunning = isRunning;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fu min-h-screen"
    >
      {/* ── Тақырып ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
            <Beaker size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-black">
              Ойын Зертханасы
              <span className="ml-2 text-xs font-bold bg-gradient-to-r from-violet-500 to-pink-500 text-white px-2.5 py-1 rounded-full">
                AI Lab
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              4-агентті AI pipeline — идеядан жұмыс істейтін ойынға дейін
            </p>
          </div>
        </div>

        {/* Pipeline схемасы */}
        <div className="flex items-center gap-1 flex-wrap mt-4">
          {AGENT_STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  steps[step.id].status === 'done'
                    ? `${step.bgColor} ${step.color} ${step.borderColor}`
                    : steps[step.id].status === 'running'
                    ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700 animate-pulse'
                    : 'bg-slate-50 text-slate-400 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                {step.icon}
                {step.labelKz}
              </div>
              {i < AGENT_STEPS.length - 1 && (
                <ChevronRight
                  size={14}
                  className={`flex-shrink-0 ${
                    steps[AGENT_STEPS[i + 1].id].status !== 'idle' ? 'text-slate-400' : 'text-slate-200 dark:text-slate-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}

          {pipelineDone && (
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
              <Zap size={12} />
              {totalLines} жол код
            </div>
          )}
        </div>
      </div>

      {/* ── Кіріс аймағы ── */}
      <div className="card card-pad mb-6">
        <label className="flabel flex items-center gap-2 mb-3">
          <Lightbulb size={15} className="text-amber-500" />
          Ойын сұранысы
        </label>
        <textarea
          className="inp"
          rows={3}
          placeholder="Мысалы: Қазақстан географиясы бойынша 8-сынып үшін карта ойыны, облыстарды дұрыс жерге сүйреп апару керек..."
          value={userRequest}
          onChange={e => setUserRequest(e.target.value)}
          disabled={anyRunning}
          style={{ resize: 'none' }}
        />

        {/* Мысал промпттар */}
        <div className="mt-3">
          <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Мысалдар:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((ex, i) => (
              <button
                key={i}
                onClick={() => setUserRequest(ex.text)}
                disabled={anyRunning}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 transition-all"
              >
                {ex.emoji} {ex.text.slice(0, 35)}...
              </button>
            ))}
          </div>
        </div>

        {/* Батырмалар */}
        <div className="flex gap-3 mt-4">
          {!anyRunning ? (
            <button
              onClick={runPipeline}
              disabled={!userRequest.trim()}
              className="btn btn-primary flex-1"
            >
              <Sparkles size={16} />
              {pipelineDone ? 'Қайта жасау' : 'Зертханада жасау'}
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={resetAll}
              className="btn btn-ghost flex-1 border-red-200 text-red-500 hover:bg-red-50"
            >
              <RotateCcw size={16} />
              Тоқтату
            </button>
          )}

          {pipelineDone && (
            <>
              <button onClick={resetAll} className="btn btn-ghost">
                <RefreshCw size={15} />
                Жаңа
              </button>
              <button onClick={handleSave} disabled={isSaving} className="btn btn-ghost">
                {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Сақтау
              </button>
              <button onClick={handleDownload} className="btn btn-ghost">
                <Download size={15} />
                HTML
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Негізгі аймақ ── */}
      {(anyRunning || pipelineDone || Object.values(steps).some(s => s.status !== 'idle')) && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* ── Сол жақ: Pipeline ── */}
          <div>
            {/* Tab toggle (mobile) */}
            <div className="flex gap-1 mb-4 xl:hidden">
              <button
                onClick={() => setActivePanel('pipeline')}
                className={`flex-1 btn btn-sm ${activePanel === 'pipeline' ? 'btn-primary' : 'btn-ghost'}`}
              >
                <Brain size={14} /> Pipeline
              </button>
              {pipelineDone && (
                <button
                  onClick={() => setActivePanel('preview')}
                  className={`flex-1 btn btn-sm ${activePanel === 'preview' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  <Play size={14} /> Ойын
                </button>
              )}
            </div>

            <div className={`space-y-3 ${activePanel !== 'pipeline' ? 'hidden xl:block' : ''}`}>
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Brain size={14} />
                AI Агент Pipeline
              </h3>

              {AGENT_STEPS.map((step, i) => (
                <AgentCard
                  key={step.id}
                  step={step}
                  state={steps[step.id as keyof GameLabState]}
                  isExpanded={expandedStep === step.id}
                  onToggle={() =>
                    setExpandedStep(prev => (prev === step.id ? null : step.id))
                  }
                  index={i}
                />
              ))}

              {/* Жалпы статистика */}
              {pipelineDone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card card-pad bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">Pipeline аяқталды</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: 'Агент уақыты',
                        value: `${(
                          Object.values(steps).reduce((sum, s) => sum + (s.duration || 0), 0) / 1000
                        ).toFixed(0)}с`,
                        icon: '⏱',
                      },
                      {
                        label: 'Жалпы код',
                        value: `${totalLines} жол`,
                        icon: '📝',
                      },
                      {
                        label: 'HTML',
                        value: `${gameResult?.html.split('\n').length || 0} жол`,
                        icon: '🏗',
                      },
                      {
                        label: 'JavaScript',
                        value: `${gameResult?.js.split('\n').length || 0} жол`,
                        icon: '⚡',
                      },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center">
                        <div className="text-lg mb-1">{stat.icon}</div>
                        <div className="font-black text-slate-800 dark:text-slate-100">{stat.value}</div>
                        <div className="text-[10px] text-slate-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Оң жақ: Превью ── */}
          {pipelineDone && gameResult && (
            <div className={`${activePanel !== 'preview' ? 'hidden xl:block' : ''}`}>
              {/* Превью тақырыбы */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Play size={14} />
                  Ойын превью
                </h3>
                <div className="flex items-center gap-2">
                  {/* View size */}
                  <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                    {([
                      { id: 'mobile', icon: <Smartphone size={13} /> },
                      { id: 'tablet', icon: <Tablet size={13} /> },
                      { id: 'desktop', icon: <Monitor size={13} /> },
                    ] as const).map(v => (
                      <button
                        key={v.id}
                        onClick={() => setViewSize(v.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          viewSize === v.id
                            ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {v.icon}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowCode(!showCode)}
                    className={`btn btn-sm btn-ghost ${showCode ? 'text-blue-600 border-blue-200' : ''}`}
                  >
                    <Code2 size={13} />
                    {showCode ? 'Жасыру' : 'Код'}
                  </button>

                  <button
                    onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                    className="btn btn-sm btn-ghost"
                  >
                    {isPreviewFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>
                </div>
              </div>

              {/* Превью аймағы */}
              <div
                className={`card overflow-hidden transition-all duration-300 ${
                  isPreviewFullscreen
                    ? 'fixed inset-4 z-50 shadow-2xl'
                    : 'h-[600px]'
                }`}
              >
                {isPreviewFullscreen && (
                  <div className="flex justify-between items-center p-3 border-b border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-sm">🎮 Ойын</span>
                    <button
                      onClick={() => setIsPreviewFullscreen(false)}
                      className="btn btn-sm btn-ghost"
                    >
                      <Minimize2 size={14} /> Жию
                    </button>
                  </div>
                )}
                <div className="h-full p-2">
                  <GamePreview game={gameResult} viewSize={viewSize} />
                </div>
              </div>

              {/* Нұсқаулық */}
              {gameResult.instructions && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen size={14} />
                      Мұғалімге нұсқаулық
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showInstructions ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {showInstructions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-amber-50 dark:bg-amber-900/20 rounded-b-xl border-x border-b border-amber-200 dark:border-amber-800 text-sm">
                          <ReactMarkdown>{gameResult.instructions}</ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Код қарау */}
              <AnimatePresence>
                {showCode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-3 card overflow-hidden"
                  >
                    <div className="flex border-b border-slate-100 dark:border-slate-700">
                      {(['html', 'css', 'js'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setCodeTab(tab)}
                          className={`flex-1 py-2.5 text-xs font-bold uppercase transition-colors ${
                            codeTab === tab
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {tab === 'html' ? `HTML (${gameResult.html.split('\n').length}ж)` :
                           tab === 'css' ? `CSS (${gameResult.css.split('\n').length}ж)` :
                           `JS (${gameResult.js.split('\n').length}ж)`}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            codeTab === 'html' ? gameResult.html :
                            codeTab === 'css' ? gameResult.css : gameResult.js
                          );
                          showToast('Код көшірілді! ✅');
                        }}
                        className="px-3 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-slate-600 dark:text-slate-300 overflow-auto max-h-64 bg-slate-50 dark:bg-slate-900">
                      {codeTab === 'html' ? gameResult.html :
                       codeTab === 'css' ? gameResult.css : gameResult.js}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* ── Бос күй ── */}
      {!anyRunning && !pipelineDone && !Object.values(steps).some(s => s.status !== 'idle') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Beaker size={36} className="text-violet-500" />
          </div>
          <h2 className="text-2xl font-black mb-3">Ойын Зертханасы</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            4 AI агент кезекпен жұмыс жасайды — сіздің идеяңызды толық жоспарлап,
            архитектурасын қалыптастырып, 2000+ жол HTML/CSS/JS ойын коды жазады.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {AGENT_STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border ${step.bgColor} ${step.borderColor} text-center`}
              >
                <div className={`${step.color} flex justify-center mb-2`}>{step.icon}</div>
                <div className={`font-bold text-sm ${step.color}`}>{step.labelKz}</div>
                <div className="text-xs text-slate-400 mt-1">{step.description.slice(0, 30)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameLabView;

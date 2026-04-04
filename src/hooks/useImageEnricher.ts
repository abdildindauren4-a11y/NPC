/**
 * useImageEnricher.ts
 * Ойын немесе тест деректерін фонда суретпен байытатын hook.
 * Пайдаланушы ешнәрсе баспайды — автоматты іске қосылады.
 */

import { useState, useCallback, useRef } from 'react';
import {
  enrichGameWithImages,
  enrichAssessmentWithImages,
  gameTypeSupportsImages,
  countImagePrompts,
  ImageGenProgress,
} from '../services/imageGenService';

export interface ImageEnricherState {
  isEnriching: boolean;
  progress: ImageGenProgress | null;
  /** Enrichment аяқталды ма */
  isDone: boolean;
  /** Enrichment өткізілді ме (imagePrompt жоқ болса) */
  isSkipped: boolean;
}

export function useImageEnricher() {
  const [state, setState] = useState<ImageEnricherState>({
    isEnriching: false,
    progress: null,
    isDone: false,
    isSkipped: false,
  });

  const abortRef = useRef(false);

  /**
   * Ойын деректерін байытады.
   * @param gameData — generateGame нәтижесі
   * @param onDone — байытылған деректермен шақырылады
   */
  const enrichGame = useCallback(
    async (gameData: any, onDone: (enriched: any) => void) => {
      if (!gameData) return;

      const type = gameData.type?.toLowerCase();
      const prompts = countImagePrompts(gameData);

      if (!gameTypeSupportsImages(type) || prompts === 0) {
        setState({ isEnriching: false, progress: null, isDone: false, isSkipped: true });
        onDone(gameData);
        return;
      }

      abortRef.current = false;
      setState({ isEnriching: true, progress: null, isDone: false, isSkipped: false });

      try {
        const enriched = await enrichGameWithImages(gameData, (p) => {
          if (!abortRef.current) {
            setState(prev => ({ ...prev, progress: p }));
          }
        });

        if (!abortRef.current) {
          setState({ isEnriching: false, progress: null, isDone: true, isSkipped: false });
          onDone(enriched);
        }
      } catch (err) {
        console.warn('useImageEnricher: game enrichment failed', err);
        setState({ isEnriching: false, progress: null, isDone: false, isSkipped: true });
        onDone(gameData); // Сурет болмаса да ойын жұмыс жасайды
      }
    },
    []
  );

  /**
   * БЖБ/ТЖБ тапсырмаларын байытады.
   * @param tasks — AssessmentData.tasks
   * @param onDone — байытылған tasks массивімен шақырылады
   */
  const enrichAssessment = useCallback(
    async (tasks: any[], onDone: (enriched: any[]) => void) => {
      if (!tasks || tasks.length === 0) {
        onDone(tasks);
        return;
      }

      const hasPrompts = tasks.some(
        (t: any) => t.imagePrompt && !t.imageUrl && t.imagePrompt.trim().length > 3
      );

      if (!hasPrompts) {
        setState({ isEnriching: false, progress: null, isDone: false, isSkipped: true });
        onDone(tasks);
        return;
      }

      abortRef.current = false;
      setState({ isEnriching: true, progress: null, isDone: false, isSkipped: false });

      try {
        const enriched = await enrichAssessmentWithImages(tasks, (p) => {
          if (!abortRef.current) {
            setState(prev => ({ ...prev, progress: p }));
          }
        });

        if (!abortRef.current) {
          setState({ isEnriching: false, progress: null, isDone: true, isSkipped: false });
          onDone(enriched);
        }
      } catch (err) {
        console.warn('useImageEnricher: assessment enrichment failed', err);
        setState({ isEnriching: false, progress: null, isDone: false, isSkipped: true });
        onDone(tasks);
      }
    },
    []
  );

  const reset = useCallback(() => {
    abortRef.current = true;
    setState({ isEnriching: false, progress: null, isDone: false, isSkipped: false });
  }, []);

  return { ...state, enrichGame, enrichAssessment, reset };
}

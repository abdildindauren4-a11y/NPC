/**
 * ImageEnrichmentBadge.tsx
 * Сурет генерациясы барысында кішкентай индикатор.
 * Ойын немесе тест экранының бұрышында пайда болады.
 * Генерация аяқталғанда өздігінен жасырылады.
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { ImageEnricherState } from '../../hooks/useImageEnricher';

interface ImageEnrichmentBadgeProps {
  state: ImageEnricherState;
}

export const ImageEnrichmentBadge: React.FC<ImageEnrichmentBadgeProps> = ({ state }) => {
  const { isEnriching, progress, isDone, isSkipped } = state;

  const isVisible = isEnriching || isDone;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-lg border text-sm font-medium ${
              isDone
                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {isDone ? (
              <>
                <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                <span>Суреттер қосылды ✨</span>
              </>
            ) : (
              <>
                <Loader2 size={15} className="animate-spin text-violet-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs leading-tight">
                    Суреттер жасалуда...
                    {progress && (
                      <span className="ml-1 font-bold text-violet-600 dark:text-violet-400">
                        {progress.done}/{progress.total}
                      </span>
                    )}
                  </span>
                  {progress && progress.total > 0 && (
                    <div className="mt-1 w-32 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(progress.done / progress.total) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )}
                </div>
                <ImageIcon size={13} className="text-slate-400 flex-shrink-0" />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageEnrichmentBadge;

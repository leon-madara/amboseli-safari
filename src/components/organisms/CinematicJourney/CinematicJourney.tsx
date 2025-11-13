'use client';

import { useEffect, useMemo } from 'react';
import { CHAPTER_CONFIGS } from '@/data/chapters';
import { useSafariProgress } from '@/providers/SafariProgressProvider';
import { useChapterProgress } from '@/hooks/useChapterProgress';
import styles from './CinematicJourney.module.css';

/**
 * CinematicJourney Container Component
 * 
 * Orchestrates all 12 chapters of the safari experience and manages
 * atmospheric transitions between chapters based on time-of-day.
 * 
 * Features:
 * - Renders all 12 chapter components in sequence
 * - Manages atmospheric transitions with color gradients
 * - Integrates with SafariProgressProvider for progress tracking
 * - Handles responsive layout adjustments
 * - Applies time-of-day styling based on current chapter
 */
export function CinematicJourney() {
  const { currentChapter: progressChapter, timeOfDay } = useSafariProgress();
  const { currentChapter, scrollPercentage } = useChapterProgress();

  // Get atmospheric effects for current chapter
  const atmosphericEffects = useMemo(() => {
    if (!currentChapter?.atmosphericEffects) {
      return {
        colorGradient: ['#0a0e27', '#1a1f3a'],
        particles: undefined,
        cursor: 'default',
      };
    }
    return currentChapter.atmosphericEffects;
  }, [currentChapter]);

  // Apply atmospheric transition styles to document root
  useEffect(() => {
    const root = document.documentElement;
    const [startColor, endColor] = atmosphericEffects.colorGradient;

    // Set CSS custom properties for atmospheric transitions
    root.style.setProperty('--atmosphere-start', startColor);
    root.style.setProperty('--atmosphere-end', endColor);
    root.style.setProperty('--time-of-day', timeOfDay);

    // Apply cursor style if specified
    if (atmosphericEffects.cursor && atmosphericEffects.cursor !== 'default') {
      root.style.setProperty('--chapter-cursor', atmosphericEffects.cursor);
    } else {
      root.style.removeProperty('--chapter-cursor');
    }

    return () => {
      // Cleanup on unmount
      root.style.removeProperty('--atmosphere-start');
      root.style.removeProperty('--atmosphere-end');
      root.style.removeProperty('--time-of-day');
      root.style.removeProperty('--chapter-cursor');
    };
  }, [atmosphericEffects, timeOfDay]);

  return (
    <div 
      className={styles.cinematicJourney}
      data-time-of-day={timeOfDay}
      data-scroll-progress={Math.round(scrollPercentage)}
    >
      {/* Atmospheric background layer */}
      <div 
        className={styles.atmosphericBackground}
        style={{
          background: `linear-gradient(to bottom, ${atmosphericEffects.colorGradient[0]}, ${atmosphericEffects.colorGradient[1]})`,
        }}
      />

      {/* Chapter container */}
      <div className={styles.chaptersContainer}>
        {CHAPTER_CONFIGS.map((chapter) => {
          // For now, render placeholder sections until chapter components are implemented
          // This will be replaced with actual chapter components in subsequent tasks
          const ChapterComponent = chapter.component;
          
          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className={styles.chapterSection}
              data-chapter-id={chapter.id}
              data-chapter-number={chapter.number}
              data-time-of-day={chapter.timeOfDay}
              style={{
                minHeight: `${chapter.heightVh}vh`,
              }}
            >
              {/* Placeholder content - will be replaced with actual chapter components */}
              {ChapterComponent ? (
                <ChapterComponent id={chapter.id} />
              ) : (
                <div className={styles.chapterPlaceholder}>
                  <div className={styles.placeholderContent}>
                    <span className={styles.chapterNumber}>Chapter {chapter.number}</span>
                    <h2 className={styles.chapterTitle}>{chapter.title}</h2>
                    <p className={styles.chapterTimeOfDay}>{chapter.timeOfDay}</p>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={styles.debugInfo}>
          <div>Current Chapter: {currentChapter?.title || 'None'}</div>
          <div>Time of Day: {timeOfDay}</div>
          <div>Scroll Progress: {Math.round(scrollPercentage)}%</div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useChapterProgress } from '@/hooks/useChapterProgress';
import { CHAPTER_CONFIGS } from '@/data/chapters';
import styles from './ScrollProgressIndicator.module.css';

/**
 * ScrollProgressIndicator Component Props
 */
export interface ScrollProgressIndicatorProps {
  className?: string;
  position?: 'left' | 'right';
}

/**
 * ScrollProgressIndicator Molecule Component
 * 
 * Displays a vertical progress bar showing the user's position within
 * the overall cinematic journey. Features chapter markers that can be
 * clicked to navigate to specific chapters.
 * 
 * Features:
 * - Vertical progress bar with smooth fill animation
 * - Chapter markers for all 12 chapters
 * - Click-to-navigate functionality
 * - Hover tooltips showing chapter names
 * - Active chapter highlighting
 * - Responsive positioning (right on desktop, top on mobile)
 * 
 * @example
 * <ScrollProgressIndicator position="right" />
 */
export function ScrollProgressIndicator({
  className = '',
  position = 'right',
}: ScrollProgressIndicatorProps) {
  const { chapterProgress, scrollPercentage, currentChapter } = useChapterProgress();
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  /**
   * Navigate to a specific chapter by scrolling to its start position
   */
  const handleChapterClick = (chapterId: string) => {
    const chapter = CHAPTER_CONFIGS.find((c) => c.id === chapterId);
    if (!chapter) return;

    const targetElement = document.getElementById(chapterId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: calculate scroll position manually
      const viewportHeight = window.innerHeight;
      const targetScrollY = chapter.startVh * viewportHeight / 100;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  /**
   * Get the tooltip for a chapter
   */
  const getChapterTooltip = (chapterId: string) => {
    const chapter = CHAPTER_CONFIGS.find((c) => c.id === chapterId);
    return chapter ? chapter.title : '';
  };

  return (
    <div 
      className={`${styles.progressIndicator} ${styles[position]} ${className}`}
      role="navigation"
      aria-label="Chapter navigation"
    >
      {/* Progress bar background */}
      <div className={styles.progressTrack}>
        {/* Filled progress */}
        <div 
          className={styles.progressFill}
          style={{ height: `${scrollPercentage}%` }}
          aria-hidden="true"
        />

        {/* Chapter markers */}
        <div className={styles.chapterMarkers}>
          {CHAPTER_CONFIGS.map((chapter) => {
            const progress = chapterProgress.find((p) => p.chapterId === chapter.id);
            const isActive = progress?.isActive || false;
            const isComplete = progress?.isComplete || false;
            const isHovered = hoveredChapter === chapter.id;

            // Calculate marker position as percentage of total journey
            const totalHeight = CHAPTER_CONFIGS[CHAPTER_CONFIGS.length - 1].endVh;
            const markerPosition = (chapter.startVh / totalHeight) * 100;

            return (
              <button
                key={chapter.id}
                className={`${styles.chapterMarker} ${
                  isActive ? styles.active : ''
                } ${isComplete ? styles.complete : ''}`}
                style={{ top: `${markerPosition}%` }}
                onClick={() => handleChapterClick(chapter.id)}
                onMouseEnter={() => setHoveredChapter(chapter.id)}
                onMouseLeave={() => setHoveredChapter(null)}
                aria-label={`Go to ${chapter.title}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className={styles.markerDot} />
                
                {/* Tooltip */}
                {isHovered && (
                  <span className={styles.tooltip} role="tooltip">
                    <span className={styles.tooltipNumber}>
                      {chapter.number}
                    </span>
                    <span className={styles.tooltipText}>
                      {chapter.title}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen reader only: current progress */}
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {currentChapter && `Currently viewing: ${currentChapter.title}`}
      </div>
    </div>
  );
}

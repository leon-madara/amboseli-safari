'use client';

import { usePathname } from 'next/navigation';
import { useSafariProgress, SAFARI_CHAPTERS } from '@/providers/SafariProgressProvider';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import styles from './ScrollProgress.module.css';

const TIME_OF_DAY_ICONS: Record<string, string> = {
  'pre-dawn': '🌙',
  'dawn': '🌅',
  'morning': '☀️',
  'midday': '☀️',
  'afternoon': '🌤️',
  'golden-hour': '🌇',
  'sunset': '🌆',
  'dusk': '🌃',
  'twilight': '🌌',
  'night': '⭐',
};

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollProgress, currentChapterNumber } = useSafariProgress();
  const { scrollTo } = useSmoothScroll();

  // Only show on home page
  if (pathname !== '/') {
    return null;
  }

  const handleChapterClick = (chapterId: string) => {
    scrollTo(`#${chapterId}`, { duration: 1.5 });
  };

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${Math.min(100, scrollProgress)}%` }}
        />
      </div>

      {/* Chapter Markers */}
      <div className={styles.markers}>
        {SAFARI_CHAPTERS.map((chapter) => {
          const isActive = currentChapterNumber === chapter.number;
          const isPassed = currentChapterNumber > chapter.number;
          const markerPosition = (chapter.startProgress + chapter.endProgress) / 2;

          return (
            <button
              key={chapter.id}
              className={`${styles.marker} ${isActive ? styles.active : ''} ${isPassed ? styles.passed : ''}`}
              style={{ left: `${markerPosition}%` }}
              onClick={() => handleChapterClick(chapter.id)}
              title={chapter.title}
              aria-label={`Go to ${chapter.title}`}
            >
              <span className={styles.markerIcon}>
                {TIME_OF_DAY_ICONS[chapter.timeOfDay]}
              </span>
              <span className={styles.markerLabel}>{chapter.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { ChapterType } from '@/utils/timeline';
import styles from './TimelineNavigation.module.css';

interface Chapter {
  id: ChapterType;
  title: string;
  icon: string;
}

interface TimelineNavigationProps {
  chapters: Chapter[];
  activeChapter: ChapterType;
  onChapterClick: (chapterId: ChapterType) => void;
}

export function TimelineNavigation({
  chapters,
  activeChapter,
  onChapterClick,
}: TimelineNavigationProps) {
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<ChapterType, HTMLButtonElement>>(new Map());

  // Update indicator position when active chapter changes
  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeChapter);
    const navElement = navRef.current;

    if (activeButton && navElement) {
      const navRect = navElement.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeChapter]);

  const handleKeyDown = (e: React.KeyboardEvent, chapterId: ChapterType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChapterClick(chapterId);
    }

    // Arrow key navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = chapters.findIndex(ch => ch.id === chapterId);
      let nextIndex: number;

      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : chapters.length - 1;
      } else {
        nextIndex = currentIndex < chapters.length - 1 ? currentIndex + 1 : 0;
      }

      const nextChapter = chapters[nextIndex];
      onChapterClick(nextChapter.id);

      // Focus next button
      const nextButton = buttonRefs.current.get(nextChapter.id);
      nextButton?.focus();
    }
  };

  return (
    <nav
      ref={navRef}
      className={styles.navigation}
      role="navigation"
      aria-label="Timeline chapters"
    >
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapter;

            return (
              <button
                key={chapter.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(chapter.id, el);
                }}
                onClick={() => onChapterClick(chapter.id)}
                onKeyDown={(e) => handleKeyDown(e, chapter.id)}
                className={`${styles.button} ${isActive ? styles.active : ''}`}
                aria-label={`Navigate to ${chapter.title}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                <span className={styles.icon} aria-hidden="true">
                  {chapter.icon}
                </span>
                <span className={styles.label}>{chapter.title}</span>
              </button>
            );
          })}

          {/* Animated indicator */}
          <div
            className={styles.indicator}
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </nav>
  );
}

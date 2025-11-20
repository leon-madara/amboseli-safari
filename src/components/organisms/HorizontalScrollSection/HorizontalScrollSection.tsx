'use client';

import { useRef } from 'react';
import { ParallaxBackground } from '@/components/molecules/ParallaxBackground';
import { TimelineChapter } from '@/components/organisms/TimelineChapter';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import type { Chapter, ChapterType } from '@/utils/timeline';
import styles from './HorizontalScrollSection.module.css';

interface HorizontalScrollSectionProps {
  chapters: Chapter[];
  onChapterChange?: (chapterId: ChapterType) => void;
}

export function HorizontalScrollSection({
  chapters,
  onChapterChange,
}: HorizontalScrollSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { activeChapter, isMobile } = useHorizontalScroll({
    containerRef,
    wrapperRef,
    chapters,
    onChapterChange,
  });

  return (
    <div
      id="timeline-section"
      ref={wrapperRef}
      className={`${styles.wrapper} ${isMobile ? styles.mobile : ''}`}
    >
      {/* Parallax background layers */}
      {!isMobile && <ParallaxBackground activeChapter={activeChapter} />}

      {/* Horizontal container */}
      <div ref={containerRef} className={styles.container}>
        {chapters.map((chapter) => (
          <TimelineChapter
            key={chapter.id}
            chapter={chapter}
            isActive={chapter.id === activeChapter}
          />
        ))}
      </div>
    </div>
  );
}

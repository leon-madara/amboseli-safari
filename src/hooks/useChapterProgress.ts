'use client';

import { useState, useEffect, useMemo } from 'react';
import { ChapterConfig, ChapterProgress } from '@/types/chapter';
import { CHAPTER_CONFIGS, getChapterByScrollPosition } from '@/data/chapters';

/**
 * Hook to track progress through chapters based on scroll position
 * 
 * @returns Object containing current chapter, all chapter progress, and scroll percentage
 * 
 * @example
 * const { currentChapter, chapterProgress, scrollPercentage } = useChapterProgress();
 * 
 * console.log(`Currently viewing: ${currentChapter?.title}`);
 * console.log(`Overall progress: ${scrollPercentage}%`);
 */
export function useChapterProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Update scroll position and viewport height
  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollY(window.scrollY);
      setViewportHeight(window.innerHeight);
    };

    // Initial values
    updateScrollPosition();

    // Throttled scroll handler for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, []);

  // Calculate current scroll position in vh units
  const scrollVh = useMemo(() => {
    if (viewportHeight === 0) return 0;
    return (scrollY / viewportHeight) * 100;
  }, [scrollY, viewportHeight]);

  // Get current chapter based on scroll position
  const currentChapter = useMemo(() => {
    return getChapterByScrollPosition(scrollVh);
  }, [scrollVh]);

  // Calculate progress for each chapter
  const chapterProgress = useMemo((): ChapterProgress[] => {
    return CHAPTER_CONFIGS.map((chapter) => {
      const chapterHeight = chapter.endVh - chapter.startVh;
      const scrollIntoChapter = scrollVh - chapter.startVh;
      
      let progress = 0;
      let isActive = false;
      let isComplete = false;

      if (scrollVh >= chapter.endVh) {
        // Chapter is complete
        progress = 100;
        isComplete = true;
      } else if (scrollVh >= chapter.startVh && scrollVh < chapter.endVh) {
        // Chapter is active
        progress = Math.min(100, Math.max(0, (scrollIntoChapter / chapterHeight) * 100));
        isActive = true;
      } else {
        // Chapter hasn't been reached yet
        progress = 0;
      }

      return {
        chapterId: chapter.id,
        progress,
        isActive,
        isComplete,
      };
    });
  }, [scrollVh]);

  // Calculate overall scroll percentage (0-100)
  const scrollPercentage = useMemo(() => {
    const totalHeight = CHAPTER_CONFIGS[CHAPTER_CONFIGS.length - 1].endVh;
    return Math.min(100, Math.max(0, (scrollVh / totalHeight) * 100));
  }, [scrollVh]);

  // Get current chapter progress (0-100)
  const currentChapterProgress = useMemo(() => {
    if (!currentChapter) return 0;
    const progress = chapterProgress.find((p) => p.chapterId === currentChapter.id);
    return progress?.progress ?? 0;
  }, [currentChapter, chapterProgress]);

  return {
    currentChapter,
    chapterProgress,
    scrollPercentage,
    currentChapterProgress,
    scrollVh,
    scrollY,
  };
}

/**
 * Hook to track progress for a specific chapter
 * 
 * @param chapterId - ID of the chapter to track
 * @returns Progress information for the specified chapter
 * 
 * @example
 * const { progress, isActive, isComplete } = useSpecificChapterProgress('morning-drive');
 */
export function useSpecificChapterProgress(chapterId: string) {
  const { chapterProgress } = useChapterProgress();

  return useMemo(() => {
    const progress = chapterProgress.find((p) => p.chapterId === chapterId);
    return (
      progress ?? {
        chapterId,
        progress: 0,
        isActive: false,
        isComplete: false,
      }
    );
  }, [chapterId, chapterProgress]);
}

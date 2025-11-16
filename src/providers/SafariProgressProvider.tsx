'use client';

import { ReactNode, createContext, useContext, useState, useEffect, useRef } from 'react';

export type TimeOfDay = 'pre-dawn' | 'dawn' | 'morning' | 'midday' | 'afternoon' | 'golden-hour' | 'sunset' | 'dusk' | 'twilight' | 'night';

export interface ChapterMetadata {
  id: string;
  number: number;
  title: string;
  timeOfDay: TimeOfDay;
  startProgress: number; // 0-100%
  endProgress: number;   // 0-100%
}

export const SAFARI_CHAPTERS: ChapterMetadata[] = [
  { id: 'pre-dawn', number: 0, title: 'Pre-Dawn', timeOfDay: 'pre-dawn', startProgress: 0, endProgress: 8 },
  { id: 'sunrise', number: 1, title: 'Sunrise', timeOfDay: 'dawn', startProgress: 8, endProgress: 16 },
  { id: 'morning-drive', number: 2, title: 'Morning Drive', timeOfDay: 'morning', startProgress: 16, endProgress: 29 },
  { id: 'bush-breakfast', number: 3, title: 'Bush Breakfast', timeOfDay: 'morning', startProgress: 29, endProgress: 42 },
  { id: 'accommodations', number: 4, title: 'Accommodations', timeOfDay: 'midday', startProgress: 42, endProgress: 58 },
  { id: 'dining', number: 5, title: 'Dining Experience', timeOfDay: 'afternoon', startProgress: 58, endProgress: 71 },
  { id: 'experiences', number: 6, title: 'Safari Experiences', timeOfDay: 'golden-hour', startProgress: 71, endProgress: 92 },
  { id: 'wellness', number: 7, title: 'Wellness', timeOfDay: 'golden-hour', startProgress: 92, endProgress: 104 },
  { id: 'testimonials', number: 8, title: 'Guest Stories', timeOfDay: 'sunset', startProgress: 104, endProgress: 121 },
  { id: 'location', number: 9, title: 'Location & Access', timeOfDay: 'dusk', startProgress: 121, endProgress: 133 },
  { id: 'blog', number: 10, title: 'Safari Journal', timeOfDay: 'twilight', startProgress: 133, endProgress: 146 },
  { id: 'contact', number: 11, title: 'Plan Your Safari', timeOfDay: 'night', startProgress: 146, endProgress: 158 },
];

interface SafariProgressContextValue {
  scrollProgress: number;        // 0-100% of total page
  currentChapter: ChapterMetadata | null;
  chapterProgress: number;       // 0-100% within current chapter
  currentChapterNumber: number;  // 0-11
  timeOfDay: TimeOfDay;
  registerChapter: (id: string, element: HTMLElement) => void;
  unregisterChapter: (id: string) => void;
}

const SafariProgressContext = createContext<SafariProgressContextValue>({
  scrollProgress: 0,
  currentChapter: null,
  chapterProgress: 0,
  currentChapterNumber: 0,
  timeOfDay: 'pre-dawn',
  registerChapter: () => {},
  unregisterChapter: () => {},
});

export const useSafariProgress = () => useContext(SafariProgressContext);

interface SafariProgressProviderProps {
  children: ReactNode;
}

export function SafariProgressProvider({ children }: SafariProgressProviderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapterNumber, setCurrentChapterNumber] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [chapterElements, setChapterElements] = useState<Map<string, HTMLElement>>(new Map());

  // Use ref to persist values across renders without causing re-renders
  const rafIdRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(-1);

  // Calculate scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      if (rafIdRef.current !== null) return; // Skip if already scheduled

      rafIdRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
        const normalizedProgress = Math.min(100, Math.max(0, progress));

        // Only update if progress changed by more than 0.1%
        if (Math.abs(normalizedProgress - lastProgressRef.current) > 0.1) {
          setScrollProgress(normalizedProgress);
          lastProgressRef.current = normalizedProgress;
        }

        rafIdRef.current = null;
      });
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Determine current chapter based on scroll progress
  useEffect(() => {
    // Find which chapter range we're in
    const chapter = SAFARI_CHAPTERS.find(
      (ch) => scrollProgress >= ch.startProgress && scrollProgress < ch.endProgress
    ) || SAFARI_CHAPTERS[SAFARI_CHAPTERS.length - 1];

    if (chapter) {
      setCurrentChapterNumber(chapter.number);

      // Calculate progress within chapter
      const chapterRange = chapter.endProgress - chapter.startProgress;
      const progressInChapter = scrollProgress - chapter.startProgress;
      const chapterPct = chapterRange > 0 ? (progressInChapter / chapterRange) * 100 : 0;
      setChapterProgress(Math.min(100, Math.max(0, chapterPct)));
    }
  }, [scrollProgress]);

  const registerChapter = (id: string, element: HTMLElement) => {
    setChapterElements((prev) => {
      const next = new Map(prev);
      next.set(id, element);
      return next;
    });
  };

  const unregisterChapter = (id: string) => {
    setChapterElements((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  const currentChapter = SAFARI_CHAPTERS[currentChapterNumber] || SAFARI_CHAPTERS[0];
  const timeOfDay = currentChapter.timeOfDay;

  return (
    <SafariProgressContext.Provider
      value={{
        scrollProgress,
        currentChapter,
        chapterProgress,
        currentChapterNumber,
        timeOfDay,
        registerChapter,
        unregisterChapter,
      }}
    >
      {children}
    </SafariProgressContext.Provider>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChapterType, getChapterIndex } from '@/utils/timeline';
import { saveScrollPosition, getSavedScrollPosition } from '@/utils/scrollPositionStorage';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseHorizontalScrollOptions {
  containerRef: React.RefObject<HTMLDivElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  chapters: Array<{ id: ChapterType }>;
  onChapterChange?: (chapterId: ChapterType) => void;
}

export function useHorizontalScroll({
  containerRef,
  wrapperRef,
  chapters,
  onChapterChange,
}: UseHorizontalScrollOptions) {
  const [activeChapter, setActiveChapter] = useState<ChapterType>('dawn');
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isMobile) return; // Don't use Lenis on mobile

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isMobile]);

  // Initialize horizontal scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (isMobile) return; // Don't use horizontal scroll on mobile

    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    // Wait for images to load
    const images = container.querySelectorAll('img');
    const imagePromises = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () => resolve(null);
          }
        })
    );

    Promise.all(imagePromises).then(() => {
      // Calculate scroll distance
      const scrollWidth = container.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = scrollWidth - windowWidth;

      // Create horizontal scroll animation
      const tween = gsap.to(container, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Calculate active chapter based on scroll progress
            const progress = self.progress;
            const chapterIndex = Math.floor(progress * chapters.length);
            const clampedIndex = Math.min(chapterIndex, chapters.length - 1);
            const newChapter = chapters[clampedIndex]?.id;

            if (newChapter && newChapter !== activeChapter) {
              setActiveChapter(newChapter);
              onChapterChange?.(newChapter);
            }

            // Save scroll position for back button
            saveScrollPosition(self.progress * scrollDistance, self.scroll(), newChapter);
          },
        },
      });

      scrollTweenRef.current = tween;

      // Restore saved scroll position if navigating back
      const savedPosition = getSavedScrollPosition();
      if (savedPosition && savedPosition.horizontal > 0) {
        setTimeout(() => {
          const normalizedProgress = savedPosition.horizontal / scrollDistance;
          gsap.to(window, {
            scrollTo: savedPosition.vertical,
            duration: 0,
          });
        }, 100);
      }

      // Setup parallax for background layers
      gsap.utils.toArray<HTMLElement>('.parallax-sky').forEach((layer) => {
        gsap.to(layer, {
          x: -scrollDistance * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.parallax-mountains').forEach((layer) => {
        gsap.to(layer, {
          x: -scrollDistance * 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: true,
          },
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }
    };
  }, [isMobile, containerRef, wrapperRef, chapters, activeChapter, onChapterChange]);

  // Scroll to specific chapter
  const scrollToChapter = (chapterId: ChapterType) => {
    if (isMobile) {
      // For mobile, scroll to chapter section
      const chapterElement = document.getElementById(`chapter-${chapterId}`);
      if (chapterElement) {
        chapterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    const chapterIndex = getChapterIndex(chapterId);
    const scrollWidth = container.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = scrollWidth - windowWidth;

    // Calculate target scroll position
    const targetProgress = (chapterIndex + 0.5) / chapters.length;
    const targetScroll = targetProgress * scrollDistance;

    // Get current scroll position
    const scrollTrigger = ScrollTrigger.getAll().find(
      (st) => st.trigger === wrapper
    );

    if (scrollTrigger) {
      const currentScroll = scrollTrigger.start + scrollTrigger.progress * (scrollTrigger.end - scrollTrigger.start);
      const targetScrollPosition = scrollTrigger.start + (targetProgress * (scrollTrigger.end - scrollTrigger.start));

      gsap.to(window, {
        scrollTo: targetScrollPosition,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  };

  return {
    activeChapter,
    isMobile,
    scrollToChapter,
  };
}

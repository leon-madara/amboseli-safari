/**
 * useStackingCards Hook
 * 
 * Custom React hook that manages the stacking cards animation for the Accommodations chapter.
 * Uses Intersection Observer to detect viewport visibility and scroll events to calculate
 * transform values for each card.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 7.1, 7.2, 7.3, 7.5
 */

import { useState, useEffect, useRef, RefObject } from 'react';

export interface CardTransform {
  scale: number;        // 0.5 to 1.0 (scales down as card gets pushed back)
  translateY: number;   // 0 to 240px (index * 80px for layering)
  zIndex: number;       // 1 to 4 (ascending order)
  opacity: number;      // 0 to 1 (fade in as card approaches)
}

export interface UseStackingCardsOptions {
  cardRefs: RefObject<HTMLElement>[];
  containerRef: RefObject<HTMLElement>;
  enabled: boolean;
}

export interface UseStackingCardsReturn {
  transforms: CardTransform[];
  isInViewport: boolean;
  isSimplifiedMode: boolean;
}

/**
 * Performance monitoring state
 * Tracks frame times to detect performance degradation
 */
interface PerformanceMonitor {
  lastFrameTime: number;
  frameCount: number;
  slowFrames: number;
  isMonitoring: boolean;
}

/**
 * Calculate transform values for all cards based on current scroll position
 * 
 * @param cardRefs - Array of refs to card elements
 * @param containerRef - Ref to container element
 * @param simplifiedMode - Whether to use simplified transforms for performance
 * @returns Array of transform values for each card
 */
function calculateTransforms(
  cardRefs: RefObject<HTMLElement>[],
  containerRef: RefObject<HTMLElement>,
  simplifiedMode: boolean = false
): CardTransform[] {
  if (!containerRef.current) {
    console.warn('[AccommodationsChapter] Container ref not available for transform calculation');
    return [];
  }

  try {
    const containerTop = containerRef.current.getBoundingClientRect().top;

    return cardRefs.map((ref, index) => {
      if (!ref.current) {
        console.warn(`[AccommodationsChapter] Card ref at index ${index} not available`);
        return { scale: 1, translateY: 0, zIndex: index + 1, opacity: 0 };
      }

      const card = ref.current;
      const cardTop = card.getBoundingClientRect().top;
      const cardHeight = card.offsetHeight;
      const marginY = 80;

      // Calculate scroll progress (Requirement 7.2)
      const scrollProgress = cardTop - containerTop - (index * (cardHeight + marginY));

      if (scrollProgress > 0) {
        // Card is fixed and should scale down (Requirement 5.2)
        // In simplified mode, reduce scale calculation complexity
        const scale = simplifiedMode 
          ? Math.max(0.7, 1 - (scrollProgress / cardHeight) * 0.3)
          : Math.max(0.5, (cardHeight - scrollProgress * 0.05) / cardHeight);

        return {
          scale,
          translateY: index * marginY,  // Requirement 5.5
          zIndex: index + 1,            // Requirement 5.4
          opacity: 1
        };
      } else {
        // Card not yet fixed (Requirement 7.3)
        return {
          scale: 1,
          translateY: 0,
          zIndex: index + 1,
          opacity: Math.max(0, 1 + scrollProgress / 100) // Fade in as it approaches
        };
      }
    });
  } catch (error) {
    console.error('[AccommodationsChapter] Error calculating transforms:', error);
    // Return safe default transforms on error
    return cardRefs.map((_, index) => ({
      scale: 1,
      translateY: 0,
      zIndex: index + 1,
      opacity: 1
    }));
  }
}

/**
 * Check if performance is degrading and simplified mode should be enabled
 * 
 * @param monitor - Performance monitor state
 * @returns true if performance is poor and simplified mode should activate
 */
function checkPerformance(monitor: PerformanceMonitor): boolean {
  if (!monitor.isMonitoring) return false;

  const now = performance.now();
  const delta = now - monitor.lastFrameTime;
  
  monitor.frameCount++;
  
  // Track frames that take longer than 32ms (below 30fps)
  if (delta > 32) {
    monitor.slowFrames++;
  }
  
  monitor.lastFrameTime = now;
  
  // If more than 30% of frames are slow, enable simplified mode
  if (monitor.frameCount > 20 && monitor.slowFrames / monitor.frameCount > 0.3) {
    console.warn(
      '[AccommodationsChapter] Performance degradation detected. ' +
      `Slow frames: ${monitor.slowFrames}/${monitor.frameCount}. ` +
      'Enabling simplified animation mode.'
    );
    return true;
  }
  
  return false;
}

/**
 * useStackingCards Hook
 * 
 * Manages the stacking cards animation with Intersection Observer and scroll events.
 * Automatically handles cleanup and respects reduced motion preferences.
 * Includes performance monitoring and automatic simplified mode activation.
 * 
 * @param options - Configuration options
 * @returns Transform values, viewport visibility state, and simplified mode flag
 */
export function useStackingCards(options: UseStackingCardsOptions): UseStackingCardsReturn {
  const [transforms, setTransforms] = useState<CardTransform[]>([]);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(false);
  const rafId = useRef<number>();
  const performanceMonitor = useRef<PerformanceMonitor>({
    lastFrameTime: 0,
    frameCount: 0,
    slowFrames: 0,
    isMonitoring: false
  });

  // Set up Intersection Observer (Requirement 6.1)
  useEffect(() => {
    // Check for reduced motion preference (Requirement 6.5)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !options.enabled) {
      console.info('[AccommodationsChapter] Animation disabled due to reduced motion preference or disabled state');
      return;
    }

    // Check for Intersection Observer API support (Requirement 6.4)
    if (!('IntersectionObserver' in window)) {
      console.warn(
        '[AccommodationsChapter] Intersection Observer API not supported. ' +
        'Falling back to static display mode.'
      );
      // Fallback: Display all cards immediately without animation
      setIsInViewport(true);
      setIsSimplifiedMode(true);
      return;
    }

    try {
      // Create Intersection Observer with 0.1 threshold (Requirement 6.1)
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsInViewport(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            console.info('[AccommodationsChapter] Section entered viewport, activating animations');
            // Start performance monitoring when section becomes visible
            performanceMonitor.current.isMonitoring = true;
            performanceMonitor.current.lastFrameTime = performance.now();
            performanceMonitor.current.frameCount = 0;
            performanceMonitor.current.slowFrames = 0;
          } else {
            console.info('[AccommodationsChapter] Section exited viewport, deactivating animations');
            // Stop monitoring when section is not visible
            performanceMonitor.current.isMonitoring = false;
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        }
      );

      // Observe container element
      if (options.containerRef.current) {
        observer.observe(options.containerRef.current);
      } else {
        console.warn('[AccommodationsChapter] Container ref not available for Intersection Observer');
      }

      // Cleanup observer on unmount
      return () => {
        observer.disconnect();
        // Capture ref value for cleanup
        const monitor = performanceMonitor.current;
        monitor.isMonitoring = false;
      };
    } catch (error) {
      console.error('[AccommodationsChapter] Error setting up Intersection Observer:', error);
      // Fallback to static display on error
      setIsInViewport(true);
      setIsSimplifiedMode(true);
    }
  }, [options.enabled, options.containerRef]);

  // Set up scroll event listener (Requirements 6.2, 6.3, 7.1, 10.5)
  useEffect(() => {
    // Only add scroll listener when section is in viewport (Requirement 6.2, 10.5)
    // This optimization removes event listeners when not needed, improving performance
    if (!isInViewport) return;

    // Capture ref value for use in effect and cleanup
    const monitor = performanceMonitor.current;

    const handleScroll = () => {
      // Use requestAnimationFrame to batch calculations (Requirement 7.1, 7.4)
      // This ensures smooth 60fps animations by syncing with browser repaint cycle
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        try {
          // Check performance and potentially enable simplified mode
          if (!isSimplifiedMode && checkPerformance(monitor)) {
            setIsSimplifiedMode(true);
          }

          const newTransforms = calculateTransforms(
            options.cardRefs,
            options.containerRef,
            isSimplifiedMode
          );
          setTransforms(newTransforms);
        } catch (error) {
          console.error('[AccommodationsChapter] Error in scroll handler:', error);
          // On error, set safe default transforms
          setTransforms(
            options.cardRefs.map((_, index) => ({
              scale: 1,
              translateY: 0,
              zIndex: index + 1,
              opacity: 1
            }))
          );
        } finally {
          rafId.current = undefined;
        }
      });
    };

    try {
      // Add scroll event listener with passive flag for performance (Requirement 7.1, 10.3)
      // Passive listeners allow browser to optimize scrolling performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial calculation
      handleScroll();
    } catch (error) {
      console.error('[AccommodationsChapter] Error setting up scroll listener:', error);
    }

    // Cleanup: Remove scroll listener when section exits viewport (Requirement 6.3, 10.5)
    // This prevents memory leaks and reduces CPU usage when section is not visible
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isInViewport, isSimplifiedMode, options.cardRefs, options.containerRef]);

  return { transforms, isInViewport, isSimplifiedMode };
}

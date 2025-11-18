'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Blur values based on scroll state
const BLUR_SCROLLING = 5;  // Active scrolling
const BLUR_IDLE = 15;      // Stopped for >1s
const BLUR_TOP = 0;        // At page top

interface ScrollState {
  isScrolling: boolean;
  isAtTop: boolean;
  blurLevel: number;
}

/**
 * Custom hook to manage scroll-based blur effects for navigation
 * Tracks scroll position and state, implementing dynamic blur transitions
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 5.4
 */
export function useScrollBlur(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolling: false,
    isAtTop: true,
    blurLevel: BLUR_TOP,
  });

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef<number>(0);

  // Calculate blur level based on scroll state
  const calculateBlurLevel = useCallback((isAtTop: boolean, isScrolling: boolean): number => {
    if (isAtTop) {
      return BLUR_TOP;
    }
    if (isScrolling) {
      return BLUR_SCROLLING;
    }
    return BLUR_IDLE;
  }, []);

  // Update scroll state using requestAnimationFrame for performance
  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY === 0;
    const isScrolling = true;

    // Clear any pending RAF
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use RAF for smooth blur updates
    rafRef.current = requestAnimationFrame(() => {
      setScrollState({
        isScrolling,
        isAtTop,
        blurLevel: calculateBlurLevel(isAtTop, isScrolling),
      });

      lastScrollY.current = currentScrollY;
    });

    // Clear existing idle timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Set new idle timer (1 second)
    idleTimerRef.current = setTimeout(() => {
      const finalScrollY = window.scrollY;
      const finalIsAtTop = finalScrollY === 0;

      rafRef.current = requestAnimationFrame(() => {
        setScrollState({
          isScrolling: false,
          isAtTop: finalIsAtTop,
          blurLevel: calculateBlurLevel(finalIsAtTop, false),
        });
      });
    }, 1000);
  }, [calculateBlurLevel]);

  useEffect(() => {
    // Initialize state on mount
    const initialScrollY = window.scrollY;
    const initialIsAtTop = initialScrollY === 0;
    
    setScrollState({
      isScrolling: false,
      isAtTop: initialIsAtTop,
      blurLevel: calculateBlurLevel(initialIsAtTop, false),
    });

    // Add passive scroll listener for performance
    window.addEventListener('scroll', updateScrollState, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollState, calculateBlurLevel]);

  return scrollState;
}

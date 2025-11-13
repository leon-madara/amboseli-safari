'use client';

import { useState, useEffect, RefObject } from 'react';

/**
 * Configuration options for parallax effect
 */
export interface ParallaxOptions {
  speed?: number; // Parallax speed multiplier (0-1), default 0.5
  direction?: 'up' | 'down'; // Direction of parallax movement
  disabled?: boolean; // Disable parallax effect
}

/**
 * Hook to calculate parallax offset based on scroll position
 * 
 * @param elementRef - Reference to the element to apply parallax to
 * @param options - Parallax configuration options
 * @returns Parallax offset in pixels
 * 
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const offset = useParallax(ref, { speed: 0.5, direction: 'up' });
 * 
 * <div ref={ref} style={{ transform: `translateY(${offset}px)` }}>
 *   Parallax content
 * </div>
 */
export function useParallax(
  elementRef: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
): number {
  const { speed = 0.5, direction = 'up', disabled = false } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (disabled || prefersReducedMotion) {
      setOffset(0);
      return;
    }

    const calculateOffset = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how far the element has scrolled into view
      const scrollProgress = window.scrollY + viewportHeight - elementTop;
      const totalScrollDistance = viewportHeight + elementHeight;

      // Calculate parallax offset
      const parallaxDistance = totalScrollDistance * speed;
      const rawOffset = (scrollProgress / totalScrollDistance) * parallaxDistance;

      // Apply direction
      const finalOffset = direction === 'up' ? -rawOffset : rawOffset;

      setOffset(finalOffset);
    };

    // Initial calculation
    calculateOffset();

    // Update on scroll with throttling for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateOffset();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, speed, direction, disabled]);

  return offset;
}

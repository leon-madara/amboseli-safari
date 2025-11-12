'use client';

import { ReactNode, createContext, useContext, useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ParallaxContextValue {
  scrollOffset: number;
  isEnabled: boolean;
}

const ParallaxContext = createContext<ParallaxContextValue>({
  scrollOffset: 0,
  isEnabled: true,
});

export const useParallax = () => useContext(ParallaxContext);

interface ParallaxContainerProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function ParallaxContainer({
  children,
  disabled = false,
  className = ''
}: ParallaxContainerProps) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Disable parallax on mobile and when user prefers reduced motion
  const isEnabled = !disabled && !isMobile && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    let rafId: number;

    const updateParallax = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the container is visible
      // Negative when container is above viewport, positive when below
      const scrollProgress = (windowHeight - containerTop) / (windowHeight + containerHeight);

      // Normalize to -1 to 1 range for smoother parallax
      const offset = (scrollProgress - 0.5) * 2;

      setScrollOffset(offset);
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(updateParallax);
    };

    // Initial calculation
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isEnabled]);

  return (
    <ParallaxContext.Provider value={{ scrollOffset, isEnabled }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </ParallaxContext.Provider>
  );
}

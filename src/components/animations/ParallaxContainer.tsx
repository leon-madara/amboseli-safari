'use client';

import { ReactNode, createContext, useContext, useState, useEffect, useRef, CSSProperties } from 'react';
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

export interface ParallaxLayerProps {
  speed: number; // 0.0 - 1.0, where 0.3 = background, 0.6 = midground, 1.0 = foreground
  children: ReactNode;
  className?: string;
  zIndex?: number;
}

export function ParallaxLayer({ speed, children, className = '', zIndex }: ParallaxLayerProps) {
  const { scrollOffset, isEnabled } = useParallax();
  const layerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout to remove will-change after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isEnabled]);

  // Calculate parallax offset based on layer speed
  // Reduce parallax intensity to 50% on mobile devices for better performance
  const mobileSpeedMultiplier = isMobile ? 0.5 : 1.0;
  const adjustedSpeed = speed * mobileSpeedMultiplier;
  const parallaxOffset = isEnabled ? scrollOffset * adjustedSpeed * 100 : 0;

  const layerStyle: CSSProperties = {
    transform: `translate3d(0, ${parallaxOffset}px, 0)`,
    willChange: isScrolling ? 'transform' : 'auto',
    zIndex: zIndex,
  };

  return (
    <div ref={layerRef} className={className} style={layerStyle}>
      {children}
    </div>
  );
}

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

  // Disable complex parallax effects on mobile devices for better performance
  // Also disable when user prefers reduced motion for accessibility
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

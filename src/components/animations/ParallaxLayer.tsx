'use client';

import { ReactNode, useEffect, useRef, CSSProperties } from 'react';
import { useParallax } from './ParallaxContainer';

interface ParallaxLayerProps {
  children: ReactNode;
  speed: number; // 0.1 (very slow/background) to 2.0 (very fast/foreground)
  className?: string;
  style?: CSSProperties;
}

export function ParallaxLayer({
  children,
  speed = 1,
  className = '',
  style = {}
}: ParallaxLayerProps) {
  const { scrollOffset, isEnabled } = useParallax();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEnabled || !layerRef.current) return;

    const element = layerRef.current;

    // Calculate parallax offset based on speed
    // Lower speed = slower movement (background)
    // Higher speed = faster movement (foreground)
    const parallaxOffset = scrollOffset * speed * 100;

    // Apply transform with GPU acceleration
    element.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;

    // Add will-change for optimization
    element.style.willChange = 'transform';

    // Cleanup will-change after animation
    const timeoutId = setTimeout(() => {
      element.style.willChange = 'auto';
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [scrollOffset, speed, isEnabled]);

  return (
    <div
      ref={layerRef}
      className={className}
      style={{
        ...style,
        // Ensure GPU acceleration
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {children}
    </div>
  );
}

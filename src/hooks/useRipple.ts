'use client';

import { useState, useCallback, MouseEvent } from 'react';

export interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export interface UseRippleReturn {
  ripples: Ripple[];
  createRipple: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * useRipple hook creates Material Design-style ripple effects
 * on mouse/touch interactions
 */
export function useRipple(): UseRippleReturn {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    // Calculate ripple position
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate ripple size (diameter of the container)
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, createRipple };
}

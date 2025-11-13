'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AnimatedCursor.module.css';

/**
 * AnimatedCursor Component Props
 */
export interface AnimatedCursorProps {
  type: 'binoculars' | 'default';
  activeInSection?: string; // chapter ID or section selector
}

/**
 * AnimatedCursor Atom Component
 * 
 * Custom cursor component that replaces the default cursor in specific sections.
 * Provides smooth follow animation and supports different cursor types.
 * 
 * Features:
 * - Binoculars cursor for wildlife sections
 * - Smooth follow animation with easing
 * - Automatically hides on mobile/touch devices
 * - Section-specific activation
 * - GPU-accelerated transforms for performance
 * 
 * @example
 * <AnimatedCursor
 *   type="binoculars"
 *   activeInSection="morning-drive"
 * />
 */
export function AnimatedCursor({
  type = 'default',
  activeInSection,
}: AnimatedCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Detect touch devices
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    checkTouchDevice();
  }, []);

  // Track mouse position
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  // Smooth follow animation
  useEffect(() => {
    if (isTouchDevice || !isActive) return;

    const animate = () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      // Smooth easing (lerp)
      const ease = 0.15;
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;

      // Apply transform
      cursor.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTouchDevice, isActive]);

  // Track section visibility
  useEffect(() => {
    if (isTouchDevice || !activeInSection) return;

    const checkSectionVisibility = () => {
      const section = document.querySelector(`[data-chapter="${activeInSection}"]`);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      setIsActive(isVisible);
    };

    // Initial check
    checkSectionVisibility();

    // Check on scroll
    window.addEventListener('scroll', checkSectionVisibility, { passive: true });
    return () => window.removeEventListener('scroll', checkSectionVisibility);
  }, [isTouchDevice, activeInSection]);

  // Hide cursor on mobile/touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[type]} ${isActive ? styles.active : ''}`}
      aria-hidden="true"
    >
      {type === 'binoculars' && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.binocularsIcon}
        >
          {/* Left lens */}
          <circle
            cx="12"
            cy="20"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          {/* Right lens */}
          <circle
            cx="28"
            cy="20"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          {/* Bridge */}
          <line
            x1="20"
            y1="20"
            x2="20"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Left inner circle */}
          <circle
            cx="12"
            cy="20"
            r="4"
            fill="currentColor"
            opacity="0.3"
          />
          {/* Right inner circle */}
          <circle
            cx="28"
            cy="20"
            r="4"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      )}
    </div>
  );
}

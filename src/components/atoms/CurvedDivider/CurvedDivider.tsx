'use client';

import React from 'react';
import styles from './CurvedDivider.module.css';

export type CurveVariant = 'wave1' | 'wave2' | 'wave3';
export type CurveColor = 'cream' | 'white' | 'terracotta' | 'transparent';

export interface CurvedDividerProps {
  /**
   * The variant of the curve shape
   */
  variant?: CurveVariant;
  /**
   * Flip the curve vertically
   */
  flip?: boolean;
  /**
   * Color of the curve
   */
  color?: CurveColor;
  /**
   * Enable subtle wave animation
   */
  animated?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * CurvedDivider component creates organic, flowing transitions between sections
 * using SVG paths with smooth bezier curves
 */
export default function CurvedDivider({
  variant = 'wave1',
  flip = false,
  color = 'white',
  animated = false,
  className = '',
}: CurvedDividerProps) {
  // SVG path data for different wave variants
  const paths: Record<CurveVariant, string> = {
    // Gentle rolling wave
    wave1: 'M0,40 C320,10 640,70 960,40 C1280,10 1600,70 1920,40 L1920,100 L0,100 Z',
    // Dynamic multi-peak wave
    wave2: 'M0,60 C240,20 480,80 720,40 C960,0 1200,60 1440,40 C1680,20 1920,50 1920,50 L1920,100 L0,100 Z',
    // Smooth flowing curve
    wave3: 'M0,50 C480,20 960,80 1440,50 C1920,20 1920,20 1920,20 L1920,100 L0,100 Z',
  };

  // Color mapping to CSS variables
  const colorMap: Record<CurveColor, string> = {
    cream: 'var(--color-neutral-cream, #F5F0E8)',
    white: 'var(--color-bg-secondary, #FFFFFF)',
    terracotta: 'var(--color-primary-terracotta, #C86F47)',
    transparent: 'transparent',
  };

  const fillColor = colorMap[color];
  const pathData = paths[variant];

  return (
    <div
      className={`${styles.curvedDivider} ${flip ? styles.flip : ''} ${
        animated ? styles.animated : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 100"
        preserveAspectRatio="none"
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathData} fill={fillColor} />
      </svg>
    </div>
  );
}

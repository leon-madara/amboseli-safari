'use client';

import React from 'react';
import styles from './WellnessBackgroundSymbols.module.css';

export type SymbolType = 'leaf' | 'mandala' | 'flower' | 'spiral' | 'wave';

export type SymbolPosition = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export interface WellnessBackgroundSymbolsProps {
  /**
   * Type of symbol to display
   */
  type?: SymbolType;
  /**
   * Position of the symbol
   */
  position?: SymbolPosition;
  /**
   * Size of the symbol (in pixels)
   */
  size?: number;
  /**
   * Opacity of the symbol (0-1)
   */
  opacity?: number;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Rotation angle in degrees
   */
  rotation?: number;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * WellnessBackgroundSymbols creates subtle, wellness-themed decorative symbols
 * that complement the page without distracting from content
 */
export default function WellnessBackgroundSymbols({
  type = 'leaf',
  position = { top: '10%', left: '10%' },
  size = 120,
  opacity = 0.08,
  duration = 20,
  delay = 0,
  rotation = 0,
  className = '',
}: WellnessBackgroundSymbolsProps) {
  const positionStyles: React.CSSProperties = {
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
    width: `${size}px`,
    height: `${size}px`,
    opacity,
    transform: `rotate(${rotation}deg)`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };

  return (
    <div
      className={`${styles.symbol} ${styles[type]} ${className}`}
      style={positionStyles}
      aria-hidden="true"
    >
      {type === 'leaf' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 10 C30 10, 15 25, 15 45 C15 65, 30 80, 50 90 C70 80, 85 65, 85 45 C85 25, 70 10, 50 10 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M50 10 L50 90 M15 45 L85 45"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'mandala' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
          <path
            d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M35 35 L45 45 M65 35 L55 45 M35 65 L45 55 M65 65 L55 55"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'flower' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="5" fill="currentColor" />
          <path
            d="M50 50 L50 20 M50 50 L50 80 M50 50 L20 50 M50 50 L80 50"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M50 50 L35 35 M50 50 L65 35 M50 50 L35 65 M50 50 L65 65"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="20" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="80" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="20" cy="50" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="80" cy="50" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      )}
      {type === 'spiral' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 50 Q60 40, 60 50 T70 50 Q70 60, 60 60 T50 70 Q40 70, 40 60 T30 50 Q30 40, 40 40 T50 30 Q60 30, 60 40"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === 'wave' && (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 50 Q30 30, 50 50 T90 50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M10 60 Q30 40, 50 60 T90 60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M10 70 Q30 50, 50 70 T90 70"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      )}
    </div>
  );
}


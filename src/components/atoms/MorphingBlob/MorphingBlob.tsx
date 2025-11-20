'use client';

import React from 'react';
import styles from './MorphingBlob.module.css';

export type BlobColor = 'terracotta' | 'peach' | 'cream' | 'warmGradient';
export type BlobSize = 'small' | 'medium' | 'large' | 'xlarge';
export type BlobPosition = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export interface MorphingBlobProps {
  /**
   * Color scheme of the blob
   */
  color?: BlobColor;
  /**
   * Size of the blob
   */
  size?: BlobSize;
  /**
   * Position of the blob
   */
  position?: BlobPosition;
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Blur amount in pixels
   */
  blur?: number;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * MorphingBlob creates organic, slowly morphing background shapes
 * that add visual interest without distracting from content
 */
export default function MorphingBlob({
  color = 'terracotta',
  size = 'medium',
  position = { top: '10%', left: '10%' },
  duration = 25,
  delay = 0,
  blur = 60,
  className = '',
}: MorphingBlobProps) {
  const positionStyles = {
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
  };

  const animationStyles = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    filter: `blur(${blur}px)`,
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.blob} ${styles[color]} ${styles[size]} ${className}`}
      style={{ ...positionStyles, ...animationStyles }}
      aria-hidden="true"
    />
  );
}

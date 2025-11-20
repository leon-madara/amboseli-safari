'use client';

import React from 'react';
import { useRipple } from '@/hooks/useRipple';
import styles from './PackageCard.module.css';

export interface PackageCardProps {
  /**
   * Title of the package
   */
  title: string;
  /**
   * Duration of the package
   */
  duration: string;
  /**
   * Price of the package
   */
  price: string;
  /**
   * List of items included in the package
   */
  includes: string[];
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * PackageCard component displays wellness packages with
 * elegant design and enhanced interactions
 */
export default function PackageCard({
  title,
  duration,
  price,
  includes,
  className = '',
}: PackageCardProps) {
  const { ripples, createRipple } = useRipple();

  return (
    <div className={`${styles.card} ${className}`} onClick={createRipple}>
      {/* Header with title and price */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.price}>{price}</div>
      </div>

      {/* Duration */}
      <div className={styles.duration}>{duration}</div>

      {/* Divider line */}
      <div className={styles.divider} />

      {/* Includes List */}
      <ul className={styles.includesList}>
        {includes.map((item, index) => (
          <li key={index} className={styles.includesItem}>
            <span className={styles.checkmark}>✓</span>
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>

      {/* Decorative gradient overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      {/* Corner accent */}
      <div className={styles.cornerAccent} aria-hidden="true" />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
}

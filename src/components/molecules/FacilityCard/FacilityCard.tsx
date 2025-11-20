'use client';

import React from 'react';
import { useRipple } from '@/hooks/useRipple';
import styles from './FacilityCard.module.css';

export interface FacilityCardProps {
  /**
   * Name of the facility
   */
  name: string;
  /**
   * Description of the facility
   */
  description: string;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * FacilityCard component displays wellness facilities with
 * minimalist design and subtle interactions
 */
export default function FacilityCard({
  name,
  description,
  className = '',
}: FacilityCardProps) {
  const { ripples, createRipple } = useRipple();

  return (
    <div className={`${styles.card} ${className}`} onClick={createRipple}>
      {/* Side accent bar */}
      <div className={styles.accentBar} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Decorative corner dot */}
      <div className={styles.cornerDot} aria-hidden="true" />

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

'use client';

import React, { ReactNode } from 'react';
import { useRipple } from '@/hooks/useRipple';
import styles from './ActivityCard.module.css';

export interface ActivityCardProps {
  /**
   * Title of the activity
   */
  title: string;
  /**
   * Description of the activity
   */
  description: string;
  /**
   * Schedule information
   */
  schedule: string;
  /**
   * Icon to display (SVG element)
   */
  icon: ReactNode;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * ActivityCard component displays wellness activities with
 * organic design and enhanced interactions
 */
export default function ActivityCard({
  title,
  description,
  schedule,
  icon,
  className = '',
}: ActivityCardProps) {
  const { ripples, createRipple } = useRipple();

  return (
    <div className={`${styles.card} ${className}`} onClick={createRipple}>
      {/* Icon Container */}
      <div className={styles.iconContainer}>
        <div className={styles.icon}>{icon}</div>
      </div>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Schedule Badge */}
      <div className={styles.schedule}>{schedule}</div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Decorative gradient overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

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

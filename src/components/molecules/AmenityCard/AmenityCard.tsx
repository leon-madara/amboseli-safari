'use client';

import { ReactNode } from 'react';
import styles from './AmenityCard.module.css';

export interface AmenityCardProps {
  /** SVG icon element */
  icon: ReactNode;
  /** Card title */
  title: string;
  /** Card description text */
  description: string;
  /** Optional variant for different visual styles */
  variant?: 'default' | 'featured';
  /** Optional additional class name */
  className?: string;
}

export default function AmenityCard({
  icon,
  title,
  description,
  variant = 'default',
  className = '',
}: AmenityCardProps) {
  return (
    <div
      className={`${styles.card} ${variant === 'featured' ? styles.featured : ''} ${className}`}
    >
      {/* Subtle background pattern layer */}
      <div className={styles.patternLayer} aria-hidden="true" />
      
      {/* Gradient overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>{icon}</div>
        </div>
        
        <h3 className={styles.title}>{title}</h3>
        
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}


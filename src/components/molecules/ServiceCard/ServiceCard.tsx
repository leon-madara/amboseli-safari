'use client';

import React, { ReactNode } from 'react';
import styles from './ServiceCard.module.css';

export type CardSize = 'small' | 'medium' | 'large';

export interface Treatment {
  name: string;
  description: string;
  duration: string;
}

export interface ServiceCardProps {
  /**
   * Title of the service category
   */
  title: string;
  /**
   * List of treatments in this service category
   */
  treatments: Treatment[];
  /**
   * Icon to display (SVG element)
   */
  icon: ReactNode;
  /**
   * Size of the card in Bento grid
   */
  size?: CardSize;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * ServiceCard component displays a service category with treatments
 * in organic, flowing design with enhanced hover states
 */
export default function ServiceCard({
  title,
  treatments,
  icon,
  size = 'medium',
  className = '',
}: ServiceCardProps) {
  return (
    <div className={`${styles.card} ${styles[size]} ${className}`}>
      {/* Icon Container */}
      <div className={styles.iconContainer}>
        <div className={styles.icon}>{icon}</div>
      </div>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Treatments List */}
      <div className={styles.treatmentsList}>
        {treatments.map((treatment, index) => (
          <div key={index} className={styles.treatment}>
            <div className={styles.treatmentHeader}>
              <h4 className={styles.treatmentName}>{treatment.name}</h4>
              <span className={styles.treatmentDuration}>{treatment.duration}</span>
            </div>
            <p className={styles.treatmentDescription}>{treatment.description}</p>
          </div>
        ))}
      </div>

      {/* Decorative gradient overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />
    </div>
  );
}

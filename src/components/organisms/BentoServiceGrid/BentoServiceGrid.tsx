'use client';

import React, { ReactNode } from 'react';
import ServiceCard, { Treatment } from '@/components/molecules/ServiceCard';
import styles from './BentoServiceGrid.module.css';

export interface ServiceCategory {
  title: string;
  treatments: Treatment[];
  icon: ReactNode;
}

export interface BentoServiceGridProps {
  /**
   * Array of service categories to display
   */
  services: ServiceCategory[];
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * BentoServiceGrid displays services in an asymmetric Bento box layout
 * with prioritized sizing based on content importance
 */
export default function BentoServiceGrid({ services, className = '' }: BentoServiceGridProps) {
  // Define size mapping for Bento layout
  // First service gets large card, others get medium
  const sizeMap = ['large', 'medium', 'medium', 'medium'];

  return (
    <div className={`${styles.bentoGrid} ${className}`}>
      {services.map((service, index) => (
        <div key={index} className={styles[`gridArea${index + 1}`]} data-grid-area={index + 1}>
          <ServiceCard
            title={service.title}
            treatments={service.treatments}
            icon={service.icon}
            size={sizeMap[index] as 'small' | 'medium' | 'large'}
          />
        </div>
      ))}
    </div>
  );
}

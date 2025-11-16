'use client';

import { ReactNode } from 'react';
import styles from './InfoCard.module.css';

export interface InfoCardProps {
  icon: string | ReactNode;
  title: string;
  content: string;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export function InfoCard({
  icon,
  title,
  content,
  variant = 'default',
  className = '',
}: InfoCardProps) {
  return (
    <div className={`${styles.infoCard} ${styles[variant]} ${className}`}>
      <div className={styles.iconContainer}>
        {typeof icon === 'string' ? (
          <span className={styles.iconEmoji} aria-hidden="true">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

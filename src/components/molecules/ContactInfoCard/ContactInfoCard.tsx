'use client';

import { ReactNode, useState } from 'react';
import styles from './ContactInfoCard.module.css';

interface ContactInfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  link: string | null;
}

/**
 * ContactInfoCard Component
 * 
 * Interactive card displaying contact information with hover effects.
 * Extracted as a Client Component to support event handlers.
 */
export default function ContactInfoCard({ icon, title, value, link }: ContactInfoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      <div
        data-icon
        className={styles.iconContainer}
        style={{
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {link ? (
        <a href={link} className={styles.link}>
          {value}
        </a>
      ) : (
        <p className={styles.value}>{value}</p>
      )}
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        className={`${styles.card} ${styles.clickable}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      }}
    >
      {content}
    </div>
  );
}

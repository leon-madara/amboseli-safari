'use client';

import { ReactNode, useState } from 'react';
import styles from './ContactActionButton.module.css';

interface ContactActionButtonProps {
  href: string;
  icon: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

/**
 * ContactActionButton Component
 * 
 * Interactive button for contact actions with hover effects.
 * Extracted as a Client Component to support event handlers.
 */
export default function ContactActionButton({
  href,
  icon,
  children,
  variant = 'primary',
}: ContactActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      <span style={{ fontSize: '1.2em' }}>{icon}</span>
      {children}
    </a>
  );
}

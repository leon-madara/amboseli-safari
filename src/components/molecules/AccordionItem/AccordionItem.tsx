'use client';

import { useState, ReactNode } from 'react';
import styles from './AccordionItem.module.css';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
}

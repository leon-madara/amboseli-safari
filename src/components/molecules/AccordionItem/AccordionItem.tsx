'use client';

import { useState, ReactNode } from 'react';
import FeedbackButtons from '@/components/atoms/FeedbackButtons';
import styles from './AccordionItem.module.css';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  questionId?: string;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  questionId,
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
      {isOpen && (
        <div className={styles.content}>
          <div className={styles.answer}>{children}</div>
          {questionId && <FeedbackButtons questionId={questionId} />}
        </div>
      )}
    </div>
  );
}

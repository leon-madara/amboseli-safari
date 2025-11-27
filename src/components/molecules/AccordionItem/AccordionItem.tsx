'use client';

import { useState, useEffect, ReactNode, useRef } from 'react';
import FeedbackButtons from '@/components/atoms/FeedbackButtons';
import styles from './AccordionItem.module.css';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  questionId?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onNavigateNext?: () => void;
  onNavigatePrevious?: () => void;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  questionId,
  isOpen: controlledIsOpen,
  onToggle,
  onNavigateNext,
  onNavigatePrevious,
}: AccordionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const [showCopied, setShowCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Sync internal state with controlled state when it changes
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setInternalIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleCopyLink = async () => {
    if (questionId) {
      const url = `${window.location.origin}${window.location.pathname}#${questionId}`;
      try {
        await navigator.clipboard.writeText(url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        onNavigateNext?.();
        break;
      case 'ArrowUp':
        e.preventDefault();
        onNavigatePrevious?.();
        break;
      case 'Home':
        e.preventDefault();
        // Navigate to first item - handled by parent
        break;
      case 'End':
        e.preventDefault();
        // Navigate to last item - handled by parent
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          handleToggle();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleToggle();
        break;
    }
  };

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <button
        ref={buttonRef}
        className={styles.trigger}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={questionId ? `faq-content-${questionId}` : undefined}
      >
        <span>{title}</span>
        <div className={styles.controls}>
          {questionId && isOpen && (
            <span
              role="button"
              tabIndex={0}
              className={styles.copyButton}
              onClick={(e) => {
                e.stopPropagation();
                handleCopyLink();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopyLink();
                }
              }}
              aria-label="Copy link to this question"
              title="Copy link"
            >
              {showCopied ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.buttonText}>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 5.5C10 5.5 10 3.5 10 3C10 2 9.5 1.5 8.5 1.5H3C2 1.5 1.5 2 1.5 3V8.5C1.5 9.5 2 10 3 10H4.5M6 14.5H11.5C12.5 14.5 13 14 13 13V7.5C13 6.5 12.5 6 11.5 6H6C5 6 4.5 6.5 4.5 7.5V13C4.5 14 5 14.5 6 14.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.buttonText}>Copy Link</span>
                </>
              )}
            </span>
          )}
          <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>
      {isOpen && (
        <div
          id={questionId ? `faq-content-${questionId}` : undefined}
          className={styles.content}
          role="region"
          aria-labelledby={questionId ? `faq-trigger-${questionId}` : undefined}
        >
          <div className={styles.answer}>{children}</div>
          {questionId && <FeedbackButtons questionId={questionId} />}
        </div>
      )}
    </div>
  );
}

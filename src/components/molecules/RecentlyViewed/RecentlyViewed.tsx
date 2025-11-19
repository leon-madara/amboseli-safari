'use client';

import { useState, useEffect } from 'react';
import { FAQ } from '@/types/faq';
import styles from './RecentlyViewed.module.css';

interface RecentlyViewedProps {
  faqs: FAQ[];
  onFaqClick: (faqId: string) => void;
}

interface ViewedFaq {
  id: string;
  timestamp: number;
}

const MAX_RECENT_ITEMS = 5;
const STORAGE_KEY = 'faq-recently-viewed';

export default function RecentlyViewed({ faqs, onFaqClick }: RecentlyViewedProps) {
  const [recentFaqs, setRecentFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    loadRecentFaqs();
  }, [faqs]);

  const loadRecentFaqs = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const viewedItems: ViewedFaq[] = JSON.parse(stored);
        // Get the actual FAQ objects for the recently viewed IDs
        const recent = viewedItems
          .map((item) => faqs.find((faq) => faq.id === item.id))
          .filter((faq): faq is FAQ => faq !== undefined)
          .slice(0, MAX_RECENT_ITEMS);
        setRecentFaqs(recent);
      }
    } catch (err) {
      console.error('Error loading recent FAQs:', err);
    }
  };

  const handleFaqClick = (faqId: string) => {
    onFaqClick(faqId);
  };

  const clearRecent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentFaqs([]);
    } catch (err) {
      console.error('Error clearing recent FAQs:', err);
    }
  };

  if (recentFaqs.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.icon} aria-hidden="true">
            🕒
          </span>
          Recently Viewed
        </h3>
        <button onClick={clearRecent} className={styles.clearButton} aria-label="Clear recent history">
          Clear
        </button>
      </div>

      <ul className={styles.list}>
        {recentFaqs.map((faq) => (
          <li key={faq.id} className={styles.item}>
            <button
              onClick={() => handleFaqClick(faq.id)}
              className={styles.faqButton}
              aria-label={`Jump to: ${faq.question}`}
            >
              <span className={styles.question}>{faq.question}</span>
              <svg
                className={styles.arrow}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 11L9 7L5 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export function to track FAQ views
export const trackFaqView = (faqId: string) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let viewedItems: ViewedFaq[] = stored ? JSON.parse(stored) : [];

    // Remove if already exists
    viewedItems = viewedItems.filter((item) => item.id !== faqId);

    // Add to beginning
    viewedItems.unshift({
      id: faqId,
      timestamp: Date.now(),
    });

    // Keep only max items
    viewedItems = viewedItems.slice(0, MAX_RECENT_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedItems));
  } catch (err) {
    console.error('Error tracking FAQ view:', err);
  }
};

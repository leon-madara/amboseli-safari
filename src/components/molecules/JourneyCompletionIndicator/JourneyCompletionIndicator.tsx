'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTER_CONFIGS } from '@/data/chapters';
import styles from './JourneyCompletionIndicator.module.css';

/**
 * JourneyCompletionIndicator Component Props
 */
export interface JourneyCompletionIndicatorProps {
  className?: string;
}

/**
 * JourneyCompletionIndicator Molecule Component
 * 
 * Displays a summary indicator when the user completes scrolling through all chapters.
 * Shows key highlights from the journey and encourages booking.
 * 
 * Features:
 * - Appears when user reaches the end of the journey
 * - Shows chapter count and journey highlights
 * - Animated entrance with Framer Motion
 * - Dismissible by user
 * - Responsive design
 * 
 * @example
 * <JourneyCompletionIndicator />
 */
export function JourneyCompletionIndicator({
  className = '',
}: JourneyCompletionIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkCompletion = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);

      // Show when user has scrolled 95% or more
      if (scrollPercent >= 0.95 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPercent < 0.90) {
        setIsVisible(false);
      }
    };

    // Check on scroll
    window.addEventListener('scroll', checkCompletion, { passive: true });
    
    // Initial check
    checkCompletion();

    return () => window.removeEventListener('scroll', checkCompletion);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const completedChapters = CHAPTER_CONFIGS.filter(
    (chapter) => chapter.component !== null
  ).length;

  const highlights = [
    { icon: '🦁', label: 'Wildlife Encounters' },
    { icon: '🏕️', label: 'Luxury Accommodations' },
    { icon: '🍽️', label: 'Gourmet Dining' },
    { icon: '🧘', label: 'Wellness Experiences' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${styles.container} ${className}`}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
        >
          <button
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss journey completion indicator"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className={styles.content}>
            <motion.div
              className={styles.icon}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              ✨
            </motion.div>

            <h3 className={styles.title}>Your Journey So Far</h3>
            
            <p className={styles.description}>
              You&apos;ve explored {completedChapters} chapters of the Amboseli Safari experience
            </p>

            <div className={styles.highlights}>
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.label}
                  className={styles.highlight}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className={styles.highlightIcon}>{highlight.icon}</span>
                  <span className={styles.highlightLabel}>{highlight.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={styles.ctaContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="/contact"
                className={styles.primaryCta}
              >
                Start Planning Your Safari
              </a>
              <a
                href="/experiences"
                className={styles.secondaryCta}
              >
                Explore More
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect } from 'react';
import styles from './OfferTimer.module.css';

export interface OfferTimerProps {
  expiresAt: Date;
  offerText?: string;
  onExpire?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function OfferTimer({
  expiresAt,
  offerText = 'Special Offer Ends In',
  onExpire,
}: OfferTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const difference = expiresAt.getTime() - new Date().getTime();

      if (difference <= 0) {
        if (!hasExpired) {
          setHasExpired(true);
          onExpire?.();
        }
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, hasExpired, onExpire]);

  if (hasExpired || !timeLeft) {
    return null;
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 6;

  return (
    <div className={`${styles.container} ${isUrgent ? styles.urgent : ''}`}>
      <div className={styles.header}>
        <span className={styles.icon}>⏰</span>
        <span className={styles.label}>{offerText}</span>
      </div>

      <div className={styles.timer}>
        {timeLeft.days > 0 && (
          <div className={styles.unit}>
            <span className={styles.value}>{timeLeft.days}</span>
            <span className={styles.unitLabel}>
              {timeLeft.days === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        )}

        <div className={styles.unit}>
          <span className={styles.value}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className={styles.unitLabel}>Hours</span>
        </div>

        <div className={styles.separator}>:</div>

        <div className={styles.unit}>
          <span className={styles.value}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className={styles.unitLabel}>Min</span>
        </div>

        <div className={styles.separator}>:</div>

        <div className={styles.unit}>
          <span className={styles.value}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className={styles.unitLabel}>Sec</span>
        </div>
      </div>

      {isUrgent && (
        <div className={styles.urgencyBadge}>
          🔥 Last chance!
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

export interface CountdownTimerProps {
  targetDate: string; // ISO date string (e.g., "2025-12-01")
  label?: string;
  className?: string;
  showLabels?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({
  targetDate,
  label = 'Opening in',
  className = '',
  showLabels = true,
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeRemaining = (): TimeRemaining => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Prevent hydration mismatch by not rendering time until mounted
  if (!isMounted) {
    return (
      <div className={`${styles.countdown} ${className}`}>
        <div className={styles.label}>{label}</div>
        <div className={styles.timeUnits}>
          <div className={styles.timeUnit}>
            <div className={styles.number}>--</div>
            {showLabels && <div className={styles.unitLabel}>Days</div>}
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.timeUnit}>
            <div className={styles.number}>--</div>
            {showLabels && <div className={styles.unitLabel}>Hours</div>}
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.timeUnit}>
            <div className={styles.number}>--</div>
            {showLabels && <div className={styles.unitLabel}>Minutes</div>}
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.timeUnit}>
            <div className={styles.number}>--</div>
            {showLabels && <div className={styles.unitLabel}>Seconds</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.countdown} ${className}`}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.timeUnits}>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{String(timeRemaining.days).padStart(2, '0')}</div>
          {showLabels && <div className={styles.unitLabel}>Days</div>}
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{String(timeRemaining.hours).padStart(2, '0')}</div>
          {showLabels && <div className={styles.unitLabel}>Hours</div>}
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{String(timeRemaining.minutes).padStart(2, '0')}</div>
          {showLabels && <div className={styles.unitLabel}>Minutes</div>}
        </div>
        <div className={styles.separator}>:</div>
        <div className={styles.timeUnit}>
          <div className={styles.number}>{String(timeRemaining.seconds).padStart(2, '0')}</div>
          {showLabels && <div className={styles.unitLabel}>Seconds</div>}
        </div>
      </div>
    </div>
  );
}

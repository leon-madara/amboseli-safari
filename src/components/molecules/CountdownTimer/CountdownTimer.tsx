'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './CountdownTimer.module.css';

export interface CountdownTimerProps {
  targetDate: string; // ISO date string, e.g., "2025-12-01"
  label?: string;
  className?: string;
  showLabels?: boolean;
}

interface TimeLeft {
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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(targetDate) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className={`${styles.countdown} ${className}`}>
        <p className={styles.label}>{label}</p>
        <div className={styles.timeContainer}>
          <div className={styles.timeBlock}>
            <span className={styles.number}>--</span>
            {showLabels && <span className={styles.unit}>Days</span>}
          </div>
        </div>
      </div>
    );
  }

  const timeBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <motion.div
      className={`${styles.countdown} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.timeContainer}>
        {timeBlocks.map((block, index) => (
          <div key={block.label} className={styles.timeBlock}>
            <motion.span
              className={styles.number}
              key={block.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {String(block.value).padStart(2, '0')}
            </motion.span>
            {showLabels && <span className={styles.unit}>{block.label}</span>}
            {index < timeBlocks.length - 1 && (
              <span className={styles.separator}>:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

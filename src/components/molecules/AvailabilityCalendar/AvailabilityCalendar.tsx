'use client';

import { useState, useMemo } from 'react';
import styles from './AvailabilityCalendar.module.css';

export interface AvailabilityCalendarProps {
  availability?: 'available' | 'limited' | 'sold-out';
  onDateSelect?: (date: Date) => void;
}

interface CalendarDay {
  date: Date;
  status: 'available' | 'limited' | 'unavailable';
  price?: string;
}

export default function AvailabilityCalendar({
  availability = 'available',
  onDateSelect,
}: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate next 30 days
  const calendarDays = useMemo((): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Simulate availability (in real app, this would come from API)
      let status: 'available' | 'limited' | 'unavailable';
      const random = Math.random();

      if (availability === 'sold-out') {
        status = random > 0.9 ? 'limited' : 'unavailable';
      } else if (availability === 'limited') {
        status = random > 0.7 ? 'available' : random > 0.3 ? 'limited' : 'unavailable';
      } else {
        status = random > 0.8 ? 'limited' : random > 0.1 ? 'available' : 'unavailable';
      }

      days.push({ date, status });
    }

    return days;
  }, [availability]);

  const handleDateClick = (day: CalendarDay) => {
    if (day.status !== 'unavailable') {
      setSelectedDate(day.date);
      onDateSelect?.(day.date);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h4 className={styles.title}>Check Availability</h4>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendAvailable}`} />
            Available
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendLimited}`} />
            Limited
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendUnavailable}`} />
            Booked
          </span>
        </div>
      </div>

      <div className={styles.grid}>
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={day.status === 'unavailable'}
            className={`
              ${styles.day}
              ${styles[`day${day.status.charAt(0).toUpperCase() + day.status.slice(1)}`]}
              ${isToday(day.date) ? styles.dayToday : ''}
              ${isSelected(day.date) ? styles.daySelected : ''}
            `}
            aria-label={`${formatDate(day.date)}, ${day.status}`}
          >
            <span className={styles.dayOfWeek}>{formatDayOfWeek(day.date)}</span>
            <span className={styles.dayNumber}>{day.date.getDate()}</span>
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className={styles.footer}>
          <p className={styles.selectedInfo}>
            Selected: <strong>{formatDate(selectedDate)}</strong>
          </p>
          <button className={styles.bookButton}>
            Book for {formatDate(selectedDate)}
          </button>
        </div>
      )}
    </div>
  );
}

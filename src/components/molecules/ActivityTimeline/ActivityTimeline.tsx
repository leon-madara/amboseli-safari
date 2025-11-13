'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './ActivityTimeline.module.css';

export interface ActivityTimelineProps {
  morning: string[];
  afternoon: string[];
  evening: string[];
  seasonalTags?: {
    activity: string;
    season: string;
  }[];
}

type TimeFilter = 'all' | 'morning' | 'afternoon' | 'evening';

export default function ActivityTimeline({
  morning,
  afternoon,
  evening,
  seasonalTags = [
    { activity: 'Game Drive', season: 'Best: June - October (Dry Season)' },
    { activity: 'Bird Watching', season: 'Best: November - April (Wet Season)' },
    { activity: 'Walking Safari', season: 'Best: June - October (Dry Season)' },
  ],
}: ActivityTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('all');

  const getTimeIcon = (time: TimeFilter) => {
    switch (time) {
      case 'morning':
        return '🌅';
      case 'afternoon':
        return '☀️';
      case 'evening':
        return '🌇';
      default:
        return '🕐';
    }
  };

  const shouldShowTimeSlot = (time: TimeFilter) => {
    return activeFilter === 'all' || activeFilter === time;
  };

  const getSeasonalTag = (activity: string) => {
    return seasonalTags.find((tag) => 
      activity.toLowerCase().includes(tag.activity.toLowerCase())
    );
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Plan Your Day</h3>
        <p className={styles.subtitle}>
          Choose activities that match your adventure style
        </p>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${
            activeFilter === 'all' ? styles.filterButtonActive : ''
          }`}
          onClick={() => setActiveFilter('all')}
          aria-label="Show all activities"
        >
          All Day
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === 'morning' ? styles.filterButtonActive : ''
          }`}
          onClick={() => setActiveFilter('morning')}
          aria-label="Show morning activities"
        >
          {getTimeIcon('morning')} Morning
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === 'afternoon' ? styles.filterButtonActive : ''
          }`}
          onClick={() => setActiveFilter('afternoon')}
          aria-label="Show afternoon activities"
        >
          {getTimeIcon('afternoon')} Afternoon
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === 'evening' ? styles.filterButtonActive : ''
          }`}
          onClick={() => setActiveFilter('evening')}
          aria-label="Show evening activities"
        >
          {getTimeIcon('evening')} Evening
        </button>
      </div>

      {/* Timeline Grid */}
      <div className={styles.timelineGrid}>
        {/* Morning Activities */}
        {shouldShowTimeSlot('morning') && (
          <motion.div
            className={styles.timeSlot}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.timeSlotHeader}>
              <span className={styles.timeIcon}>{getTimeIcon('morning')}</span>
              <h4 className={styles.timeSlotTitle}>Morning</h4>
              <span className={styles.timeRange}>6:00 AM - 12:00 PM</span>
            </div>

            <ul className={styles.activityList}>
              {morning.map((activity, index) => {
                const seasonalTag = getSeasonalTag(activity);
                return (
                  <motion.li
                    key={index}
                    className={styles.activityItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className={styles.activityBullet}>•</span>
                    <span className={styles.activityName}>{activity}</span>
                    {seasonalTag && (
                      <motion.span
                        className={styles.seasonalTag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        {seasonalTag.season}
                      </motion.span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* Afternoon Activities */}
        {shouldShowTimeSlot('afternoon') && (
          <motion.div
            className={styles.timeSlot}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className={styles.timeSlotHeader}>
              <span className={styles.timeIcon}>{getTimeIcon('afternoon')}</span>
              <h4 className={styles.timeSlotTitle}>Afternoon</h4>
              <span className={styles.timeRange}>12:00 PM - 6:00 PM</span>
            </div>

            <ul className={styles.activityList}>
              {afternoon.map((activity, index) => {
                const seasonalTag = getSeasonalTag(activity);
                return (
                  <motion.li
                    key={index}
                    className={styles.activityItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className={styles.activityBullet}>•</span>
                    <span className={styles.activityName}>{activity}</span>
                    {seasonalTag && (
                      <motion.span
                        className={styles.seasonalTag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        {seasonalTag.season}
                      </motion.span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* Evening Activities */}
        {shouldShowTimeSlot('evening') && (
          <motion.div
            className={styles.timeSlot}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className={styles.timeSlotHeader}>
              <span className={styles.timeIcon}>{getTimeIcon('evening')}</span>
              <h4 className={styles.timeSlotTitle}>Evening</h4>
              <span className={styles.timeRange}>6:00 PM - 10:00 PM</span>
            </div>

            <ul className={styles.activityList}>
              {evening.map((activity, index) => {
                const seasonalTag = getSeasonalTag(activity);
                return (
                  <motion.li
                    key={index}
                    className={styles.activityItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className={styles.activityBullet}>•</span>
                    <span className={styles.activityName}>{activity}</span>
                    {seasonalTag && (
                      <motion.span
                        className={styles.seasonalTag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        {seasonalTag.season}
                      </motion.span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import type { DiningExperience } from '@/data/dining';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience?: DiningExperience;
  index?: number;
  id?: string;
  title?: string;
  image?: string;
  duration?: string;
  difficulty?: string;
  timeOfDay?: string;
}

const timeIcons: Record<string, string> = {
  'Early Morning': '🌅',
  'Evening': '🌆',
  'By Arrangement': '📅',
  'By Reservation': '🍴',
  'Morning': '🌅',
  'Afternoon': '☀️',
};

export default function ExperienceCard({
  experience,
  index = 0,
  id,
  title,
  image,
  duration,
  difficulty,
  timeOfDay
}: ExperienceCardProps) {
  // Handle both dining experience and safari experience formats
  const displayTime = experience?.time || timeOfDay || 'By Arrangement';
  const displayTitle = experience?.title || title || 'Experience';
  const displayDescription = experience?.description || `${duration || ''} ${difficulty || ''}`.trim();

  const icon = timeIcons[displayTime] || '✨';

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className={styles.topBar} />

      <motion.div
        className={styles.iconContainer}
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.08 + 0.2,
          type: 'spring',
          bounce: 0.4,
        }}
      >
        <span className={styles.icon}>{icon}</span>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.badge}>{displayTime}</div>

        <h3 className={styles.title}>{displayTitle}</h3>

        <p className={styles.description}>{displayDescription}</p>
      </div>
    </motion.div>
  );
}

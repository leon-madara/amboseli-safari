'use client';

import { motion } from 'framer-motion';
import type { DiningExperience } from '@/data/dining';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: DiningExperience;
  index: number;
}

const timeIcons: Record<string, string> = {
  'Early Morning': '🌅',
  'Evening': '🌆',
  'By Arrangement': '📅',
  'By Reservation': '🍴',
};

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const icon = timeIcons[experience.time] || '✨';

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
        <div className={styles.badge}>{experience.time}</div>

        <h3 className={styles.title}>{experience.title}</h3>

        <p className={styles.description}>{experience.description}</p>
      </div>
    </motion.div>
  );
}

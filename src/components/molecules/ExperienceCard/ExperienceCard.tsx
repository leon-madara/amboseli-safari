'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import styles from './ExperienceCard.module.css';

export interface ExperienceCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  description?: string;
}

export default function ExperienceCard({
  id,
  title,
  image,
  duration,
  difficulty,
  timeOfDay,
  description = 'Discover the wonders of the African wilderness with our expertly guided experiences.',
}: ExperienceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return '#10b981';
      case 'Moderate':
        return '#f59e0b';
      case 'Challenging':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTimeOfDayIcon = (time: string) => {
    switch (time) {
      case 'Morning':
        return '🌅';
      case 'Afternoon':
        return '☀️';
      case 'Evening':
        return '🌇';
      default:
        return '🕐';
    }
  };

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={styles.card}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card */}
        <div className={styles.cardFront}>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} />
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>⏱️</span>
                <span className={styles.detailText}>{duration}</span>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>{getTimeOfDayIcon(timeOfDay)}</span>
                <span className={styles.detailText}>{timeOfDay}</span>
              </div>
            </div>

            <motion.div
              className={styles.difficultyBadge}
              style={{ backgroundColor: getDifficultyColor(difficulty) }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              {difficulty}
            </motion.div>
          </div>
        </div>

        {/* Back of Card */}
        <div className={styles.cardBack}>
          <div className={styles.backContent}>
            <h3 className={styles.backTitle}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <div className={styles.backDetails}>
              <div className={styles.backDetailItem}>
                <span className={styles.backDetailLabel}>Duration:</span>
                <span className={styles.backDetailValue}>{duration}</span>
              </div>

              <div className={styles.backDetailItem}>
                <span className={styles.backDetailLabel}>Best Time:</span>
                <span className={styles.backDetailValue}>{timeOfDay}</span>
              </div>

              <div className={styles.backDetailItem}>
                <span className={styles.backDetailLabel}>Difficulty:</span>
                <span
                  className={styles.backDetailValue}
                  style={{ color: getDifficultyColor(difficulty) }}
                >
                  {difficulty}
                </span>
              </div>
            </div>

            <div className={styles.hoverHint}>
              Hover to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

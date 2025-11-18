'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ExperienceType } from '@/types/experience';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: ExperienceType;
}

const PLACEHOLDER_IMAGE = '/images/experiences/placeholder.svg';

function getTimeOfDay(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('sunrise') || lowerTitle.includes('dawn')) return 'Early Morning';
  if (lowerTitle.includes('sunset') || lowerTitle.includes('evening')) return 'Evening';
  if (lowerTitle.includes('night')) return 'Night';
  return 'Daytime';
}

function getTimeIcon(timeOfDay: string): string {
  const icons: Record<string, string> = {
    'Early Morning': '🌅',
    'Evening': '🌆',
    'Night': '🌙',
    'Daytime': '☀️',
  };
  return icons[timeOfDay] || '✨';
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [imageSrc, setImageSrc] = useState(experience.image || PLACEHOLDER_IMAGE);
  const [imageError, setImageError] = useState(false);
  const timeOfDay = getTimeOfDay(experience.title);
  const timeIcon = getTimeIcon(timeOfDay);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(PLACEHOLDER_IMAGE);
    }
  };

  return (
    <Link href={`/experiences/${experience.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={`${experience.title} - ${experience.shortDescription}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
          loading="lazy"
          quality={85}
          onError={handleImageError}
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.badge} aria-label={`Available during ${timeOfDay}`}>
          <span className={styles.badgeIcon}>{timeIcon}</span>
          <span className={styles.badgeText}>{timeOfDay}</span>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{experience.title}</h3>
        <p className={styles.description}>{experience.shortDescription}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            {experience.duration}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📊</span>
            {experience.difficulty}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.cta}>Explore Experience →</span>
      </div>
    </Link>
  );
}

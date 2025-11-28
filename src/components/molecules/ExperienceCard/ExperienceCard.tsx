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
      {/* Full-bleed image with gradient overlay */}
      <div className={styles.imageWrapper}>
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
      </div>

      {/* Content overlay at bottom */}
      <div className={styles.contentOverlay}>
        <h3 className={styles.title}>{experience.title}</h3>

        {/* Description */}
        <p className={styles.description}>{experience.shortDescription}</p>

        {/* Pill tags */}
        <div className={styles.tags}>
          <span className={styles.tag} aria-label={`Available during ${timeOfDay}`}>
            <span className={styles.tagIcon}>{timeIcon}</span>
            {timeOfDay}
          </span>
          <span className={styles.tag}>
            <span className={styles.tagIcon}>⏱️</span>
            {experience.duration}
          </span>
          <span className={styles.tag}>
            <span className={styles.tagIcon}>📊</span>
            {experience.difficulty}
          </span>
        </div>

        {/* CTA Button */}
        <button className={styles.ctaButton} tabIndex={-1}>
          Explore
        </button>
      </div>
    </Link>
  );
}

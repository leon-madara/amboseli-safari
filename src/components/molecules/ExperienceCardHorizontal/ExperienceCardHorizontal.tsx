'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ExperienceType } from '@/types/experience';
import type { ChapterColorScheme } from '@/utils/timeline';
import styles from './ExperienceCardHorizontal.module.css';

interface ExperienceCardHorizontalProps {
  experience: ExperienceType;
  chapterTheme: ChapterColorScheme;
  index: number;
}

export function ExperienceCardHorizontal({
  experience,
  chapterTheme,
  index,
}: ExperienceCardHorizontalProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--badge-gradient': chapterTheme.badgeGradient,
        '--chapter-primary': chapterTheme.primary,
      } as React.CSSProperties}
    >
      <Link href={`/experiences/${experience.slug}`} className={styles.link}>
        {/* Image container */}
        <div className={styles.imageContainer}>
          <Image
            src={experience.image}
            alt={experience.title}
            width={760}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
            quality={85}
            className={styles.image}
            loading="lazy"
          />

          {/* Overlay */}
          <div className={styles.overlay} />

          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeText}>{experience.difficulty}</span>
          </div>

          {/* CTA Button - appears on hover */}
          <div className={`${styles.ctaContainer} ${isHovered ? styles.visible : ''}`}>
            <span className={styles.ctaButton}>
              Learn More
              <svg
                className={styles.ctaArrow}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>{experience.title}</h3>
          <p className={styles.description}>{experience.shortDescription}</p>

          {/* Meta information */}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <svg
                className={styles.metaIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5V8L10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{experience.duration}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.price}>${experience.price}</span>
              <span className={styles.priceLabel}>per person</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

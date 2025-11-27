'use client';

import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import ExperienceCard from '@/components/molecules/ExperienceCard';
import ActivityTimeline from '@/components/molecules/ActivityTimeline';
import { CHAPTER_IMAGES, EXPERIENCE_CARD_IMAGES } from '@/data/images';
import styles from './ExperiencesChapter.module.css';

export interface ExperiencePreview {
  id: string;
  title: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
}

export interface ActivityTimeline {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface ExperiencesChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  experiences?: ExperiencePreview[];
  timeline?: ActivityTimeline;
  ctaButton?: CTAButton;
}

export default function ExperiencesChapter({
  id,
  className = '',
  backgroundImage = CHAPTER_IMAGES.experiences.goldenHour,
  experiences = [
    {
      id: 'game-drive',
      title: 'Game Drive Safari',
      image: EXPERIENCE_CARD_IMAGES.gameDrive,
      duration: '3-4 hours',
      difficulty: 'Easy',
      timeOfDay: 'Morning',
    },
    {
      id: 'walking-safari',
      title: 'Guided Walking Safari',
      image: EXPERIENCE_CARD_IMAGES.walkingSafari,
      duration: '2-3 hours',
      difficulty: 'Moderate',
      timeOfDay: 'Morning',
    },
    {
      id: 'bird-watching',
      title: 'Bird Watching Expedition',
      image: EXPERIENCE_CARD_IMAGES.birdWatching,
      duration: '2 hours',
      difficulty: 'Easy',
      timeOfDay: 'Morning',
    },
    {
      id: 'sundowner',
      title: 'Sundowner Experience',
      image: EXPERIENCE_CARD_IMAGES.sundowner,
      duration: '2 hours',
      difficulty: 'Easy',
      timeOfDay: 'Evening',
    },
  ],
  timeline = {
    morning: ['Game Drive', 'Walking Safari', 'Bird Watching'],
    afternoon: ['Bush Lunch', 'Photography Workshop', 'Cultural Visit'],
    evening: ['Sundowner', 'Night Drive', 'Stargazing'],
  },
  ctaButton = {
    text: 'Plan Your Safari',
    href: '/experiences',
    variant: 'primary',
  },
}: ExperiencesChapterProps) {
  // Track chapter progress
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('experiences');

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.experiencesChapter} ${className}`}
      data-chapter="experiences"
      aria-labelledby="experiences-heading"
    >
      {/* Background with golden hour lighting */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundLayer}>
          <div className={styles.backgroundImageWrapper}>
            <OptimizedImage
              src={backgroundImage}
              alt="Game drive at golden hour"
              fill
              imageType="chapter-background"
              className={styles.backgroundImage}
            />
          </div>
        </div>

        {/* Golden hour lighting gradient overlay */}
        <div className={styles.gradientOverlay} />
      </div>

      {/* Main Content - Foreground Layer */}
      <div className={styles.foregroundLayer}>
        <div className={styles.contentWrapper}>
          <div
            className={styles.headerSection}
          >
            <h2 id="experiences-heading" className={styles.heading}>
              Safari Experiences
            </h2>
            <p className={styles.subtitle}>
              Every moment is an adventure
            </p>
          </div>

          {/* Experience Cards */}
          <div className={styles.experiencesGrid}>
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={styles.experienceCardWrapper}
              >
                <ExperienceCard experience={experience as any} />
              </div>
            ))}
          </div>

          {/* Activity Timeline */}
          <div
            className={styles.timelineSection}
          >
            <ActivityTimeline {...timeline} />
          </div>

          {/* CTA */}
          <div
            className={styles.ctaSection}
          >
            <a
              href={ctaButton.href}
              className={`${styles.cta} ${styles[`cta${ctaButton.variant.charAt(0).toUpperCase() + ctaButton.variant.slice(1)}`]
                }`}
              onClick={ctaButton.onClick}
              aria-label={ctaButton.text}
            >
              {ctaButton.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

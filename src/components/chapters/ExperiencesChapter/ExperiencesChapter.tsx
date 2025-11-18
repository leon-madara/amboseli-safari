'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { ParallaxContainer, ParallaxLayer } from '@/components/animations/ParallaxContainer';
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
  // Parallax effect for background (0.3x speed)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const backgroundParallaxOffset = useParallax(backgroundRef, { speed: 0.3, direction: 'down' });

  // Track chapter progress
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('experiences');

  return (
    <ParallaxContainer className={styles.parallaxWrapper}>
      <section
        id={id}
        ref={chapterRef}
        className={`${styles.experiencesChapter} ${className}`}
        data-chapter="experiences"
        aria-labelledby="experiences-heading"
      >
        {/* Background with golden hour lighting and parallax */}
        <div className={styles.backgroundContainer}>
          <ParallaxLayer speed={0.4} className={styles.backgroundLayer} zIndex={1}>
            <div className={styles.backgroundImageWrapper}>
              <OptimizedImage
                src={backgroundImage}
                alt="Game drive at golden hour"
                fill
                imageType="chapter-background"
                className={styles.backgroundImage}
              />
            </div>
          </ParallaxLayer>

          {/* Golden hour lighting gradient overlay */}
          <div className={styles.gradientOverlay} />
        </div>

      {/* Main Content - Foreground Layer */}
      <ParallaxLayer speed={1.0} className={styles.foregroundLayer} zIndex={5}>
        <div className={styles.contentWrapper}>
        <motion.div
          className={styles.headerSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="experiences-heading" className={styles.heading}>
            Safari Experiences
          </h2>
          <p className={styles.subtitle}>
            Every moment is an adventure
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className={styles.experiencesGrid}>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className={styles.experienceCardWrapper}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <ExperienceCard experience={experience as any} />
            </motion.div>
          ))}
        </div>

        {/* Activity Timeline */}
        <motion.div
          className={styles.timelineSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ActivityTimeline {...timeline} />
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href={ctaButton.href}
            className={`${styles.cta} ${
              styles[`cta${ctaButton.variant.charAt(0).toUpperCase() + ctaButton.variant.slice(1)}`]
            }`}
            onClick={ctaButton.onClick}
            aria-label={ctaButton.text}
          >
            {ctaButton.text}
          </a>
        </motion.div>
        </div>
      </ParallaxLayer>
      </section>
    </ParallaxContainer>
  );
}

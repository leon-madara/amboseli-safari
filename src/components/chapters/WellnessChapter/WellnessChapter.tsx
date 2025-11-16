'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { CHAPTER_IMAGES } from '@/data/images';
import styles from './WellnessChapter.module.css';

export interface PoolFeature {
  icon: string;
  title: string;
  description: string;
}

export interface WellnessChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  yogaImage?: string;
  poolFeatures?: PoolFeature[];
  ctaButton?: CTAButton;
}

export default function WellnessChapter({
  id,
  className = '',
  backgroundImage = CHAPTER_IMAGES.wellness.spa,
  yogaImage = CHAPTER_IMAGES.wellness.yogaSunset,
  poolFeatures = [
    {
      icon: '🏊',
      title: 'Large Swimming Pool',
      description: 'Perfect for families to cool off after safari adventures',
    },
    {
      icon: '🍹',
      title: 'Poolside Dining Area',
      description: 'Enjoy refreshments and meals by the water',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family-Friendly Shallow Section',
      description: 'Safe swimming area for children of all ages',
    },
    {
      icon: '🏔️',
      title: 'Kilimanjaro Views from Pool Deck',
      description: 'Stunning mountain vistas while you relax',
    },
    {
      icon: '☀️',
      title: 'Sun Loungers & Shade Areas',
      description: 'Comfortable seating with umbrellas for all-day comfort',
    },
    {
      icon: '🍸',
      title: 'Pool Bar',
      description: 'Refreshing drinks and light snacks served poolside',
    },
  ],
  ctaButton = {
    text: 'View Pool Details',
    href: '/wellness',
    variant: 'primary',
  },
}: WellnessChapterProps) {
  // Parallax effect for yoga silhouette (0.4x speed)
  const yogaRef = useRef<HTMLDivElement>(null);
  const yogaParallaxOffset = useParallax(yogaRef, { speed: 0.4, direction: 'down' });

  // Track chapter progress
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('wellness');

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.wellnessChapter} ${className}`}
      data-chapter="wellness"
      aria-labelledby="wellness-heading"
    >
      {/* Background with sunset colors */}
      <div className={styles.backgroundContainer}>
        <Image
          src={backgroundImage}
          alt="Sunset wellness atmosphere"
          fill
          quality={85}
          sizes="100vw"
          className={styles.backgroundImage}
        />

        {/* Calming sunset gradient overlay */}
        <div className={styles.gradientOverlay} />
      </div>

      {/* Yoga Silhouette with Parallax */}
      <div
        ref={yogaRef}
        className={styles.yogaSilhouetteContainer}
        style={{ transform: `translateY(${yogaParallaxOffset}px)` }}
      >
        <motion.div
          className={styles.yogaSilhouette}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <Image
            src={yogaImage}
            alt="Yoga silhouette at sunset"
            fill
            sizes="(max-width: 768px) 80vw, 600px"
            className={styles.yogaImage}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.headerSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="wellness-heading" className={styles.heading}>
            Pool & Relaxation
          </h2>
          <p className={styles.subtitle}>
            Cool off after your safari adventure
          </p>
        </motion.div>

        {/* Breathing Circle Animation */}
        <motion.div
          className={styles.breathingSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.breathingCircle}>
            <div className={styles.breathingCircleInner} />
            <p className={styles.breathingText}>Breathe</p>
          </div>
        </motion.div>

        {/* Pool Features with Staggered Appearance */}
        <div className={styles.poolFeaturesSection}>
          <motion.h3
            className={styles.poolFeaturesHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Pool Amenities
          </motion.h3>

          <div className={styles.poolFeaturesGrid}>
            {poolFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
    </section>
  );
}

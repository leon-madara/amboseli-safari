'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import styles from './WellnessChapter.module.css';

export interface SpaService {
  name: string;
  duration: string;
  description: string;
}

export interface WellnessChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  yogaImage?: string;
  spaServices?: SpaService[];
  ctaButton?: CTAButton;
}

export default function WellnessChapter({
  id,
  className = '',
  backgroundImage = '/images/chapters/sunset-wellness.jpg',
  yogaImage = '/images/chapters/yoga-silhouette.jpg',
  spaServices = [
    {
      name: 'Savanna Stone Massage',
      duration: '60 minutes',
      description: 'Hot stone therapy with indigenous oils',
    },
    {
      name: 'Sunset Meditation',
      duration: '45 minutes',
      description: 'Guided mindfulness with nature sounds',
    },
    {
      name: 'African Aromatherapy',
      duration: '90 minutes',
      description: 'Full body treatment with local botanicals',
    },
  ],
  ctaButton = {
    text: 'Explore Wellness',
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
            Wellness & Rejuvenation
          </h2>
          <p className={styles.subtitle}>
            Find your inner peace in the wild
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

        {/* Spa Services with Staggered Appearance */}
        <div className={styles.spaServicesSection}>
          <motion.h3
            className={styles.spaServicesHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Spa Treatments
          </motion.h3>

          <div className={styles.spaServicesGrid}>
            {spaServices.map((service, index) => (
              <motion.div
                key={index}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              >
                <div className={styles.serviceIcon}>✨</div>
                <h4 className={styles.serviceName}>{service.name}</h4>
                <p className={styles.serviceDuration}>{service.duration}</p>
                <p className={styles.serviceDescription}>{service.description}</p>
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

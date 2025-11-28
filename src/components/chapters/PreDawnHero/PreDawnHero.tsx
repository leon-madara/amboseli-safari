'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import AtmosphericParticles from '@/components/atoms/AtmosphericParticles/AtmosphericParticles';
import CountdownTimer from '@/components/molecules/CountdownTimer';
import styles from './PreDawnHero.module.css';

export interface PreDawnHeroProps extends BaseChapterProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  logo?: string;
  tagline?: string;
  subtitle?: string;
  launchDate?: string;
  showCountdown?: boolean;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
}

export default function PreDawnHero({
  id,
  className = '',
  backgroundImage = '/images/hero/heroImage.jpg',
  logo = '/images/logos/mainLOGOAmboseli.svg',
  tagline = 'A New Safari Experience Awaits',
  subtitle = 'Opening December 2025 | Amboseli, Kenya',
  launchDate = '2025-12-15',
  showCountdown = true,
  primaryCTA = {
    text: 'Reserve Your Stay',
    href: '#plan-safari',
    variant: 'primary',
  },
  secondaryCTA = {
    text: 'Explore Rooms',
    href: '/accommodations',
    variant: 'secondary',
  },
}: PreDawnHeroProps) {
  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout | null = null;
    
    // Start typing after 1.2s delay
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      typingInterval = setInterval(() => {
        if (currentIndex <= tagline.length) {
          setDisplayedText(tagline.slice(0, currentIndex));
          currentIndex++;
        } else {
          if (typingInterval) clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 80); // Type each character every 80ms
    }, 1200);

    return () => {
      clearTimeout(startDelay);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [tagline]);
  return (
    <section
      id={id}
      className={`${styles.preDawnHero} ${className}`}
      data-chapter="pre-dawn"
      aria-labelledby="pre-dawn-heading"
    >
      {/* Background Image */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage}>
          <OptimizedImage
            src={backgroundImage}
            alt="Mount Kilimanjaro at pre-dawn with silhouette"
            fill
            imageType="hero"
            className={styles.image}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {/* Tagline with Typing Effect */}
          <motion.h1
            id="pre-dawn-heading"
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {displayedText}
            {!isTypingComplete && <span className={styles.cursor}>|</span>}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Countdown Timer */}
          {showCountdown && launchDate && (
            <motion.div
              className={styles.countdownWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <CountdownTimer targetDate={launchDate} showLabels={true} />
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {primaryCTA && (
              <a
                href={primaryCTA.href}
                className={`${styles.cta} ${styles.ctaPrimary}`}
                onClick={primaryCTA.onClick}
                aria-label={primaryCTA.text}
              >
                {primaryCTA.text}
              </a>
            )}
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className={`${styles.cta} ${styles.ctaSecondary}`}
                onClick={secondaryCTA.onClick}
                aria-label={secondaryCTA.text}
              >
                {secondaryCTA.text}
              </a>
            )}
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            className={styles.trustBadge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <span className={styles.trustIcon}>🏔️</span>
            <span className={styles.trustText}>Kenya&apos;s Newest Safari Lodge • Mount Kilimanjaro Views</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        aria-label="Scroll down to explore"
      >
        <div className={styles.scrollIcon}>
          <span className={styles.scrollArrow} />
        </div>
        <span className={styles.scrollText}>Scroll to Begin</span>
      </motion.div>
    </section>
  );
}

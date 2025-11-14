'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import AtmosphericParticles from '@/components/atoms/AtmosphericParticles/AtmosphericParticles';
import styles from './PreDawnHero.module.css';

export interface PreDawnHeroProps extends BaseChapterProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  logo?: string;
  tagline?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
}

export default function PreDawnHero({
  id,
  className = '',
  backgroundImage = '/images/hero/Single Leading Bull Silhouette.jpg',
  logo = '/images/logos/mainLOGOAmboseli.svg',
  tagline = 'Modern Comfort Meets Authentic Safari',
  primaryCTA = {
    text: 'Explore Our Rooms',
    href: '/accommodations',
    variant: 'primary',
  },
  secondaryCTA = {
    text: 'Request Group Quote',
    href: '/contact',
    variant: 'secondary',
  },
}: PreDawnHeroProps) {
  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Parallax effect for background (0.3x speed)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useParallax(backgroundRef, { speed: 0.3, direction: 'down' });

  useEffect(() => {
    // Start typing after 1.2s delay
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= tagline.length) {
          setDisplayedText(tagline.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 80); // Type each character every 80ms

      return () => clearInterval(typingInterval);
    }, 1200);

    return () => clearTimeout(startDelay);
  }, [tagline]);
  return (
    <section
      id={id}
      className={`${styles.preDawnHero} ${className}`}
      data-chapter="pre-dawn"
      aria-labelledby="pre-dawn-heading"
    >
      {/* Background Image with Parallax */}
      <div className={styles.backgroundContainer}>
        <div
          ref={backgroundRef}
          className={styles.backgroundImage}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src={backgroundImage}
            alt="Mount Kilimanjaro at pre-dawn with silhouette"
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.image}
          />
        </div>
        
        {/* Gradient Sky Overlay - Mount Kilimanjaro silhouette effect */}
        <div className={styles.gradientOverlay} />
        
        {/* Dark Pre-Dawn Overlay */}
        <div className={styles.preDawnOverlay} />
        
        {/* Star Field Particle Animation */}
        <AtmosphericParticles type="stars" density={40} speed={1} />
      </div>

      {/* Logo */}
      <motion.div
        className={styles.logoContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Image
          src={logo}
          alt="Amboseli Safari Club"
          width={280}
          height={100}
          className={styles.logo}
          priority
        />
      </motion.div>

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

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
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

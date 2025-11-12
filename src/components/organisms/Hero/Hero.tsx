'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  backgroundImage: string;
  backgroundImageAlt: string;
  mobileBackgroundImage?: string;
  logo?: string;
  logoAlt?: string;
  height?: 'full' | 'large' | 'medium';
  overlay?: 'light' | 'medium' | 'dark';
  children?: ReactNode;
  priority?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundImageAlt,
  mobileBackgroundImage,
  logo = '/images/hero/logos/mainLOGOAmboseli.svg',
  logoAlt = 'Amboseli Safari Club',
  height = 'full',
  overlay = 'medium',
  children,
  priority = true,
}: HeroProps) {
  return (
    <section className={`${styles.hero} ${styles[height]}`}>
      {/* Background Image with Ken Burns Effect */}
      <div className={styles.imageContainer}>
        {/* Desktop Background Image */}
        <div className={`${styles.kenBurns} ${styles.desktopImage}`}>
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className={styles.backgroundImage}
            priority={priority}
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* Mobile Background Image */}
        {mobileBackgroundImage && (
          <div className={`${styles.kenBurns} ${styles.mobileImage}`}>
            <Image
              src={mobileBackgroundImage}
              alt={backgroundImageAlt}
              fill
              className={styles.backgroundImage}
              priority={priority}
              quality={90}
              sizes="100vw"
            />
          </div>
        )}

        <div className={`${styles.overlay} ${styles[`overlay-${overlay}`]}`} />
      </div>

      {/* Logo */}
      {logo && (
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Image
            src={logo}
            alt={logoAlt}
            width={280}
            height={100}
            className={styles.logo}
            priority
          />
        </motion.div>
      )}

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {subtitle && (
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {description}
            </motion.p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {primaryCTA && (
                <a
                  href={primaryCTA.href}
                  className={styles.ctaPrimary}
                  onClick={primaryCTA.onClick}
                >
                  {primaryCTA.text}
                </a>
              )}
              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  className={styles.ctaSecondary}
                  onClick={secondaryCTA.onClick}
                >
                  {secondaryCTA.text}
                </a>
              )}
            </motion.div>
          )}

          {children}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className={styles.scrollIcon}>
          <span className={styles.scrollArrow} />
        </div>
      </motion.div>
    </section>
  );
}

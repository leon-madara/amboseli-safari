'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { CHAPTER_IMAGES } from '@/data/images';
import styles from './CareersChapter.module.css';

export interface Department {
  name: string;
  icon: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface CareersChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  heading?: string;
  subtitle?: string;
  message?: string;
  departments?: Department[];
  values?: Value[];
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
}

export default function CareersChapter({
  id,
  className = '',
  backgroundImage = CHAPTER_IMAGES.location.twilightSky,
  heading = 'Join Amboseli Safari Club',
  subtitle = 'Turn Your Passion for Hospitality Into a Career',
  message = "Be part of a team that is proud and committed to excellence. We're hiring for our December 2025 opening across all departments.",
  departments = [
    { name: 'Guest Services & Reception', icon: '🎯' },
    { name: 'Food & Beverage', icon: '🍽️' },
    { name: 'Housekeeping & Facilities', icon: '🏨' },
    { name: 'Safari Guides & Naturalists', icon: '🦁' },
    { name: 'Spa & Wellness', icon: '💆' },
    { name: 'Sales & Marketing', icon: '📊' },
  ],
  values = [
    {
      title: 'Excellence in Service',
      description: 'We strive to exceed guest expectations',
      icon: '⭐',
    },
    {
      title: 'Respect for Nature',
      description: 'Conservation is at our core',
      icon: '🌿',
    },
    {
      title: 'Team Collaboration',
      description: 'We succeed together',
      icon: '🤝',
    },
    {
      title: 'Continuous Learning',
      description: 'We invest in your growth',
      icon: '📚',
    },
  ],
  primaryCTA = {
    text: 'Apply Now',
    href: '/contact?subject=Career%20Application',
    variant: 'primary',
  },
  secondaryCTA = {
    text: 'View Open Positions',
    href: '/contact?subject=Career%20Inquiry',
    variant: 'secondary',
  },
}: CareersChapterProps) {
  // Parallax effect for background (0.3x speed)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useParallax(backgroundRef, { speed: 0.3, direction: 'down' });

  // Track chapter progress
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('careers');

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.careersChapter} ${className}`}
      data-chapter="careers"
      aria-labelledby="careers-heading"
    >
      {/* Background with twilight atmosphere */}
      <div className={styles.backgroundContainer}>
        <div
          ref={backgroundRef}
          className={styles.backgroundImageWrapper}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src={backgroundImage}
            alt="Twilight over Amboseli"
            fill
            quality={85}
            sizes="100vw"
            className={styles.backgroundImage}
            loading="lazy"
          />
        </div>

        {/* Twilight gradient overlay */}
        <div className={styles.gradientOverlay} />
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
          <h2 id="careers-heading" className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.message}>{message}</p>
        </motion.div>

        {/* Departments Grid */}
        <div className={styles.departmentsSection}>
          <motion.h3
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're Hiring Across All Departments
          </motion.h3>

          <div className={styles.departmentsGrid}>
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                className={styles.departmentCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <span className={styles.departmentIcon}>{dept.icon}</span>
                <h4 className={styles.departmentName}>{dept.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className={styles.valuesSection}>
          <motion.h3
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our Values
          </motion.h3>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={styles.valueCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaHeading}>Ready to Join Our Team?</h3>
            <p className={styles.ctaText}>
              Submit your CV and cover letter to be considered for our December 2025 opening
            </p>
          </div>

          <div className={styles.ctaButtons}>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

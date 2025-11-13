'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { CHAPTER_IMAGES } from '@/data/images';
import styles from './BushBreakfastChapter.module.css';

export interface BushBreakfastChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  tableImage?: string;
  menuItems?: string[];
  ctaButton?: CTAButton;
}

export default function BushBreakfastChapter({
  id,
  className = '',
  backgroundImage = CHAPTER_IMAGES.bushBreakfast.dining,
  tableImage = CHAPTER_IMAGES.bushBreakfast.elegantDining,
  menuItems = [
    'Freshly Baked Pastries & Breads',
    'Tropical Fruit Platter',
    'Farm-Fresh Eggs Your Way',
    'Kenyan Coffee & Premium Teas',
    'Homemade Preserves & Honey',
  ],
  ctaButton = {
    text: 'Discover Our Cuisine',
    href: '/dining',
    variant: 'primary',
  },
}: BushBreakfastChapterProps) {
  // Parallax effect for table image (0.6x speed)
  const tableRef = useRef<HTMLDivElement>(null);
  const tableParallaxOffset = useParallax(tableRef, { speed: 0.6, direction: 'down' });

  // Track chapter progress for animations
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('bush-breakfast');

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.bushBreakfastChapter} ${className}`}
      data-chapter="bush-breakfast"
      aria-labelledby="bush-breakfast-heading"
    >
      {/* Background with warm morning light and acacia tree silhouette */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage}>
          <Image
            src={backgroundImage}
            alt="Acacia tree silhouette at sunrise"
            fill
            quality={85}
            sizes="100vw"
            className={styles.image}
          />
        </div>
        
        {/* Warm morning light gradient overlay */}
        <div className={styles.gradientOverlay} />
      </div>

      {/* Steam Particles Container */}
      <div className={styles.steamContainer}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.steamParticle}
            style={{
              left: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Table Setup with Parallax */}
      <div
        ref={tableRef}
        className={styles.tableContainer}
        style={{ transform: `translateY(${tableParallaxOffset}px)` }}
      >
        <Image
          src={tableImage}
          alt="Bush breakfast table setup"
          width={800}
          height={600}
          className={styles.tableImage}
          loading="lazy"
        />
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
          <h2 id="bush-breakfast-heading" className={styles.heading}>
            Bush Breakfast
          </h2>
          <p className={styles.tagline}>Where Luxury Meets Wilderness</p>
        </motion.div>

        {/* Menu Items with Sequential Fade-in */}
        <div className={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className={styles.menuItem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className={styles.menuBullet} />
              <span className={styles.menuText}>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button - slides in from bottom */}
        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={ctaButton.href}
            className={`${styles.cta} ${styles[`cta${ctaButton.variant.charAt(0).toUpperCase() + ctaButton.variant.slice(1)}`]}`}
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

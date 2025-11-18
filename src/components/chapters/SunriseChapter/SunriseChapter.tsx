'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { BaseChapterProps } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import { CHAPTER_IMAGES } from '@/data/images';
import styles from './SunriseChapter.module.css';

export interface SunriseChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  jeepImage?: string;
  message?: string;
}

export default function SunriseChapter({
  id,
  className = '',
  backgroundImage = CHAPTER_IMAGES.sunrise.sky,
  jeepImage = CHAPTER_IMAGES.sunrise.jeep,
  message = 'Your adventure starts here',
}: SunriseChapterProps) {
  // Parallax effect for jeep (0.5x speed)
  const jeepRef = useRef<HTMLDivElement>(null);
  const jeepParallaxOffset = useParallax(jeepRef, { speed: 0.5, direction: 'down' });

  // Track chapter progress for animations
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('sunrise');

  // Calculate sun position based on scroll progress (0-100%)
  const sunYPosition = 100 - progress; // Starts at bottom (100%), rises to top (0%)
  const sunOpacity = Math.min(progress / 50, 1); // Fades in during first 50% of scroll

  // Calculate color temperature warming (increases saturation and warmth)
  const colorTemperature = progress / 100; // 0 to 1

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.sunriseChapter} ${className}`}
      data-chapter="sunrise"
      aria-labelledby="sunrise-heading"
    >
      {/* Background with warm golden gradient */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage}>
          <OptimizedImage
            src={backgroundImage}
            alt="Sunrise over the African savanna"
            fill
            imageType="chapter-background"
            className={styles.image}
          />
        </div>
        
        {/* Warm golden gradient overlay */}
        <div 
          className={styles.gradientOverlay}
          style={{
            opacity: 0.6 + (colorTemperature * 0.2), // Increases from 0.6 to 0.8
          }}
        />
      </div>

      {/* Rising Sun Animation */}
      <div 
        className={styles.sunContainer}
        style={{
          transform: `translateY(${sunYPosition}%)`,
          opacity: sunOpacity,
        }}
      >
        <div className={styles.sun} />
        <div className={styles.sunGlow} />
      </div>

      {/* Safari Jeep with Parallax */}
      <div
        ref={jeepRef}
        className={styles.jeepContainer}
        style={{ transform: `translateY(${jeepParallaxOffset}px)` }}
      >
        <OptimizedImage
          src={jeepImage}
          alt="Safari jeep ready for adventure"
          width={600}
          height={400}
          imageType="content"
          className={styles.jeepImage}
        />
      </div>

      {/* Message Content */}
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 id="sunrise-heading" className={styles.message}>
          {message}
        </h2>
      </motion.div>
    </section>
  );
}

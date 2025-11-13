'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import styles from './DiningChapter.module.css';

export interface DishPreview {
  name: string;
  image: string;
  description: string;
}

export interface WinePairing {
  wine: string;
  dish: string;
}

export interface DiningChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  dishes?: DishPreview[];
  winePairings?: WinePairing[];
  ctaButton?: CTAButton;
}

export default function DiningChapter({
  id,
  className = '',
  backgroundImage = '/images/chapters/sundowner-deck.jpg',
  dishes = [
    {
      name: 'Grilled Serengeti Beef',
      image: '/images/chapters/grilled-beef.jpg',
      description: 'Prime cuts with wild herb butter',
    },
    {
      name: 'Lake Victoria Tilapia',
      image: '/images/chapters/tilapia.jpg',
      description: 'Pan-seared with lemon & thyme',
    },
    {
      name: 'Savanna Sunset Platter',
      image: '/images/chapters/sunset-platter.jpg',
      description: 'Chef\'s selection of local delicacies',
    },
  ],
  winePairings = [
    { wine: 'Sauvignon Blanc', dish: 'Lake Victoria Tilapia' },
    { wine: 'Cabernet Sauvignon', dish: 'Grilled Serengeti Beef' },
    { wine: 'Rosé', dish: 'Savanna Sunset Platter' },
  ],
  ctaButton = {
    text: 'See Full Menu',
    href: '/dining',
    variant: 'primary',
  },
}: DiningChapterProps) {
  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  // Parallax effect for background (0.5x speed)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const backgroundParallaxOffset = useParallax(backgroundRef, { speed: 0.5, direction: 'down' });

  // Track chapter progress
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('dining');

  const handlePrevDish = () => {
    setCurrentDishIndex((prev) => (prev === 0 ? dishes.length - 1 : prev - 1));
  };

  const handleNextDish = () => {
    setCurrentDishIndex((prev) => (prev === dishes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.diningChapter} ${className}`}
      data-chapter="dining"
      aria-labelledby="dining-heading"
    >
      {/* Background with afternoon golden light and parallax */}
      <div className={styles.backgroundContainer}>
        <div
          ref={backgroundRef}
          className={styles.backgroundImageWrapper}
          style={{ transform: `translateY(${backgroundParallaxOffset}px)` }}
        >
          <Image
            src={backgroundImage}
            alt="Sundowner deck at golden hour"
            fill
            quality={85}
            sizes="100vw"
            className={styles.backgroundImage}
          />
        </div>

        {/* Afternoon golden light gradient overlay */}
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
          <h2 id="dining-heading" className={styles.heading}>
            Culinary Excellence
          </h2>
          <p className={styles.subtitle}>
            Where flavors meet the African sunset
          </p>
        </motion.div>

        {/* Signature Dishes Carousel */}
        <div className={styles.dishesSection}>
          <motion.div
            className={styles.carouselContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.carousel}>
              <button
                onClick={handlePrevDish}
                className={styles.carouselButton}
                aria-label="Previous dish"
              >
                ‹
              </button>

              <div className={styles.dishCard}>
                <div className={styles.dishImageContainer}>
                  <Image
                    src={dishes[currentDishIndex].image}
                    alt={dishes[currentDishIndex].name}
                    fill
                    sizes="(max-width: 768px) 90vw, 600px"
                    className={styles.dishImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.dishInfo}>
                  <h3 className={styles.dishName}>{dishes[currentDishIndex].name}</h3>
                  <p className={styles.dishDescription}>
                    {dishes[currentDishIndex].description}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextDish}
                className={styles.carouselButton}
                aria-label="Next dish"
              >
                ›
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {dishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDishIndex(index)}
                  className={`${styles.indicator} ${
                    index === currentDishIndex ? styles.indicatorActive : ''
                  }`}
                  aria-label={`Go to dish ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wine Pairings with Sequential Fade-in */}
        <div className={styles.winePairingsSection}>
          <motion.h3
            className={styles.winePairingsHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Perfect Pairings
          </motion.h3>

          <div className={styles.winePairingsGrid}>
            {winePairings.map((pairing, index) => (
              <motion.div
                key={index}
                className={styles.pairingCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              >
                <div className={styles.pairingIcon}>🍷</div>
                <div className={styles.pairingInfo}>
                  <p className={styles.wineName}>{pairing.wine}</p>
                  <p className={styles.pairingDish}>with {pairing.dish}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA with Reservation Time Slots Preview */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.timeSlotsPreview}>
            <p className={styles.timeSlotsLabel}>Available dining times:</p>
            <div className={styles.timeSlots}>
              <span className={styles.timeSlot}>7:00 AM</span>
              <span className={styles.timeSlot}>12:30 PM</span>
              <span className={styles.timeSlot}>7:30 PM</span>
            </div>
          </div>

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

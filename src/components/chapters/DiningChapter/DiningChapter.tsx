'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { ParallaxContainer, ParallaxLayer } from '@/components/animations/ParallaxContainer';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import { CHAPTER_IMAGES, DINING_DISH_IMAGES } from '@/data/images';
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
  backgroundImage = CHAPTER_IMAGES.dining.sundowner,
  dishes = [
    {
      name: 'Grilled Serengeti Beef',
      image: DINING_DISH_IMAGES.grilledBeef,
      description: 'Prime cuts with wild herb butter - Available in family portions',
    },
    {
      name: 'Lake Victoria Tilapia',
      image: DINING_DISH_IMAGES.tilapia,
      description: 'Pan-seared with lemon & thyme - Fresh daily catch',
    },
    {
      name: 'Kenyan Buffet Spread',
      image: DINING_DISH_IMAGES.sunsetPlatter,
      description: 'Traditional dishes perfect for groups and tour parties',
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
    <ParallaxContainer className={styles.parallaxWrapper}>
      <section
        id={id}
        ref={chapterRef}
        className={`${styles.diningChapter} ${className}`}
        data-chapter="dining"
        aria-labelledby="dining-heading"
      >
        {/* Background with afternoon golden light and parallax */}
        <div className={styles.backgroundContainer}>
          <ParallaxLayer speed={0.4} className={styles.backgroundLayer} zIndex={1}>
            <div className={styles.backgroundImageWrapper}>
              <OptimizedImage
                src={backgroundImage}
                alt="Sundowner deck at golden hour"
                fill
                imageType="chapter-background"
                className={styles.backgroundImage}
              />
            </div>
          </ParallaxLayer>

          {/* Afternoon golden light gradient overlay */}
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
          <h2 id="dining-heading" className={styles.heading}>
            Group-Friendly Dining
          </h2>
          <p className={styles.subtitle}>
            Delicious meals for families and groups of all sizes
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
                  <OptimizedImage
                    src={dishes[currentDishIndex].image}
                    alt={dishes[currentDishIndex].name}
                    fill
                    imageType="content"
                    sizes="(max-width: 768px) 90vw, 600px"
                    className={styles.dishImage}
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

        {/* Group Capacity Information */}
        <div className={styles.groupInfo}>
          <motion.h3
            className={styles.groupHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Perfect for Groups
          </motion.h3>
          
          <div className={styles.groupFeatures}>
            <motion.div
              className={styles.groupFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={styles.groupIcon}>👥</span>
              <p>Accommodates tour groups up to 40 people</p>
            </motion.div>
            
            <motion.div
              className={styles.groupFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className={styles.groupIcon}>🍽️</span>
              <p>Buffet and family-style dining options</p>
            </motion.div>
            
            <motion.div
              className={styles.groupFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className={styles.groupIcon}>👶</span>
              <p>Kids menu and dietary accommodations</p>
            </motion.div>
            
            <motion.div
              className={styles.groupFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className={styles.groupIcon}>🥪</span>
              <p>Packed lunches available for safari days</p>
            </motion.div>
            
            <motion.div
              className={styles.groupFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className={styles.groupIcon}>🎉</span>
              <p>Private dining available for special events</p>
            </motion.div>
            
            <motion.div
              className={styles.groupFeature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className={styles.groupIcon}>⏰</span>
              <p>Flexible meal times to fit your family schedule</p>
            </motion.div>
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
      </ParallaxLayer>
      </section>
    </ParallaxContainer>
  );
}

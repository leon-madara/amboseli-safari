'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import WildlifeCard from '@/components/molecules/WildlifeCard/WildlifeCard';
import styles from './MorningDriveChapter.module.css';

export interface WildlifeCardData {
  id: string;
  name: string;
  image: string;
  funFact: string;
  scientificName: string;
}

export interface MorningDriveChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  wildlifeCards?: WildlifeCardData[];
  ctaButton?: CTAButton;
}

export default function MorningDriveChapter({
  id,
  className = '',
  backgroundImage = '/images/hero/Single Leading Bull Silhouette.jpg',
  wildlifeCards = [
    {
      id: 'elephant',
      name: 'African Elephant',
      image: '/images/hero/Single Leading Bull Silhouette.jpg',
      funFact: 'Elephants can communicate using infrasound, which travels through the ground and can be detected by other elephants up to 10 miles away.',
      scientificName: 'Loxodonta africana',
    },
    {
      id: 'lion',
      name: 'African Lion',
      image: '/images/hero/Single Leading Bull Silhouette.jpg',
      funFact: 'A lion\'s roar can be heard from up to 5 miles away, making it one of the loudest calls in the animal kingdom.',
      scientificName: 'Panthera leo',
    },
    {
      id: 'giraffe',
      name: 'Masai Giraffe',
      image: '/images/hero/Single Leading Bull Silhouette.jpg',
      funFact: 'Despite their long necks, giraffes have the same number of neck vertebrae as humans - just seven!',
      scientificName: 'Giraffa tippelskirchi',
    },
    {
      id: 'zebra',
      name: 'Plains Zebra',
      image: '/images/hero/Single Leading Bull Silhouette.jpg',
      funFact: 'Each zebra has a unique stripe pattern, like a fingerprint, which helps them recognize each other.',
      scientificName: 'Equus quagga',
    },
  ],
  ctaButton = {
    text: 'Explore Wildlife Experiences',
    href: '/experiences',
    variant: 'primary',
  },
}: MorningDriveChapterProps) {
  // Parallax effect for grassland background (0.3x speed)
  const backgroundRef = useRef<HTMLDivElement>(null);
  const backgroundParallaxOffset = useParallax(backgroundRef, { speed: 0.3, direction: 'down' });

  // Track chapter progress for animations
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('morning-drive');

  // Distance counter animation (0-15km)
  const [distance, setDistance] = useState(0);
  const targetDistance = Math.floor((progress / 100) * 15);

  useEffect(() => {
    // Animate distance counter
    const interval = setInterval(() => {
      setDistance((prev) => {
        if (prev < targetDistance) {
          return prev + 1;
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [targetDistance]);

  // Show CTA when 80% scrolled through chapter
  const showCTA = progress >= 80;

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.morningDriveChapter} ${className}`}
      data-chapter="morning-drive"
      aria-labelledby="morning-drive-heading"
    >
      {/* Background with bright morning light gradient */}
      <div className={styles.backgroundContainer}>
        <div
          ref={backgroundRef}
          className={styles.backgroundImage}
          style={{ transform: `translateY(${backgroundParallaxOffset}px)` }}
        >
          <Image
            src={backgroundImage}
            alt="Morning grassland safari landscape"
            fill
            quality={85}
            sizes="100vw"
            className={styles.image}
          />
        </div>
        
        {/* Bright morning light gradient overlay */}
        <div className={styles.gradientOverlay} />
      </div>

      {/* Distance Counter */}
      <motion.div
        className={styles.distanceCounter}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.counterValue}>{distance}</div>
        <div className={styles.counterLabel}>km traveled</div>
      </motion.div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <motion.h2
          id="morning-drive-heading"
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Wildlife Encounters
        </motion.h2>

        {/* Wildlife Cards in Staggered Layout */}
        <div className={styles.wildlifeGrid}>
          {wildlifeCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <WildlifeCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* CTA Button - appears at 80% scroll progress */}
        {showCTA && (
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
        )}
      </div>
    </section>
  );
}

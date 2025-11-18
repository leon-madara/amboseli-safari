'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { BaseChapterProps } from '@/types/chapter';
import { WILDLIFE_ANIMALS, WildlifeAnimal } from '@/data/wildlife';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import styles from './WildlifeEncountersChapter.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WildlifeEncountersChapterProps extends BaseChapterProps {
  animals?: WildlifeAnimal[];
}

export default function WildlifeEncountersChapter({
  id,
  className = '',
  animals = WILDLIFE_ANIMALS,
}: WildlifeEncountersChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !introRef.current || !galleryContainerRef.current || !cardsRef.current) return;

    const section = sectionRef.current;
    const intro = introRef.current;
    const galleryContainer = galleryContainerRef.current;
    const cards = cardsRef.current;

    // Calculate horizontal scroll distance
    const getScrollDistance = () => {
      const cardsWidth = cards.scrollWidth;
      const viewportWidth = window.innerWidth;
      return cardsWidth - viewportWidth;
    };

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.5}`, // 2.5 viewport heights of scrolling
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animation sequence:
    // 1. Show intro (0-20%)
    // 2. Fade out intro (20-30%)
    // 3. Fade in gallery (20-30%)
    // 4. Scroll gallery horizontally (30-100%)

    tl.to(intro, {
      opacity: 1,
      duration: 0.2,
    })
    .to(intro, {
      opacity: 0,
      y: -50,
      duration: 0.3,
    }, 0.5) // Start fading out intro at 50% of timeline
    .fromTo(
      galleryContainer,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3 },
      0.5 // Fade in gallery at same time
    )
    .to(cards, {
      x: () => -getScrollDistance(),
      ease: 'none',
      duration: 0.7, // Remaining 70% for horizontal scroll
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [animals]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.wildlifeEncounters} ${className}`}
      data-chapter="wildlife-encounters"
      aria-labelledby="wildlife-encounters-heading"
    >
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientOverlay} />
      </div>

      {/* Introduction - Fades out as gallery appears */}
      <div ref={introRef} className={styles.intro}>
        <motion.h2
          id="wildlife-encounters-heading"
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Wildlife Encounters
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Meet the Majestic Five of Amboseli
        </motion.p>
      </div>

      {/* Horizontal Scrolling Gallery - Fades in after intro */}
      <div ref={galleryContainerRef} className={styles.galleryContainer}>
        <div ref={cardsRef} className={styles.cardsWrapper}>
          {animals.map((animal, index) => (
            <div key={animal.id} className={styles.card}>
              <div className={styles.cardImage}>
                <OptimizedImage
                  src={animal.image}
                  alt={animal.name}
                  fill
                  imageType="content"
                  className={styles.image}
                />

                {/* Conservation Status Badge */}
                <div className={styles.statusBadge} data-status={animal.conservationStatus.toLowerCase().replace(' ', '-')}>
                  {animal.conservationStatus}
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.animalName}>{animal.name}</h3>
                <p className={styles.scientificName}>{animal.scientificName}</p>

                <p className={styles.description}>{animal.description}</p>

                <div className={styles.funFact}>
                  <div className={styles.funFactLabel}>Did you know?</div>
                  <p className={styles.funFactText}>{animal.funFact}</p>
                </div>

                <div className={styles.bestTime}>
                  <span className={styles.bestTimeLabel}>Best time to see:</span>
                  <span className={styles.bestTimeValue}>{animal.bestTimeToSee}</span>
                </div>

                <a href={`/wildlife/${animal.id}`} className={styles.learnMore}>
                  Learn to Encounter
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className={styles.progressIndicator}>
        {animals.map((animal, index) => (
          <div
            key={animal.id}
            className={styles.progressDot}
            data-index={index}
            aria-label={`${animal.name} - ${index + 1} of ${animals.length}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}

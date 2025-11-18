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

  // Individual card refs for precise GSAP control
  const card1Ref = useRef<HTMLDivElement>(null); // Elephant
  const card2Ref = useRef<HTMLDivElement>(null); // Lion
  const card3Ref = useRef<HTMLDivElement>(null); // Giraffe (CENTER)
  const card4Ref = useRef<HTMLDivElement>(null); // Zebra
  const card5Ref = useRef<HTMLDivElement>(null); // Cheetah

  useEffect(() => {
    if (!sectionRef.current || !introRef.current || !galleryContainerRef.current) return;
    if (!card1Ref.current || !card2Ref.current || !card3Ref.current || !card4Ref.current || !card5Ref.current) return;

    const section = sectionRef.current;
    const intro = introRef.current;
    const galleryContainer = galleryContainerRef.current;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Pin the entire section for 160vh
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=160vh', // Matches chapter config
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // ===== PHASE 1: INTRO FADE OUT (0-15vh) =====
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'top+=15vh',
          scrub: 1,
        },
      })
      .to(intro, {
        opacity: 0,
        y: -50,
        ease: 'power2.in',
      })
      .fromTo(
        galleryContainer,
        { opacity: 0 },
        { opacity: 1 },
        '<' // Simultaneous with intro fade
      );

      // Set initial state for all cards
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current], {
        y: '100vh',
        x: '0%',
        rotation: 0,
        opacity: 0,
        scale: 1,
      });

      // ===== CARD 1 - ELEPHANT =====
      // Phase 1: Enter from bottom-center (15-35vh)
      gsap.fromTo(
        card1Ref.current,
        { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
        {
          y: '30vh',
          x: '0%',
          rotation: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top+=15vh',
            end: 'top+=35vh',
            scrub: 1,
          },
        }
      );

      // Phase 2: Slide left when Lion enters (35-45vh)
      gsap.to(card1Ref.current, {
        x: '-15%',
        rotation: -3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top+=35vh',
          end: 'top+=45vh',
          scrub: 1,
        },
      });

      // Phase 3: Slide further left when Giraffe enters (55-65vh)
      gsap.to(card1Ref.current, {
        x: '-25%',
        rotation: -6,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top+=55vh',
          end: 'top+=65vh',
          scrub: 1,
        },
      });

      // ===== CARD 2 - LION =====
      // Phase 1: Enter from bottom-center (35-55vh)
      gsap.fromTo(
        card2Ref.current,
        { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
        {
          y: '30vh',
          x: '0%',
          rotation: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top+=35vh',
            end: 'top+=55vh',
            scrub: 1,
          },
        }
      );

      // Phase 2: Slide left when Giraffe enters (55-65vh)
      gsap.to(card2Ref.current, {
        x: '-15%',
        rotation: -3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top+=55vh',
          end: 'top+=65vh',
          scrub: 1,
        },
      });

      // ===== CARD 3 - GIRAFFE (CENTER - STAYS PUT) =====
      // Enter from bottom-center and STAY at 0° rotation (55-75vh)
      gsap.fromTo(
        card3Ref.current,
        { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
        {
          y: '30vh',
          x: '0%',
          rotation: 0, // Stays centered at 0° - FOCAL POINT
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top+=55vh',
            end: 'top+=75vh',
            scrub: 1,
          },
        }
      );

      // ===== CARD 4 - ZEBRA (RIGHT SIDE) =====
      // Enter from bottom-center, slide right (75-95vh)
      gsap.fromTo(
        card4Ref.current,
        { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
        {
          y: '30vh',
          x: '+15%',
          rotation: +3,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top+=75vh',
            end: 'top+=95vh',
            scrub: 1,
          },
        }
      );

      // ===== CARD 5 - CHEETAH (FAR RIGHT) =====
      // Enter from bottom-center, slide far right (95-115vh)
      gsap.fromTo(
        card5Ref.current,
        { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
        {
          y: '30vh',
          x: '+25%',
          rotation: +6,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top+=95vh',
            end: 'top+=115vh',
            scrub: 1,
          },
        }
      );

      // ===== PHASE 2: HOLD FAN ARRANGEMENT (115-130vh) =====
      // No animation - cards stay in final fan position for user to admire

      // ===== PHASE 3: TRANSITION TO ACCOMMODATIONS (130-160vh) =====
      const allCards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current];

      gsap.to(allCards, {
        scale: 0.8,
        y: '-10vh',
        opacity: 0.4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top+=130vh',
          end: 'top+=160vh',
          scrub: 1,
        },
      });
    });

    return () => {
      ctx.revert(); // Clean up all GSAP animations and ScrollTriggers
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

      {/* Introduction - Fades out as cards appear */}
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

      {/* Card Stacking Gallery */}
      <div ref={galleryContainerRef} className={styles.galleryContainer}>
        {/* CARD 1 - ELEPHANT (Leftmost, z-index: 1) */}
        <div ref={card1Ref} className={styles.card} style={{ zIndex: 1 }}>
          <div className={styles.cardImage}>
            <OptimizedImage
              src={animals[0].image}
              alt={animals[0].name}
              fill
              imageType="content"
              className={styles.image}
            />
            <div className={styles.statusBadge} data-status={animals[0].conservationStatus.toLowerCase().replace(' ', '-')}>
              {animals[0].conservationStatus}
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.animalName}>{animals[0].name}</h3>
            <p className={styles.scientificName}>{animals[0].scientificName}</p>
            <p className={styles.description}>{animals[0].description}</p>
            <div className={styles.funFact}>
              <div className={styles.funFactLabel}>Did you know?</div>
              <p className={styles.funFactText}>{animals[0].funFact}</p>
            </div>
            <div className={styles.bestTime}>
              <span className={styles.bestTimeLabel}>Best time to see:</span>
              <span className={styles.bestTimeValue}>{animals[0].bestTimeToSee}</span>
            </div>
            <a href={`/wildlife/${animals[0].id}`} className={styles.learnMore}>
              Learn to Encounter
            </a>
          </div>
        </div>

        {/* CARD 2 - LION (Left, z-index: 2) */}
        <div ref={card2Ref} className={styles.card} style={{ zIndex: 2 }}>
          <div className={styles.cardImage}>
            <OptimizedImage
              src={animals[1].image}
              alt={animals[1].name}
              fill
              imageType="content"
              className={styles.image}
            />
            <div className={styles.statusBadge} data-status={animals[1].conservationStatus.toLowerCase().replace(' ', '-')}>
              {animals[1].conservationStatus}
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.animalName}>{animals[1].name}</h3>
            <p className={styles.scientificName}>{animals[1].scientificName}</p>
            <p className={styles.description}>{animals[1].description}</p>
            <div className={styles.funFact}>
              <div className={styles.funFactLabel}>Did you know?</div>
              <p className={styles.funFactText}>{animals[1].funFact}</p>
            </div>
            <div className={styles.bestTime}>
              <span className={styles.bestTimeLabel}>Best time to see:</span>
              <span className={styles.bestTimeValue}>{animals[1].bestTimeToSee}</span>
            </div>
            <a href={`/wildlife/${animals[1].id}`} className={styles.learnMore}>
              Learn to Encounter
            </a>
          </div>
        </div>

        {/* CARD 3 - GIRAFFE (CENTER - FOCAL POINT, z-index: 3) */}
        <div ref={card3Ref} className={styles.card} style={{ zIndex: 3 }}>
          <div className={styles.cardImage}>
            <OptimizedImage
              src={animals[2].image}
              alt={animals[2].name}
              fill
              imageType="content"
              className={styles.image}
            />
            <div className={styles.statusBadge} data-status={animals[2].conservationStatus.toLowerCase().replace(' ', '-')}>
              {animals[2].conservationStatus}
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.animalName}>{animals[2].name}</h3>
            <p className={styles.scientificName}>{animals[2].scientificName}</p>
            <p className={styles.description}>{animals[2].description}</p>
            <div className={styles.funFact}>
              <div className={styles.funFactLabel}>Did you know?</div>
              <p className={styles.funFactText}>{animals[2].funFact}</p>
            </div>
            <div className={styles.bestTime}>
              <span className={styles.bestTimeLabel}>Best time to see:</span>
              <span className={styles.bestTimeValue}>{animals[2].bestTimeToSee}</span>
            </div>
            <a href={`/wildlife/${animals[2].id}`} className={styles.learnMore}>
              Learn to Encounter
            </a>
          </div>
        </div>

        {/* CARD 4 - ZEBRA (Right, z-index: 4) */}
        <div ref={card4Ref} className={styles.card} style={{ zIndex: 4 }}>
          <div className={styles.cardImage}>
            <OptimizedImage
              src={animals[3].image}
              alt={animals[3].name}
              fill
              imageType="content"
              className={styles.image}
            />
            <div className={styles.statusBadge} data-status={animals[3].conservationStatus.toLowerCase().replace(' ', '-')}>
              {animals[3].conservationStatus}
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.animalName}>{animals[3].name}</h3>
            <p className={styles.scientificName}>{animals[3].scientificName}</p>
            <p className={styles.description}>{animals[3].description}</p>
            <div className={styles.funFact}>
              <div className={styles.funFactLabel}>Did you know?</div>
              <p className={styles.funFactText}>{animals[3].funFact}</p>
            </div>
            <div className={styles.bestTime}>
              <span className={styles.bestTimeLabel}>Best time to see:</span>
              <span className={styles.bestTimeValue}>{animals[3].bestTimeToSee}</span>
            </div>
            <a href={`/wildlife/${animals[3].id}`} className={styles.learnMore}>
              Learn to Encounter
            </a>
          </div>
        </div>

        {/* CARD 5 - CHEETAH (Rightmost, z-index: 5 - NEWEST ON TOP) */}
        <div ref={card5Ref} className={styles.card} style={{ zIndex: 5 }}>
          <div className={styles.cardImage}>
            <OptimizedImage
              src={animals[4].image}
              alt={animals[4].name}
              fill
              imageType="content"
              className={styles.image}
            />
            <div className={styles.statusBadge} data-status={animals[4].conservationStatus.toLowerCase().replace(' ', '-')}>
              {animals[4].conservationStatus}
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.animalName}>{animals[4].name}</h3>
            <p className={styles.scientificName}>{animals[4].scientificName}</p>
            <p className={styles.description}>{animals[4].description}</p>
            <div className={styles.funFact}>
              <div className={styles.funFactLabel}>Did you know?</div>
              <p className={styles.funFactText}>{animals[4].funFact}</p>
            </div>
            <div className={styles.bestTime}>
              <span className={styles.bestTimeLabel}>Best time to see:</span>
              <span className={styles.bestTimeValue}>{animals[4].bestTimeToSee}</span>
            </div>
            <a href={`/wildlife/${animals[4].id}`} className={styles.learnMore}>
              Learn to Encounter
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll to reveal</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { BaseChapterProps } from '@/types/chapter';
import { WILDLIFE_ANIMALS, WildlifeAnimal } from '@/data/wildlife';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WildlifeEncountersChapter.module.css';

gsap.registerPlugin(ScrollTrigger);

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
  const fanContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !introRef.current || !fanContainerRef.current) return;
    if (cardRefs.current.some(card => !card)) return;

    const section = sectionRef.current;
    const intro = introRef.current;
    const fanContainer = fanContainerRef.current;
    const cards = cardRefs.current as HTMLDivElement[];

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250vh',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: 1,
      },
    });

    // Animation sequence (250vh total)
    // Timeline breakdown:
    // 0-10vh (0-4%): Intro fade in
    // 10-100vh (4-40%): Hold intro fully visible (full viewport)
    // 100-110vh (40-44%): Intro fade out, fan container fade in
    // 110-250vh (44-100%): Staggered fan animation

    tl
      // Phase 1: Intro Fade In (0-4% = 0-10vh)
      .to(intro, {
        opacity: 1,
        duration: 0.04,
        ease: 'power2.out'
      }, 0)

      // Phase 2: Hold Intro Fully Visible (4-40% = 10vh-100vh) - Full viewport hold
      .to({}, { duration: 0.36 }, 0.04)

      // Phase 3: Transition (40-44% = 100vh-110vh)
      .to(intro, {
        opacity: 0,
        y: -50,
        duration: 0.04,
        ease: 'power2.in'
      }, 0.4)
      .to(fanContainer, {
        opacity: 1,
        duration: 0.04,
        ease: 'power2.out'
      }, 0.4)

      // Phase 4: Staggered Fan Animation (44-100% = 110vh-250vh)

      // Card 1 (Elephant) - Appears at center (T+0.44)
      .to(cards[0], {
        opacity: 1,
        y: '-50%',
        rotation: 0,
        x: '-50%',
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.44)

      // Hold (0.03 duration)
      .to({}, { duration: 0.03 }, 0.52)

      // Card 2 (Lion) - Appears at center, Card 1 slides left (T+0.55 = 0.52 + 0.03)
      .to(cards[1], {
        opacity: 1,
        y: '-50%',
        rotation: 0,
        x: '-50%',
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.55)
      .to(cards[0], {
        rotation: -3,
        x: '-65%',
        duration: 0.08,
        ease: 'power2.out'
      }, 0.55)

      // Hold (0.03 duration)
      .to({}, { duration: 0.03 }, 0.63)

      // Card 3 (Giraffe) - Appears at center, Cards 1-2 adjust (T+0.66 = 0.63 + 0.03)
      .to(cards[2], {
        opacity: 1,
        y: '-50%',
        rotation: 0,
        x: '-50%',
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.66)
      .to(cards[0], {
        rotation: -6,
        x: '-80%',
        duration: 0.08,
        ease: 'power2.out'
      }, 0.66)
      .to(cards[1], {
        rotation: -3,
        x: '-65%',
        duration: 0.08,
        ease: 'power2.out'
      }, 0.66)

      // Hold (0.03 duration)
      .to({}, { duration: 0.03 }, 0.74)

      // Card 4 (Zebra) - Appears right of center (T+0.77 = 0.74 + 0.03)
      .to(cards[3], {
        opacity: 1,
        y: '-50%',
        rotation: 3,
        x: '-35%',
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.77)

      // Hold (0.03 duration)
      .to({}, { duration: 0.03 }, 0.85)

      // Card 5 (Cheetah) - Completes fan at far right (T+0.88 = 0.85 + 0.03)
      .to(cards[4], {
        opacity: 1,
        y: '-50%',
        rotation: 6,
        x: '-20%',
        scale: 1,
        duration: 0.08,
        ease: 'power2.out'
      }, 0.88)

      // Final Hold (remaining duration to appreciate complete fan)
      .to({}, { duration: 0.04 }, 0.96);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.wildlifeEncountersChapter} ${className}`}
      data-chapter="wildlife-encounters"
      aria-labelledby="wildlife-encounters-heading"
      tabIndex={-1}
    >
      <div className={styles.container}>
        <div ref={introRef} className={styles.intro}>
          <h2 id="wildlife-encounters-heading" className={styles.heading}>
            Wildlife Encounters
          </h2>
          <p className={styles.subtitle}>Meet the Majestic Five of Amboseli</p>
        </div>

        <div ref={fanContainerRef} className={styles.fanContainer}>
          {animals.slice(0, 5).map((animal, index) => (
            <div
              key={animal.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <OptimizedImage
                  src={animal.image}
                  alt={animal.name}
                  width={400}
                  height={300}
                  imageType="content"
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{animal.name}</h3>
                  <span className={styles.scientificName}>{animal.scientificName}</span>
                  <span className={`${styles.conservationStatus} ${styles[animal.conservationStatus.toLowerCase().replace(/\s+/g, '-')]}`}>
                    {animal.conservationStatus}
                  </span>
                </div>
                <p className={styles.cardDescription}>{animal.description}</p>
                <div className={styles.funFact}>
                  <h4 className={styles.funFactTitle}>Did you know?</h4>
                  <p className={styles.funFactText}>{animal.funFact}</p>
                </div>
                <div className={styles.bestTime}>
                  <strong>Best time to see:</strong> {animal.bestTimeToSee}
                </div>
                <a href={`#${animal.id}`} className={styles.learnMore}>
                  Learn to Encounter
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.scrollHint}>
          <span>Scroll to explore</span>
          <svg className={styles.scrollArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className={styles.progressIndicator}>
          {animals.slice(0, 5).map((_, index) => (
            <div key={index} className={styles.progressDot} />
          ))}
        </div>
      </div>
    </section>
  );
}

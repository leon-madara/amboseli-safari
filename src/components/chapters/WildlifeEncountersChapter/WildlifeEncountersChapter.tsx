'use client';

import { useRef } from 'react';
import { BaseChapterProps } from '@/types/chapter';
import { WILDLIFE_ANIMALS, WildlifeAnimal } from '@/data/wildlife';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import styles from './WildlifeEncountersChapter.module.css';

export interface WildlifeEncountersChapterProps extends BaseChapterProps {
  animals?: WildlifeAnimal[];
}

export default function WildlifeEncountersChapter({
  id,
  className = '',
  animals = WILDLIFE_ANIMALS,
}: WildlifeEncountersChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        <div className={styles.intro}>
          <h2 id="wildlife-encounters-heading" className={styles.heading}>
            Wildlife Encounters
          </h2>
          <p className={styles.subtitle}>Meet the Majestic Five of Amboseli</p>
        </div>

        <div className={styles.fanContainer}>
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

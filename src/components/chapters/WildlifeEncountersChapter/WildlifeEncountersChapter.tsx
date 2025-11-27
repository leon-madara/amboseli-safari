'use client';

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
  return (
    <section
      id={id}
      className={`${styles.wildlifeEncountersChapter} ${className}`}
      data-chapter="wildlife-encounters"
      aria-labelledby="wildlife-encounters-heading"
    >
      <div className={styles.container}>
        {/* Page 1: Title and Subtitle - Centered Full Height */}
        <div className={styles.introSection}>
          <div className={styles.introContent}>
            <h2 id="wildlife-encounters-heading" className={styles.heading}>
              Wildlife Encounters
            </h2>
            <p className={styles.subtitle}>Meet the Majestic Five of Amboseli</p>
          </div>
        </div>

        {/* Page 2: Animal Grid - Full Height */}
        <div className={styles.gridSection}>
          <div className={styles.gridContainer}>
            {animals.slice(0, 5).map((animal) => (
              <div
                key={animal.id}
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
        </div>
      </div>
    </section>
  );
}

'use client';

import { ExperienceCardSkeleton } from '@/components/molecules/ExperienceCardSkeleton';
import styles from './ExperiencesGridSkeleton.module.css';

interface ExperiencesGridSkeletonProps {
  count?: number;
}

export function ExperiencesGridSkeleton({ count = 12 }: ExperiencesGridSkeletonProps) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={styles.cardWrapper}
            data-size={getCardSize(index)}
          >
            <ExperienceCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

// Match the same card size distribution as the real grid
function getCardSize(index: number): 'standard' | 'tall' | 'wide' | 'hero' {
  if (index === 0) return 'hero';
  if (index % 10 === 5) return 'wide';
  if (index % 10 === 8) return 'tall';
  return 'standard';
}

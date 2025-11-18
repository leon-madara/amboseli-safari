'use client';

import { useRef, useEffect } from 'react';
import { ExperienceCard } from '@/components/molecules/ExperienceCard';
import type { ExperienceType } from '@/types/experience';
import styles from './ExperiencesGrid.module.css';

interface ExperiencesGridProps {
  experiences: ExperienceType[];
}

export function ExperiencesGrid({ experiences }: ExperiencesGridProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Early return if no experiences to observe
    if (experiences.length === 0) return;

    // Intersection Observer for lazy animation
    // Performance: Uses native browser API instead of JavaScript animation loops
    // This ensures 60fps by delegating animation to CSS transforms
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px',
    };

    const observer = new IntersectionObserver((entries) => {
      // Use requestAnimationFrame for DOM updates to ensure smooth 60fps
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            // Unobserve after animation to free up resources
            observer.unobserve(entry.target);
          }
        });
      });
    }, observerOptions);

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [experiences.length]);

  // Handle empty state gracefully (though parent should handle this)
  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={el => {
              cardRefs.current[index] = el;
            }}
            className={styles.cardWrapper}
            data-size={getCardSize(index)}
            style={{ animationDelay: `${Math.min(index * 0.1, 0.4)}s` }}
          >
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Card size distribution: 70% standard, 20% tall/wide, 10% hero
function getCardSize(index: number): 'standard' | 'tall' | 'wide' | 'hero' {
  if (index === 0) return 'hero'; // First card is hero
  if (index % 10 === 5) return 'wide';
  if (index % 10 === 8) return 'tall';
  return 'standard';
}

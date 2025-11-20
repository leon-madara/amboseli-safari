'use client';

import { useEffect, useRef } from 'react';
import { ChapterHeader } from '@/components/molecules/ChapterHeader';
import { ExperienceCardHorizontal } from '@/components/molecules/ExperienceCardHorizontal';
import type { Chapter } from '@/utils/timeline';
import styles from './TimelineChapter.module.css';

interface TimelineChapterProps {
  chapter: Chapter;
  isActive: boolean;
}

export function TimelineChapter({ chapter, isActive }: TimelineChapterProps) {
  const chapterRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Reveal cards with IntersectionObserver
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 200px 0px 0px', // Preload 200px ahead
      }
    );

    cards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [chapter.experiences.length]);

  return (
    <section
      ref={chapterRef}
      id={`chapter-${chapter.id}`}
      className={`${styles.chapter} ${isActive ? styles.active : ''}`}
      data-chapter={chapter.id}
      style={{
        '--chapter-primary': chapter.colorScheme.primary,
        '--chapter-secondary': chapter.colorScheme.secondary,
        '--chapter-text': chapter.colorScheme.text,
      } as React.CSSProperties}
    >
      {/* Chapter header */}
      <ChapterHeader
        icon={chapter.icon}
        title={chapter.title}
        time={chapter.time}
        description={chapter.description}
      />

      {/* Experience cards */}
      <div className={styles.cardsContainer}>
        {chapter.experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={styles.cardWrapper}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <ExperienceCardHorizontal
              experience={experience}
              chapterTheme={chapter.colorScheme}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

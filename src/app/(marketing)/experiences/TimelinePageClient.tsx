'use client';

import { useState } from 'react';
import { TimelineHero } from '@/components/organisms/TimelineHero';
import { TimelineNavigation } from '@/components/organisms/TimelineNavigation';
import { HorizontalScrollSection } from '@/components/organisms/HorizontalScrollSection';
import { ExperiencesGrid } from '@/components/organisms/ExperiencesGrid';
import type { ExperienceType } from '@/types/experience';
import { organizeExperiencesByTime, ChapterType } from '@/utils/timeline';
import styles from './TimelinePage.module.css';

interface TimelinePageClientProps {
  experiences: ExperienceType[];
}

export function TimelinePageClient({ experiences }: TimelinePageClientProps) {
  const chapters = organizeExperiencesByTime(experiences);
  const [activeChapter, setActiveChapter] = useState<ChapterType>('dawn');

  // Simplify chapters for navigation (remove experiences array)
  const navChapters = chapters.map(({ id, title, icon }) => ({
    id,
    title,
    icon,
  }));

  const handleChapterChange = (chapterId: ChapterType) => {
    setActiveChapter(chapterId);
  };

  // Scroll to chapter function for TimelineNavigation
  const handleChapterClick = (chapterId: ChapterType) => {
    // The useHorizontalScroll hook will handle the actual scrolling
    // via the scrollToChapter function which will be called from HorizontalScrollSection
    setActiveChapter(chapterId);

    // Trigger scroll via event or direct ref call
    const event = new CustomEvent('scrollToChapter', { detail: chapterId });
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.page}>
      {/* Hero section */}
      <TimelineHero />

      {/* Sticky navigation */}
      <TimelineNavigation
        chapters={navChapters}
        activeChapter={activeChapter}
        onChapterClick={handleChapterClick}
      />

      {/* Horizontal scroll timeline */}
      <HorizontalScrollSection
        chapters={chapters}
        onChapterChange={handleChapterChange}
      />

      {/* All experiences grid (fallback / additional view) */}
      <section className={styles.allExperiencesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Experiences</h2>
          <p className={styles.sectionSubtitle}>
            Explore our complete collection of safari activities
          </p>
        </div>
        <ExperiencesGrid experiences={experiences} />
      </section>
    </div>
  );
}

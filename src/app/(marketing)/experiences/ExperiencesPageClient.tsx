'use client';

import { ExperiencesGrid } from '@/components/organisms/ExperiencesGrid';
import { ExperiencesGridSkeleton } from '@/components/organisms/ExperiencesGridSkeleton';
import { EmptyState } from '@/components/molecules/EmptyState';
import type { ExperienceType } from '@/types/experience';
import styles from './ExperiencesPage.module.css';

interface ExperiencesPageClientProps {
  experiences: ExperienceType[];
  isLoading?: boolean;
}

export function ExperiencesPageClient({ experiences, isLoading = false }: ExperiencesPageClientProps) {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.breadcrumbs}>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Experiences</span>
        </div>
        <h1 className={styles.pageTitle}>Safari Experiences</h1>
        <p className={styles.pageSubtitle}>Curated adventures in the heart of Amboseli</p>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <ExperiencesGridSkeleton count={12} />
        ) : experiences.length === 0 ? (
          <EmptyState
            title="No Experiences Available"
            message="We are currently updating our safari experiences. Please check back soon or return to the homepage to explore other offerings."
            linkText="Return to Home"
            linkHref="/"
          />
        ) : (
          <ExperiencesGrid experiences={experiences} />
        )}
      </div>
    </div>
  );
}

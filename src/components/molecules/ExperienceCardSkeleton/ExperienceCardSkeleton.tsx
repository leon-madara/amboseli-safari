'use client';

import styles from './ExperienceCardSkeleton.module.css';

export default function ExperienceCardSkeleton() {
  return (
    <div className={styles.card} aria-label="Loading experience...">
      <div className={styles.imageContainer}>
        <div className={styles.imageSkeleton} />
        <div className={styles.badgeSkeleton} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleSkeleton} />
        <div className={styles.descriptionSkeleton}>
          <div className={styles.descriptionLine} />
          <div className={styles.descriptionLine} />
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItemSkeleton} />
          <div className={styles.metaItemSkeleton} />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.ctaSkeleton} />
      </div>
    </div>
  );
}

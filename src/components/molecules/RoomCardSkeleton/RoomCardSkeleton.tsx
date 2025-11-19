import styles from './RoomCardSkeleton.module.css';

export default function RoomCardSkeleton() {
  return (
    <article className={styles.skeleton}>
      {/* Image skeleton */}
      <div className={styles.imageContainer}>
        <div className={styles.skeletonImage} />
      </div>

      <div className={styles.content}>
        {/* Title and rating skeleton */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonRating}`} />
          </div>
          <div className={`${styles.skeletonLine} ${styles.skeletonDescription}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonDescriptionShort}`} />
        </div>

        {/* Details skeleton */}
        <div className={styles.details}>
          <div className={`${styles.skeletonLine} ${styles.skeletonDetail}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonDetail}`} />
        </div>

        {/* Features skeleton */}
        <div className={styles.featuresSection}>
          <div className={styles.features}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${styles.skeletonLine} ${styles.skeletonFeature}`} />
            ))}
          </div>
        </div>

        {/* Included items skeleton */}
        <div className={styles.includedSection}>
          <div className={`${styles.skeletonLine} ${styles.skeletonIncludedLabel}`} />
          <div className={styles.includedItems}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`${styles.skeletonLine} ${styles.skeletonIncludedItem}`} />
            ))}
          </div>
        </div>

        {/* Footer skeleton */}
        <div className={styles.footer}>
          <div className={styles.pricing}>
            <div className={`${styles.skeletonLine} ${styles.skeletonPriceLabel}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonPrice}`} />
          </div>

          <div className={styles.ctaGroup}>
            <div className={`${styles.skeletonLine} ${styles.skeletonButton}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonButtonSecondary}`} />
          </div>
        </div>

        {/* Trust signals skeleton */}
        <div className={styles.trustSignals}>
          <div className={`${styles.skeletonLine} ${styles.skeletonTrust}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonTrust}`} />
        </div>
      </div>
    </article>
  );
}

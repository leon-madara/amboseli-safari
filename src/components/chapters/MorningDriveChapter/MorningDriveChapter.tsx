'use client';

import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import styles from './MorningDriveChapter.module.css';

export interface MorningDriveChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  midgroundImage?: string;
  ctaButton?: CTAButton;
}

export default function MorningDriveChapter({
  id,
  className = '',
  midgroundImage = '/images/wildlife/lionPride.png',
  ctaButton = {
    text: 'Discover the Wildlife',
    href: '#wildlife-encounters',
    variant: 'primary',
  },
}: MorningDriveChapterProps) {
  return (
    <section
      id={id}
      className={`${styles.morningDriveChapter} ${className}`}
      data-chapter="morning-drive"
      aria-labelledby="morning-drive-heading"
    >
      <div className={styles.container}>
        <h2
          id="morning-drive-heading"
          className={styles.heading}
        >
          Morning Safari Drive
        </h2>

        {/* Two-Card Content Wrapper */}
        <div className={styles.contentWrapper}>
          {/* Text Card */}
          <div className={styles.textCard}>
            <h3 className={styles.subHeading}>
              First Light on the Golden Plains
            </h3>
            <p className={styles.description}>
              Experience the magic of dawn as the savanna awakens. Track wildlife across the golden plains
              with Mount Kilimanjaro rising majestically in the distance. This pre-dawn adventure offers an
              intimate glimpse into the bushveld&apos;s most active hours, where predators conclude their nightly
              hunts and herds begin their daily grazing rituals.
            </p>
          </div>

          {/* Image Card */}
          <div className={styles.imageCard}>
            <div className={styles.imageContainer}>
              <OptimizedImage
                src={midgroundImage}
                alt="A golden savanna at dawn with Mount Kilimanjaro silhouetted in the distance, safari vehicle in the foreground tracking wildlife"
                width={400}
                height={250}
                imageType="content"
                className={styles.image}
              />
            </div>
          </div>
        </div>

        {/* Trip Details - Full Width Below Both Cards */}
        <div className={styles.tripDetailsWrapper}>
          <div className={styles.tripDetails}>
            <h4 className={styles.detailsHeading}>Trip Details</h4>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Distance Covered:</span>
                <span className={styles.detailValue}>15 KM</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Time of Day:</span>
                <span className={styles.detailValue}>Pre-dawn departure</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Available From:</span>
                <span className={styles.detailValue}>December 2025</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>Approximately 3-4 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen safari image section - Now static below details */}
      <div className={styles.cinematicSection}>
        <div className={styles.fullScreenImage}>
          <OptimizedImage
            src="/images/experiences/Elephants Walking Right.png"
            alt="Elephants walking across the golden savanna at dawn"
            width={1920}
            height={1080}
            imageType="hero"
            priority
          />
        </div>
        
        <div className={styles.staticHeading}>
          <h3 className={styles.cinematicTitle}>This could be your morning</h3>
          <p className={styles.cinematicSubtitle}>Exciting. Beautiful. Breath taking.</p>
        </div>
      </div>
    </section>
  );
}

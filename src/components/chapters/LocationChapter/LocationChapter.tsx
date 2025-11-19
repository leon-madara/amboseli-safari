'use client';

import { useRef } from 'react';
import { BaseChapterProps } from '@/types/chapter';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import { CHAPTER_IMAGES } from '@/data/images';
import styles from './LocationChapter.module.css';

interface LocationChapterProps extends BaseChapterProps {}

/**
 * Location Chapter - Getting to Amboseli Safari Club
 *
 * Simplified static version displaying:
 * - Travel distances and times
 * - Airport information
 * - Transport options
 * - Practical travel information
 */
export default function LocationChapter({ id, className = '' }: LocationChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.locationChapter} ${className}`}
      data-chapter="location"
      data-time-of-day="twilight"
      aria-labelledby="location-heading"
    >
      {/* Background with twilight atmosphere */}
      <div className={styles.backgroundContainer} aria-hidden="true">
        <div className={styles.atmosphericOverlay} />
      </div>

      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 id="location-heading" className={styles.sectionTitle}>
            Getting to Your Safari Adventure
          </h2>
          <p className={styles.sectionSubtitle}>
            Located in the heart of Amboseli, just 2km from Kimana Gate
          </p>
        </div>

        {/* Key Travel Information */}
        <div className={styles.travelInfoSection}>
          <div className={styles.travelInfoGrid}>
            <div className={styles.travelInfoCard}>
              <span className={styles.travelInfoIcon}>🏙️</span>
              <h3 className={styles.travelInfoTitle}>From Nairobi</h3>
              <p className={styles.travelInfoDistance}>365 km</p>
              <p className={styles.travelInfoTime}>3-4 hours drive</p>
            </div>
            <div className={styles.travelInfoCard}>
              <span className={styles.travelInfoIcon}>🚪</span>
              <h3 className={styles.travelInfoTitle}>Kimana Gate</h3>
              <p className={styles.travelInfoDistance}>2 km</p>
              <p className={styles.travelInfoTime}>Main park entrance</p>
            </div>
            <div className={styles.travelInfoCard}>
              <span className={styles.travelInfoIcon}>🏔️</span>
              <h3 className={styles.travelInfoTitle}>Mount Kilimanjaro</h3>
              <p className={styles.travelInfoDistance}>45 km</p>
              <p className={styles.travelInfoTime}>Unobstructed views</p>
            </div>
          </div>
        </div>

        {/* Transport Options */}
        <div className={styles.transportSection}>
          <h3 className={styles.subsectionTitle}>Transport Options</h3>
          <div className={styles.transportGrid}>
            <div className={styles.transportCard}>
              <span className={styles.transportIcon}>🚗</span>
              <h4 className={styles.transportName}>Private Transfer</h4>
              <p className={styles.transportDescription}>
                Comfortable, air-conditioned vehicle with professional driver
              </p>
              <div className={styles.transportDetails}>
                <div className={styles.transportMeta}>
                  <span className={styles.transportLabel}>Duration:</span>
                  <span className={styles.transportValue}>3-4 hours</span>
                </div>
                <div className={styles.transportMeta}>
                  <span className={styles.transportLabel}>Price:</span>
                  <span className={styles.transportValue}>From $150</span>
                </div>
              </div>
              <div className={styles.recommendedBadge}>Recommended</div>
            </div>

            <div className={styles.transportCard}>
              <span className={styles.transportIcon}>🚙</span>
              <h4 className={styles.transportName}>Self-Drive</h4>
              <p className={styles.transportDescription}>
                Well-maintained roads, suitable for most vehicles
              </p>
              <div className={styles.transportDetails}>
                <div className={styles.transportMeta}>
                  <span className={styles.transportLabel}>Duration:</span>
                  <span className={styles.transportValue}>3-4 hours</span>
                </div>
                <div className={styles.transportMeta}>
                  <span className={styles.transportLabel}>Road Type:</span>
                  <span className={styles.transportValue}>Tarmac + Gravel</span>
                </div>
              </div>
            </div>

            <div className={styles.transportCard}>
              <span className={styles.transportIcon}>✈️</span>
              <h4 className={styles.transportName}>Air Transfer</h4>
              <p className={styles.transportDescription}>
                Charter flight from Wilson Airport to Amboseli Airstrip
              </p>
              <div className={styles.transportDetails}>
                <div className={styles.transportMeta}>
                  <span className={styles.transportLabel}>Duration:</span>
                  <span className={styles.transportValue}>45 minutes</span>
                </div>
                <div className={styles.transportMeta}>
                  <span className={styles.transportLabel}>Price:</span>
                  <span className={styles.transportValue}>On request</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Airports Section */}
        <div className={styles.airportsSection}>
          <h3 className={styles.subsectionTitle}>Nearest Airports</h3>
          <div className={styles.airportsList}>
            <div className={styles.airportItem}>
              <span className={styles.airportIcon}>✈️</span>
              <div className={styles.airportInfo}>
                <span className={styles.airportName}>Jomo Kenyatta International Airport</span>
                <span className={styles.airportCode}>(NBO)</span>
              </div>
              <span className={styles.airportDistance}>350 km</span>
            </div>
            <div className={styles.airportItem}>
              <span className={styles.airportIcon}>🛩️</span>
              <div className={styles.airportInfo}>
                <span className={styles.airportName}>Wilson Airport</span>
                <span className={styles.airportCode}>(WIL)</span>
              </div>
              <span className={styles.airportDistance}>240 km</span>
            </div>
            <div className={styles.airportItem}>
              <span className={styles.airportIcon}>🛬</span>
              <div className={styles.airportInfo}>
                <span className={styles.airportName}>Amboseli Airstrip</span>
                <span className={styles.airportCode}>(ASV)</span>
              </div>
              <span className={styles.airportDistance}>15 km</span>
            </div>
          </div>
        </div>

        {/* Essential Info Cards */}
        <div className={styles.infoSection}>
          <h3 className={styles.subsectionTitle}>Essential Travel Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🕒</span>
              <h4 className={styles.infoTitle}>Best Time to Travel</h4>
              <p className={styles.infoContent}>
                Early morning departures recommended to arrive before midday and enjoy full safari experience
              </p>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🎫</span>
              <h4 className={styles.infoTitle}>Park Entry</h4>
              <p className={styles.infoContent}>
                Valid park fees required. We can arrange park entry and guide services in advance
              </p>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📱</span>
              <h4 className={styles.infoTitle}>Connectivity</h4>
              <p className={styles.infoContent}>
                Mobile network coverage available. Wi-Fi provided at the lodge for guests
              </p>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🧳</span>
              <h4 className={styles.infoTitle}>What to Bring</h4>
              <p className={styles.infoContent}>
                Light clothing, sunscreen, hat, camera, binoculars. Warm layer for early morning drives
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaHeading}>Need Help Planning Your Journey?</h3>
          <p className={styles.ctaText}>
            Let us arrange your comfortable, hassle-free transfer to Amboseli Safari Club
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contact?subject=Transfer%20Booking" className={styles.ctaPrimary}>
              Arrange Private Transfer
            </a>
            <a href="/contact" className={styles.ctaSecondary}>
              Ask Questions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

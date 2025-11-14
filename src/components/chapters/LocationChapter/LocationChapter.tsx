'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ParallaxImage } from '@/components/atoms/ParallaxImage';
import { CHAPTER_IMAGES } from '@/data/images';
import {
  LODGE_COORDINATES,
  CITY_DISTANCES,
  TRANSFER_OPTIONS,
  NEARBY_AIRPORTS,
} from '@/data/locationData';
import styles from './LocationChapter.module.css';

interface LocationChapterProps {
  id: string;
}

/**
 * Chapter 10: Location & Access
 *
 * Shows location information and access options for the safari lodge.
 * Features:
 * - Interactive animated map with pulsing location marker
 * - Distance cards from major cities
 * - Transfer options comparison
 * - Twilight atmosphere
 *
 * Requirements: 12.1-12.5
 */
export default function LocationChapter({ id }: LocationChapterProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      id={id}
      className={styles.locationChapter}
      data-chapter="location"
      data-time-of-day="twilight"
    >
      {/* Background layer with parallax */}
      <ParallaxImage
        src={CHAPTER_IMAGES.location.twilightSky}
        alt="Twilight sky over Amboseli"
        speed={0.3}
        className={styles.backgroundImage}
        priority={false}
      />

      {/* Atmospheric overlay for twilight effect */}
      <div className={styles.atmosphericOverlay} />

      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Section header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Prime Location Near Kimana Gate
          </motion.h2>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Perfect access to Amboseli National Park - Just 3-4 hours from Nairobi
          </motion.p>
        </div>

        {/* Animated Map */}
        <div className={styles.mapSection}>
          <h3 className={styles.sectionHeading}>Location</h3>
          <AnimatedMap
            coordinates={LODGE_COORDINATES}
            inView={inView}
          />
        </div>

        {/* Distance Cards */}
        <div className={styles.distanceSection}>
          <h3 className={styles.sectionHeading}>Easy Access from Major Cities</h3>
          <DistanceCards
            distances={CITY_DISTANCES}
            inView={inView}
          />
        </div>

        {/* Transfer Options */}
        <div className={styles.transferSection}>
          <h3 className={styles.sectionHeading}>Getting Here</h3>
          <TransferOptions
            options={TRANSFER_OPTIONS}
            airports={NEARBY_AIRPORTS}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Animated Map Component
 * Shows map with pulsing location marker
 */
interface AnimatedMapProps {
  coordinates: typeof LODGE_COORDINATES;
  inView: boolean;
}

function AnimatedMap({ coordinates, inView }: AnimatedMapProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate static map URL using OpenStreetMap-based service
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-l-lodging+D4AF37(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},10,0/800x500@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`;

  return (
    <motion.div
      className={styles.mapContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.mapWrapper}>
        {/* Map background image */}
        <div className={styles.mapImage}>
          <Image
            src={CHAPTER_IMAGES.location.kenyaMap}
            alt="Map showing Amboseli Safari Club location"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className={styles.mapImg}
          />
        </div>

        {/* Pulsing location marker */}
        <div className={styles.locationMarker}>
          <div className={styles.markerPulse} />
          <div className={styles.markerDot} />
          <div className={styles.markerLabel}>
            <span className={styles.markerIcon}>📍</span>
            <span className={styles.markerText}>Amboseli Safari Club</span>
          </div>
        </div>

        {/* Coordinates display */}
        <div className={styles.coordinatesDisplay}>
          <span className={styles.coordinatesLabel}>Coordinates:</span>
          <span className={styles.coordinatesValue}>
            {coordinates.lat.toFixed(4)}°S, {Math.abs(coordinates.lng).toFixed(4)}°E
          </span>
        </div>
      </div>

      {/* Map info */}
      <div className={styles.mapInfo}>
        <p className={styles.mapDescription}>
          Located near Kimana Gate of Amboseli National Park, with stunning views of Mount Kilimanjaro.
          Perfect base for exploring Kenya's elephant capital.
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Distance Cards Component
 * Shows travel times from major cities
 */
interface DistanceCardsProps {
  distances: typeof CITY_DISTANCES;
  inView: boolean;
}

function DistanceCards({ distances, inView }: DistanceCardsProps) {
  return (
    <div className={styles.distanceCardsGrid}>
      {distances.map((distance, index) => (
        <motion.div
          key={distance.city}
          className={styles.distanceCard}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        >
          <div className={styles.distanceCardIcon}>{distance.icon}</div>
          <h4 className={styles.distanceCardCity}>{distance.city}</h4>
          <div className={styles.distanceCardDetails}>
            <div className={styles.distanceCardMetric}>
              <span className={styles.distanceCardLabel}>Distance</span>
              <span className={styles.distanceCardValue}>{distance.distance} km</span>
            </div>
            <div className={styles.distanceCardMetric}>
              <span className={styles.distanceCardLabel}>Drive Time</span>
              <span className={styles.distanceCardValue}>{distance.driveTime}</span>
            </div>
            <div className={styles.distanceCardTransport}>
              <span className={styles.transportBadge}>{distance.transportType}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Transfer Options Component
 * Shows different ways to reach the lodge
 */
interface TransferOptionsProps {
  options: typeof TRANSFER_OPTIONS;
  airports: typeof NEARBY_AIRPORTS;
  inView: boolean;
}

function TransferOptions({ options, airports, inView }: TransferOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className={styles.transferOptionsContainer}>
      {/* Transfer Options Grid */}
      <div className={styles.transferOptionsGrid}>
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            className={`${styles.transferOption} ${
              selectedOption === option.id ? styles.transferOptionSelected : ''
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            onClick={() => setSelectedOption(option.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedOption(option.id);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className={styles.transferOptionIcon}>{option.icon}</div>
            <h4 className={styles.transferOptionName}>{option.name}</h4>
            <p className={styles.transferOptionDescription}>{option.description}</p>
            <div className={styles.transferOptionDetails}>
              <div className={styles.transferOptionMeta}>
                <span className={styles.transferOptionLabel}>Duration:</span>
                <span className={styles.transferOptionValue}>{option.duration}</span>
              </div>
              <div className={styles.transferOptionMeta}>
                <span className={styles.transferOptionLabel}>Price:</span>
                <span className={styles.transferOptionValue}>{option.priceRange}</span>
              </div>
            </div>
            {option.recommended && (
              <span className={styles.recommendedBadge}>Recommended</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Nearby Airports */}
      <motion.div
        className={styles.airportsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h4 className={styles.airportsHeading}>Nearby Airports</h4>
        <div className={styles.airportsList}>
          {airports.map((airport) => (
            <div key={airport.code} className={styles.airportItem}>
              <div className={styles.airportIcon}>✈️</div>
              <div className={styles.airportInfo}>
                <div className={styles.airportName}>{airport.name}</div>
                <div className={styles.airportCode}>({airport.code})</div>
              </div>
              <div className={styles.airportDistance}>{airport.distance} km</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        className={styles.contactCTA}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className={styles.contactCTAText}>
          Need help planning your journey? Our team is here to assist.
        </p>
        <button className={styles.contactButton}>Contact Us for Transfer Arrangements</button>
      </motion.div>
    </div>
  );
}

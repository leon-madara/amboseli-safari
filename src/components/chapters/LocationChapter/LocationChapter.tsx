'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ParallaxImage } from '@/components/atoms/ParallaxImage';
import { InfoCard } from '@/components/atoms/InfoCard';
import { RouteSelector } from '@/components/molecules/RouteSelector';
import { InteractiveMap } from '@/components/molecules/InteractiveMap';
import { JourneyTimeline } from '@/components/molecules/JourneyTimeline';
import { TransportComparisonTable } from '@/components/molecules/TransportComparisonTable';
import { PhotoGallery } from '@/components/molecules/PhotoGallery';
import { CHAPTER_IMAGES } from '@/data/images';
import {
  JOURNEY_ROUTES,
  JOURNEY_TIMELINE_STEPS,
  TRANSFER_OPTIONS,
  JOURNEY_GALLERY,
  INFO_CARDS,
  PROXIMITY_LANDMARKS,
} from '@/data/locationData';
import styles from './LocationChapter.module.css';

interface LocationChapterProps {
  id: string;
}

/**
 * Enhanced Location Chapter - Interactive Journey Planner
 *
 * Features:
 * - Interactive route selector with 4 routes
 * - Mapbox interactive map with waypoints
 * - Step-by-step journey timeline
 * - Transport comparison table
 * - Photo gallery with filters
 * - Practical information cards
 * - Booking CTAs
 */
function LocationChapter({ id }: LocationChapterProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [selectedRouteId, setSelectedRouteId] = useState(JOURNEY_ROUTES[0].id);

  const selectedRoute = JOURNEY_ROUTES.find(r => r.id === selectedRouteId) || JOURNEY_ROUTES[0];
  const currentTimeline = JOURNEY_TIMELINE_STEPS[selectedRouteId] || [];

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
        {/* Section 1: Hero Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Getting to Your Safari Adventure
          </motion.h2>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choose your route below and start planning your journey
          </motion.p>
        </div>

        {/* Section 2: Route Selector */}
        <motion.div
          className={styles.routeSelectorSection}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className={styles.subsectionTitle}>Choose Your Journey</h3>
          <RouteSelector
            routes={JOURNEY_ROUTES.map(route => ({
              id: route.id,
              name: route.name,
              icon: route.icon,
              duration: route.totalDuration,
              distance: route.totalDistance,
              recommended: route.recommended,
            }))}
            onRouteChange={setSelectedRouteId}
            defaultRoute={JOURNEY_ROUTES[0].id}
          />
        </motion.div>

        {/* Section 3: Key Travel Information */}
        <motion.div
          className={styles.travelInfoSection}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className={styles.travelInfoGrid}>
            <div className={styles.travelInfoCard}>
              <span className={styles.travelInfoIcon}>🏙️</span>
              <h4 className={styles.travelInfoTitle}>From Nairobi</h4>
              <p className={styles.travelInfoDistance}>365 km</p>
              <p className={styles.travelInfoTime}>3-4 hours drive</p>
            </div>
            <div className={styles.travelInfoCard}>
              <span className={styles.travelInfoIcon}>🚪</span>
              <h4 className={styles.travelInfoTitle}>Kimana Gate</h4>
              <p className={styles.travelInfoDistance}>2 km</p>
              <p className={styles.travelInfoTime}>Main park entrance</p>
            </div>
            <div className={styles.travelInfoCard}>
              <span className={styles.travelInfoIcon}>🏔️</span>
              <h4 className={styles.travelInfoTitle}>Mount Kilimanjaro</h4>
              <p className={styles.travelInfoDistance}>45 km</p>
              <p className={styles.travelInfoTime}>Unobstructed views</p>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Interactive Map + Journey Timeline */}
        <div className={styles.mapTimelineSection}>
          <motion.div
            className={styles.mapColumn}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className={styles.subsectionTitle}>Your Route</h3>
            <InteractiveMap
              waypoints={selectedRoute.waypoints}
              showRoute={true}
              proximityLandmarks={PROXIMITY_LANDMARKS}
            />
          </motion.div>

          <motion.div
            className={styles.timelineColumn}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h3 className={styles.subsectionTitle}>Journey Steps</h3>
            <JourneyTimeline steps={currentTimeline} />
          </motion.div>
        </div>

        {/* Section 5: Transport Comparison */}
        <motion.div
          className={styles.comparisonSection}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className={styles.subsectionTitle}>Compare Transportation Options</h3>
          <TransportComparisonTable options={TRANSFER_OPTIONS} />
        </motion.div>

        {/* Section 6: Photo Gallery */}
        <motion.div
          className={styles.gallerySection}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className={styles.subsectionTitle}>What to Expect Along the Way</h3>
          <p className={styles.expectationsIntro}>
            Your journey to Amboseli is part of the adventure. Here&apos;s what you&apos;ll experience:
          </p>
          <PhotoGallery images={JOURNEY_GALLERY} columns={3} />
        </motion.div>

        {/* Section 7: Info Cards */}
        <motion.div
          className={styles.infoSection}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className={styles.subsectionTitle}>Essential Travel Information</h3>
          <div className={styles.infoGrid}>
            {INFO_CARDS.map(card => (
              <InfoCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                content={card.content}
              />
            ))}
          </div>
        </motion.div>

        {/* Section 8: Booking CTA */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h3 className={styles.ctaHeading}>Ready to Book Your Transfer?</h3>
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
        </motion.div>
      </div>
    </section>
  );
}

export default LocationChapter;

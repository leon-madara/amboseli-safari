'use client';

import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { useAccommodationsPinning } from '@/hooks/useAccommodationsPinning';
import { ParallaxContainer, ParallaxLayer } from '@/components/animations/ParallaxContainer';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import { CHAPTER_IMAGES, ROOM_IMAGES } from '@/data/images';
import styles from './AccommodationsChapter.module.css';

export interface RoomPreview {
  id: string;
  name: string;
  image: string;
  viewImage: string;
  tagline: string;
  price: string;
  features?: string[];
}

export interface AccommodationsChapterProps extends BaseChapterProps {
  rooms?: RoomPreview[];
  ctaButton?: CTAButton;
}

export default function AccommodationsChapter({
  id,
  className = '',
  rooms = [
    {
      id: 'safari-view-room',
      name: 'Safari View Room',
      image: CHAPTER_IMAGES.accommodations.lodgeExterior,
      viewImage: CHAPTER_IMAGES.accommodations.roomInterior,
      tagline: 'Modern comfort with pool access',
      price: 'From $220/night',
      features: ['Queen bed', 'Air conditioning', 'Wi-Fi', 'Pool access'],
    },
    {
      id: 'deluxe-safari-room',
      name: 'Deluxe Safari Room',
      image: ROOM_IMAGES.familySuite,
      viewImage: CHAPTER_IMAGES.accommodations.lodgeExterior,
      tagline: 'Extra space for families',
      price: 'From $280/night',
      features: ['King bed + sofa bed', 'Mini-fridge', 'Balcony', 'Family-friendly'],
    },
    {
      id: 'family-apartment',
      name: 'Family Apartment',
      image: ROOM_IMAGES.deluxeSuite,
      viewImage: ROOM_IMAGES.premiumRoom,
      tagline: 'Perfect for groups and extended stays',
      price: 'From $380/night',
      features: ['2 bedrooms', 'Kitchenette', 'Living area', 'Sleeps 4-6'],
    },
  ],
  ctaButton = {
    text: 'View All Rooms',
    href: '/accommodations',
    variant: 'primary',
  },
}: AccommodationsChapterProps) {
  // Track chapter progress
  useSpecificChapterProgress('accommodations');

  // Integrate GSAP pinning hook
  const sectionRef = useAccommodationsPinning();

  return (
    <ParallaxContainer className={styles.parallaxWrapper}>
      <section
        id={id}
        ref={sectionRef}
        className={`${styles.accommodationsChapter} accommodationsChapter ${className}`}
        data-chapter="accommodations"
        aria-labelledby="accommodations-heading"
        role="region"
        aria-label="Safari accommodations showcase"
      >
        {/* Skip to next section link for accessibility */}
        <a
          href="#dining"
          className={styles.skipLink}
          aria-label="Skip to next section: Dining Experience"
          tabIndex={0}
        >
          Skip to Dining Experience
        </a>

        {/* Background with midday lighting */}
        <div className={styles.backgroundContainer} aria-hidden="true">
          <div className={styles.gradientOverlay} />
        </div>

      {/* Heading Container - Fixed during pin */}
      <div className={styles.headingContainer}>
        <h2 id="accommodations-heading" className={styles.heading}>
          Comfortable Safari Accommodations
        </h2>
        <p className={styles.subtitle}>
          Modern rooms designed for families and groups
        </p>
      </div>

      {/* Rooms Container - Pinned viewport with absolute positioned rooms */}
      <div className={styles.roomsContainer} role="list" aria-label="Available room types">
        {/* Room 1: Image Left, Card Right */}
        <ParallaxLayer speed={0.5} className={`${styles.roomImage} room-1-image`} zIndex={2}>
          <div 
            data-position="left" 
            data-room="1"
            role="listitem"
            aria-label={`${rooms[0].name} image`}
          >
            <div className={styles.imageContent}>
              <OptimizedImage
                src={rooms[0].image}
                alt={`${rooms[0].name} - ${rooms[0].tagline}`}
                fill
                imageType="content"
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>
        </ParallaxLayer>

        <div 
          className={`${styles.roomCard} room-1-card`} 
          data-position="right" 
          data-room="1"
          role="listitem"
          tabIndex={0}
          aria-labelledby="room-1-name"
        >
          <div className={styles.cardContent}>
            <h3 id="room-1-name" className={styles.roomName}>{rooms[0].name}</h3>
            <p className={styles.roomTagline}>{rooms[0].tagline}</p>
            <p className={styles.roomPrice} aria-label={`Price: ${rooms[0].price}`}>{rooms[0].price}</p>
            {rooms[0].features && (
              <ul className={`${styles.features} features`} aria-label="Room features">
                {rooms[0].features.map((feature, idx) => (
                  <li key={idx} className={styles.feature}>
                    <span className={styles.featureIcon} aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Room 2: Card Left, Image Right */}
        <div 
          className={`${styles.roomCard} room-2-card`} 
          data-position="left" 
          data-room="2"
          role="listitem"
          tabIndex={0}
          aria-labelledby="room-2-name"
        >
          <div className={styles.cardContent}>
            <h3 id="room-2-name" className={styles.roomName}>{rooms[1].name}</h3>
            <p className={styles.roomTagline}>{rooms[1].tagline}</p>
            <p className={styles.roomPrice} aria-label={`Price: ${rooms[1].price}`}>{rooms[1].price}</p>
            {rooms[1].features && (
              <ul className={`${styles.features} features`} aria-label="Room features">
                {rooms[1].features.map((feature, idx) => (
                  <li key={idx} className={styles.feature}>
                    <span className={styles.featureIcon} aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ParallaxLayer speed={0.5} className={`${styles.roomImage} room-2-image`} zIndex={2}>
          <div 
            data-position="right" 
            data-room="2"
            role="listitem"
            aria-label={`${rooms[1].name} image`}
          >
            <div className={styles.imageContent}>
              <OptimizedImage
                src={rooms[1].image}
                alt={`${rooms[1].name} - ${rooms[1].tagline}`}
                fill
                imageType="content"
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>
        </ParallaxLayer>

        {/* Room 3: Image Left, Card Right */}
        <ParallaxLayer speed={0.5} className={`${styles.roomImage} room-3-image`} zIndex={2}>
          <div 
            data-position="left" 
            data-room="3"
            role="listitem"
            aria-label={`${rooms[2].name} image`}
          >
            <div className={styles.imageContent}>
              <OptimizedImage
                src={rooms[2].image}
                alt={`${rooms[2].name} - ${rooms[2].tagline}`}
                fill
                imageType="content"
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>
        </ParallaxLayer>

        <div 
          className={`${styles.roomCard} room-3-card`} 
          data-position="right" 
          data-room="3"
          role="listitem"
          tabIndex={0}
          aria-labelledby="room-3-name"
        >
          <div className={styles.cardContent}>
            <h3 id="room-3-name" className={styles.roomName}>{rooms[2].name}</h3>
            <p className={styles.roomTagline}>{rooms[2].tagline}</p>
            <p className={styles.roomPrice} aria-label={`Price: ${rooms[2].price}`}>{rooms[2].price}</p>
            {rooms[2].features && (
              <ul className={`${styles.features} features`} aria-label="Room features">
                {rooms[2].features.map((feature, idx) => (
                  <li key={idx} className={styles.feature}>
                    <span className={styles.featureIcon} aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* CTA Container */}
      <div className={styles.ctaContainer}>
        <a
          href={ctaButton.href}
          className={`${styles.cta} ${styles[`cta${ctaButton.variant.charAt(0).toUpperCase() + ctaButton.variant.slice(1)}`]}`}
          onClick={ctaButton.onClick}
          aria-label={ctaButton.text}
        >
          {ctaButton.text}
        </a>
      </div>
      </section>
    </ParallaxContainer>
  );
}


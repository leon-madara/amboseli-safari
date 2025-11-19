'use client';

import { useRef } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
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
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.accommodationsChapter} ${className}`}
      data-chapter="accommodations"
      aria-labelledby="accommodations-heading"
      role="region"
      aria-label="Safari accommodations showcase"
    >
      {/* Background with midday lighting */}
      <div className={styles.backgroundContainer} aria-hidden="true">
        <div className={styles.gradientOverlay} />
      </div>

      {/* Heading Container */}
      <div className={styles.headingContainer}>
        <h2 id="accommodations-heading" className={styles.heading}>
          Comfortable Safari Accommodations
        </h2>
        <p className={styles.subtitle}>
          Modern rooms designed for families and groups
        </p>
      </div>

      {/* Rooms Container - Static grid display */}
      <div className={styles.roomsContainer} role="list" aria-label="Available room types">
        {rooms.map((room, index) => (
          <div
            key={room.id}
            className={styles.roomItem}
            role="listitem"
          >
            <div className={styles.roomImage}>
              <OptimizedImage
                src={room.image}
                alt={`${room.name} - ${room.tagline}`}
                width={600}
                height={400}
                imageType="content"
                className={styles.image}
              />
            </div>
            <div className={styles.roomCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.roomName}>{room.name}</h3>
                <p className={styles.roomTagline}>{room.tagline}</p>
                <p className={styles.roomPrice}>{room.price}</p>
                {room.features && (
                  <ul className={styles.features}>
                    {room.features.map((feature, idx) => (
                      <li key={idx} className={styles.feature}>
                        <span className={styles.featureIcon}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className={styles.ctaContainer}>
        <a
          href={ctaButton.href}
          className={`${styles.ctaButton} ${styles[ctaButton.variant]}`}
          aria-label={ctaButton.text}
        >
          {ctaButton.text}
        </a>
      </div>
    </section>
  );
}

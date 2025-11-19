'use client';

import React from 'react';
import { RoomData } from '@/data/accommodationRooms';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import styles from './RoomCard.module.css';

export interface CardTransform {
  scale: number;
  translateY: number;
  zIndex: number;
  opacity: number;
}

export interface RoomCardProps {
  room: RoomData;
  index: number;
  transform?: CardTransform;
  isDesktop?: boolean;
  reducedMotion?: boolean;
}

/**
 * RoomCard Component
 * 
 * Displays individual room information with responsive layouts:
 * - Desktop (>= 768px): 60/40 horizontal split (image left, content right)
 * - Mobile (< 768px): Vertical layout (image top, content bottom)
 * 
 * Memoized to prevent unnecessary re-renders during scroll animations (Requirement 10.5)
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.4, 3.5, 10.1, 10.2, 10.5, 12.1, 12.2, 12.3, 12.4, 12.5
 */
function RoomCard({
  room,
  index,
  transform,
  isDesktop = true,
  reducedMotion = false,
}: RoomCardProps) {
  // Format price according to Requirement 8.3
  const formattedPrice = `From $${room.price}/night`;

  /**
   * Handle link click with scroll position preservation
   * Requirement 12.5 - Maintain scroll position context for browser back button
   */
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Save current scroll position to sessionStorage for restoration on back navigation
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('accommodations_scroll_position', window.scrollY.toString());
        sessionStorage.setItem('accommodations_scroll_timestamp', Date.now().toString());
      } catch (error) {
        console.warn('[RoomCard] Failed to save scroll position:', error);
      }
    }
  };

  // Apply transform styles if provided (for stacking animation)
  // Disable transforms when reduced motion is preferred (Requirement 10.1)
  const transformStyle = transform && !reducedMotion
    ? {
        transform: `scale(${transform.scale}) translateY(${transform.translateY}px)`,
        zIndex: transform.zIndex,
        opacity: transform.opacity,
      }
    : undefined;

  return (
    <article
      className={`${styles.roomCard} ${reducedMotion ? styles.reducedMotion : ''}`}
      style={transformStyle}
      data-room-id={room.id}
      data-index={index}
      aria-labelledby={`room-name-${room.id}`}
      aria-describedby={`room-description-${room.id}`}
      tabIndex={0}
      role="article"
    >
      {/* Image Section - 60% on desktop, 50% on mobile */}
      <div className={styles.imageSection} role="img" aria-label={room.imageAlt}>
        <OptimizedImage
          src={room.imageUrl}
          alt={room.imageAlt}
          width={1200}
          height={800}
          imageType="content"
          className={styles.roomImage}
          lazyLoadThreshold={500}
          onError={(e) => {
            // Fallback image on error (Requirement 6.4)
            console.error(`[RoomCard] Failed to load image for room: ${room.id}`, {
              url: room.imageUrl,
              roomName: room.name
            });
            const target = e.currentTarget as HTMLImageElement;
            // Try fallback image
            if (!target.src.includes('fallback-room.jpg')) {
              target.src = '/images/fallback-room.jpg';
            } else {
              // If fallback also fails, use a data URI placeholder
              console.error('[RoomCard] Fallback image also failed, using placeholder');
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"%3E%3Crect fill="%23e8d5b7" width="1200" height="800"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%235a6c7d"%3EImage Unavailable%3C/text%3E%3C/svg%3E';
            }
          }}
        />
      </div>

      {/* Content Section - 40% on desktop, 50% on mobile */}
      <div className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          {/* Room Name - Requirement 8.1 */}
          <h3 id={`room-name-${room.id}`} className={styles.roomName}>
            {room.name}
          </h3>

          {/* Room Tagline - Requirement 8.2 */}
          <p id={`room-description-${room.id}`} className={styles.roomTagline}>
            {room.tagline}
          </p>

          {/* Price - Requirement 8.3 */}
          <p className={styles.roomPrice} aria-label={`Price: ${formattedPrice}`}>
            {formattedPrice}
          </p>

          {/* Room Details - Size and Capacity - Requirement 8.4 */}
          <div className={styles.roomDetails} role="list" aria-label="Room specifications">
            <div className={styles.detailItem} role="listitem">
              <svg
                className={styles.detailIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="2" y="2" width="16" height="16" stroke="currentColor" strokeWidth="2" />
                <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" />
                <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span aria-label={`Room size: ${room.size} square meters`}>{room.size} m²</span>
            </div>
            <div className={styles.detailItem} role="listitem">
              <svg
                className={styles.detailIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M4 18C4 14.6863 6.68629 12 10 12C13.3137 12 16 14.6863 16 18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span aria-label={`Guest capacity: ${room.capacity} ${room.capacity === 1 ? 'guest' : 'guests'}`}>
                {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}
              </span>
            </div>
          </div>

          {/* Features List - Requirement 8.5 */}
          <ul className={styles.featuresList} aria-label="Room features and amenities">
            {room.features.map((feature, idx) => (
              <li key={idx} className={styles.featureItem}>
                <svg
                  className={styles.checkIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Learn More Link - Requirements 12.3, 12.5 */}
          <a
            href={`/accommodations/${room.id}`}
            className={styles.learnMoreLink}
            onClick={handleLinkClick}
            aria-label={`Learn more about ${room.name} - Opens detailed room information page`}
          >
            Learn More
            <svg
              className={styles.arrowIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Memoize RoomCard to prevent unnecessary re-renders during scroll animations
 * Only re-render when room data, transform values, or viewport size changes
 * Requirement 10.5 - Performance optimization with React.memo
 */
export default React.memo(RoomCard, (prevProps, nextProps) => {
  // Compare room data (shallow comparison is sufficient as room objects are immutable)
  if (prevProps.room !== nextProps.room) return false;
  
  // Compare index
  if (prevProps.index !== nextProps.index) return false;
  
  // Compare isDesktop flag
  if (prevProps.isDesktop !== nextProps.isDesktop) return false;
  
  // Compare reducedMotion flag
  if (prevProps.reducedMotion !== nextProps.reducedMotion) return false;
  
  // Compare transform values (deep comparison needed)
  if (prevProps.transform !== nextProps.transform) {
    // If both are undefined, they're equal
    if (!prevProps.transform && !nextProps.transform) return true;
    
    // If one is undefined and the other isn't, they're different
    if (!prevProps.transform || !nextProps.transform) return false;
    
    // Compare transform properties
    if (
      prevProps.transform.scale !== nextProps.transform.scale ||
      prevProps.transform.translateY !== nextProps.transform.translateY ||
      prevProps.transform.zIndex !== nextProps.transform.zIndex ||
      prevProps.transform.opacity !== nextProps.transform.opacity
    ) {
      return false;
    }
  }
  
  // All props are equal, skip re-render
  return true;
});

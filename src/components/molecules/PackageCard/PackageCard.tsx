'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRipple } from '@/hooks/useRipple';
import styles from './PackageCard.module.css';

export interface PackageCardProps {
  /**
   * Title of the package
   */
  title: string;
  /**
   * Duration of the package
   */
  duration: string;
  /**
   * Price of the package
   */
  price: string;
  /**
   * List of items included in the package
   */
  includes: string[];
  /**
   * Background image URL for the card
   */
  image?: string;
  /**
   * Alt text for the background image
   */
  imageAlt?: string;
  /**
   * Callback function when Reserve button is clicked
   */
  onReserve?: () => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * PackageCard component displays wellness packages with
 * immersive gradient overlay design inspired by modern travel cards
 */
export default function PackageCard({
  title,
  duration,
  price,
  includes,
  image,
  imageAlt = '',
  onReserve,
  className = '',
}: PackageCardProps) {
  const { ripples, createRipple } = useRipple();
  const router = useRouter();

  const handleReserveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onReserve) {
      onReserve();
    } else {
      // Default behavior: navigate to contact/booking page
      router.push('/contact?package=' + encodeURIComponent(title));
    }
  };

  return (
    <div className={`${styles.card} ${className}`} onClick={createRipple}>
      {/* Background image */}
      {image && (
        <div 
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={imageAlt || title}
        />
      )}
      
      {/* Fade overlay - starts halfway through the card */}
      <div className={styles.fadeOverlay} aria-hidden="true" />
      
      {/* Content container - positioned where fade begins */}
      <div className={styles.content}>
        {/* Header with title and price badge */}
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.priceBadge}>{price}</div>
        </div>

        {/* Duration badge */}
        <div className={styles.durationBadge}>{duration}</div>

        {/* Includes as feature tags */}
        <div className={styles.featuresContainer}>
          {includes.map((item, index) => (
            <div key={index} className={styles.featureTag}>
              <span className={styles.checkmark}>✓</span>
              <span className={styles.featureText}>{item}</span>
            </div>
          ))}
        </div>

        {/* Reserve button */}
        <button 
          className={styles.reserveButton}
          onClick={handleReserveClick}
          type="button"
        >
          Reserve
        </button>
      </div>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
}

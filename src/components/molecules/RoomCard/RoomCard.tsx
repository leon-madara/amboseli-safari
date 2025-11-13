'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import { motion } from 'framer-motion';
import QuickBookingModal from '@/components/molecules/QuickBookingModal';
import styles from './RoomCard.module.css';

export interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  capacity: number;
  size: string;
  price: string;
  features: string[];
  slug: string;
  // New trust & conversion props
  rating?: number;
  reviewCount?: number;
  availability?: 'available' | 'limited' | 'sold-out';
  recentlyBooked?: boolean;
  specialOffer?: string;
  includedItems?: string[];
}

export default function RoomCard({
  title,
  description,
  image,
  imageAlt,
  capacity,
  size,
  price,
  features,
  slug,
  rating = 4.8,
  reviewCount = 127,
  availability = 'available',
  recentlyBooked = false,
  specialOffer,
  includedItems = ['Breakfast', '2 game drives', 'Park fees', 'Airport transfer'],
}: RoomCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <motion.article
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <Link href={`/accommodations/${slug}`} className={styles.imageLink}>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.overlay} />

            {/* Trust & Urgency Badges */}
            <div className={styles.badgeContainer}>
              {availability === 'limited' && (
                <span className={`${styles.badge} ${styles.badgeLimited}`}>
                  ⚠️ Only 2 rooms left
                </span>
              )}
              {recentlyBooked && (
                <span className={`${styles.badge} ${styles.badgeHot}`}>
                  🔥 Booked 3 times today
                </span>
              )}
              {specialOffer && (
                <span className={`${styles.badge} ${styles.badgeOffer}`}>
                  💰 {specialOffer}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{title}</h3>
              {rating && (
                <div className={styles.rating}>
                  <span className={styles.ratingValue}>⭐ {rating}</span>
                  <span className={styles.reviewCount}>({reviewCount})</span>
                </div>
              )}
            </div>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{capacity} {capacity === 1 ? 'Guest' : 'Guests'}</span>
            </div>

            <div className={styles.detailItem}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>{size}</span>
            </div>
          </div>

          <ul className={styles.features}>
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className={styles.feature}>
                <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {/* Value Proposition */}
          {includedItems && includedItems.length > 0 && (
            <div className={styles.includedSection}>
              <p className={styles.includedLabel}>Included:</p>
              <div className={styles.includedItems}>
                {includedItems.map((item, index) => (
                  <span key={index} className={styles.includedItem}>
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <div className={styles.pricing}>
              <span className={styles.priceLabel}>From</span>
              <span className={styles.price}>{price}</span>
              <span className={styles.pricePeriod}>per night</span>
            </div>

            <div className={styles.ctaGroup}>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className={styles.primaryCTA}
                disabled={availability === 'sold-out'}
              >
                {availability === 'sold-out' ? 'Sold Out' : 'Check Availability'}
              </button>
              <Link href={`/accommodations/${slug}`} className={styles.secondaryCTA}>
                View Details
              </Link>
            </div>
          </div>

          {/* Trust Signals */}
          <div className={styles.trustSignals}>
            <span>✓ Free cancellation</span>
            <span>✓ Best price guarantee</span>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className={styles.mobileStickyBar}>
          <div className={styles.mobileQuickInfo}>
            <span className={styles.mobilePrice}>{price}/night</span>
            <span
              className={`${styles.mobileAvailability} ${
                availability === 'limited' ? styles.mobileAvailabilityLimited : ''
              }`}
            >
              {availability === 'available' && '✓ Available'}
              {availability === 'limited' && '⚠️ Limited'}
              {availability === 'sold-out' && '✗ Sold Out'}
            </span>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className={styles.mobileBookButton}
            disabled={availability === 'sold-out'}
          >
            {availability === 'sold-out' ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </motion.article>

      {/* Quick Booking Modal */}
      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        roomTitle={title}
        roomPrice={price}
        roomId={slug}
      />
    </>
  );
}

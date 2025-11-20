'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import QuickBookingModal from '@/components/molecules/QuickBookingModal';
import ImageCarousel from '@/components/molecules/ImageCarousel';
import AvailabilityCalendar from '@/components/molecules/AvailabilityCalendar';
import VirtualTourModal from '@/components/molecules/VirtualTourModal';
import OfferTimer from '@/components/atoms/OfferTimer';
import WishlistButton from '@/components/atoms/WishlistButton';
import ShareButton from '@/components/atoms/ShareButton';
import styles from './RoomCard.module.css';

export interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  images?: string[]; // Multiple images for carousel
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
  // Comparison props
  isComparing?: boolean;
  onCompareToggle?: (slug: string, isSelected: boolean) => void;
  // Phase 2: Pricing context & social proof
  avgPrice?: string;
  priceSavings?: string;
  priceTrend?: 'rising' | 'falling' | 'stable';
  viewingCount?: number;
  lastBookedMinutes?: number;
  // Phase 3: Advanced features
  tourImages?: string[];
  offerExpiresAt?: Date;
}

export default function RoomCard({
  title,
  description,
  image,
  imageAlt,
  images,
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
  isComparing = false,
  onCompareToggle,
  avgPrice,
  priceSavings,
  priceTrend,
  viewingCount,
  lastBookedMinutes,
  tourImages,
  offerExpiresAt,
}: RoomCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);

  const displayedFeatures = isFeaturesExpanded ? features : features.slice(0, 4);
  const hasMoreFeatures = features.length > 4;

  // Use carousel if multiple images provided, otherwise single image
  const roomImages = images && images.length > 0 ? images : [image];
  const hasMultipleImages = roomImages.length > 1;

  return (
    <>
      <article className={styles.card}>
        <Link href={`/accommodations/${slug}`} className={styles.imageLink}>
          <div className={styles.imageContainer}>
            {hasMultipleImages ? (
              <ImageCarousel images={roomImages} alt={title} />
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}

            {/* Category & Availability Badges */}
            <div className={styles.badgeContainer}>
              <span className={`${styles.badge} ${styles.badgeCategory}`}>
                Luxury Room
              </span>
              {availability === 'limited' && (
                <span className={`${styles.badge} ${styles.badgeLimited}`}>
                  Limited Availability
                </span>
              )}
            </div>

            {/* Compare Checkbox */}
            {onCompareToggle && (
              <label className={styles.compareCheckbox}>
                <input
                  type="checkbox"
                  checked={isComparing}
                  onChange={(e) => onCompareToggle(slug, e.target.checked)}
                  aria-label={`Compare ${title}`}
                />
                <span className={styles.compareLabel}>Compare</span>
              </label>
            )}

            {/* Virtual Tour Button */}
            {tourImages && tourImages.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowTourModal(true);
                }}
                className={styles.tourButton}
                aria-label="View 360° virtual tour"
              >
                🔄 Virtual Tour
              </button>
            )}

            {/* Wishlist & Share Actions */}
            <div className={styles.actionButtons}>
              <WishlistButton roomSlug={slug} roomTitle={title} variant="icon" />
              <ShareButton
                roomSlug={slug}
                roomTitle={title}
                roomDescription={description}
                roomImage={image}
                variant="icon"
              />
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
          </div>

          {/* Offer Timer */}
          {offerExpiresAt && (
            <OfferTimer
              expiresAt={offerExpiresAt}
              offerText={specialOffer || 'Special Offer Ends In'}
            />
          )}

          {/* Price moved up for better hierarchy */}
          <div className={styles.pricingTop}>
            <div className={styles.pricingMain}>
              <span className={styles.priceLabel}>From</span>
              <span className={styles.price}>{price}</span>
              <span className={styles.pricePeriod}>per night</span>
            </div>

            {/* Pricing Context */}
            {(priceSavings || avgPrice || priceTrend) && (
              <div className={styles.pricingContext}>
                {priceSavings && (
                  <span className={styles.savings}>💰 Save {priceSavings}</span>
                )}
                {avgPrice && (
                  <span className={styles.avgPrice}>Avg: {avgPrice}</span>
                )}
                {priceTrend === 'rising' && (
                  <span className={styles.trendRising}>📈 Prices rising</span>
                )}
                {priceTrend === 'falling' && (
                  <span className={styles.trendFalling}>📉 Prices falling</span>
                )}
              </div>
            )}

            {/* Availability Calendar Toggle */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={styles.calendarToggle}
            >
              📅 Check Dates
              {availability === 'limited' && <span className={styles.urgencyDot} />}
            </button>
          </div>

          {/* Availability Calendar */}
          {showCalendar && (
            <div className={styles.calendarContainer}>
              <AvailabilityCalendar availability={availability} />
            </div>
          )}

          {/* Social Proof - Simplified */}
          {viewingCount && viewingCount > 0 && (
            <div className={styles.socialProof}>
              <div className={styles.viewingInfo}>
                <span>{viewingCount} {viewingCount === 1 ? 'guest' : 'guests'} viewing now</span>
              </div>
            </div>
          )}

          <p className={styles.description}>{description}</p>

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

          <div className={styles.featuresSection}>
            <ul className={styles.features}>
              {displayedFeatures.map((feature, index) => (
                <li key={index} className={styles.feature}>
                  <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {hasMoreFeatures && (
              <button
                onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                className={styles.expandButton}
              >
                {isFeaturesExpanded
                  ? 'Show less'
                  : `+${features.length - 4} more amenities`
                }
              </button>
            )}
          </div>

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
      </article>

      {/* Quick Booking Modal */}
      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        roomTitle={title}
        roomPrice={price}
        roomId={slug}
      />

      {/* Virtual Tour Modal */}
      {tourImages && tourImages.length > 0 && (
        <VirtualTourModal
          isOpen={showTourModal}
          onClose={() => setShowTourModal(false)}
          roomTitle={title}
          tourImages={tourImages}
        />
      )}
    </>
  );
}

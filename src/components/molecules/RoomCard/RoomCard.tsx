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
  // Phase 3: Advanced features
  tourImages?: string[];
  // View mode
  viewMode?: 'grid' | 'list';
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
  tourImages,
  viewMode = 'grid',
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
      <article className={`${styles.card} ${viewMode === 'list' ? styles.listView : ''}`}>
        <Link href={`/accommodations/${slug}`} className={styles.imageLink}>
          <div className={styles.imageContainer}>
            {/* Compare Checkbox - Moved Top Left */}
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

            {/* Wishlist & Share Actions - Top Right */}
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

            {hasMultipleImages ? (
              <ImageCarousel images={roomImages} alt={title} />
            ) : (
              <>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.overlay} />
              </>
            )}

            {/* Virtual Tour Button - Bottom Left */}
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

            {/* Price Overlay Badge */}
            <div className={styles.priceBadge}>
              <span className={styles.badgeLabel}>From</span>
              <span className={styles.badgePrice}>{price}</span>
              <span className={styles.badgePeriod}>/night</span>
            </div>
          </div>
        </Link>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Luxury Collection</span>
          
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{title}</h3>
              {rating && (
                <div className={styles.rating}>
                  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14, color: '#F59E0B' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className={styles.ratingValue}>{rating}</span>
                  <span className={styles.reviewCount}>({reviewCount})</span>
                </div>
              )}
            </div>
          </div>

          {/* List View Price Section - Only visible in list mode */}
          <div className={styles.listPriceSection}>
            <span className={styles.listPriceLabel}>From</span>
            <span className={styles.listPrice}>{price}</span>
            <span className={styles.listPricePeriod}>/night</span>
          </div>

          <div className={styles.specsRow}>
            <div className={styles.specItem}>
              <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{capacity} {capacity === 1 ? 'Guest' : 'Guests'}</span>
            </div>
            <div className={styles.specItem}>
              <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
              </svg>
              <span>{size}</span>
            </div>
          </div>

          <p className={styles.description}>{description}</p>

          <div className={styles.featuresList}>
            {features.slice(0, 3).map((feature, index) => (
              <span key={index} className={styles.featureTag}>
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className={styles.featureTag}>+{features.length - 3} more</span>
            )}
          </div>

          {/* Value Proposition */}
          {includedItems && includedItems.length > 0 && (
            <div className={styles.includedSection}>
              <p className={styles.includedLabel}>Included:</p>
              <div className={styles.includedItems}>
                {includedItems.slice(0, 3).map((item, index) => (
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
                {availability === 'sold-out' ? 'Sold Out' : 'Check Dates'}
              </button>
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
              className={`${styles.mobileAvailability} ${availability === 'limited' ? styles.mobileAvailabilityLimited : ''
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

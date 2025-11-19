'use client';

import { useRef, useMemo, useEffect } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { accommodationRooms, RoomData, validateRoomData } from '@/data/accommodationRooms';
import { useStackingCards } from './useStackingCards';
import RoomCard from './RoomCard';
import styles from './AccommodationsChapter.module.css';

/**
 * Helper function to get detailed validation issues for a room
 * Used for debugging invalid room data
 */
function getValidationIssues(room: any): string[] {
  const issues: string[] = [];
  
  if (!room.id || typeof room.id !== 'string') issues.push('Invalid or missing id');
  if (!room.name || typeof room.name !== 'string') issues.push('Invalid or missing name');
  if (!room.tagline || typeof room.tagline !== 'string') issues.push('Invalid or missing tagline');
  if (!room.imageUrl || typeof room.imageUrl !== 'string') issues.push('Invalid or missing imageUrl');
  if (!room.imageAlt || typeof room.imageAlt !== 'string') issues.push('Invalid or missing imageAlt');
  if (typeof room.price !== 'number' || room.price <= 0) issues.push('Invalid price (must be positive number)');
  if (typeof room.size !== 'number' || room.size <= 0) issues.push('Invalid size (must be positive number)');
  if (typeof room.capacity !== 'number' || room.capacity <= 0) issues.push('Invalid capacity (must be positive number)');
  if (!Array.isArray(room.features)) issues.push('Features must be an array');
  else if (room.features.length < 4 || room.features.length > 6) issues.push('Features must have 4-6 items');
  
  return issues;
}

export interface AccommodationsChapterProps extends BaseChapterProps {
  rooms?: RoomData[];
  ctaButton?: CTAButton;
}

/**
 * AccommodationsChapter Component
 * 
 * Main container component that orchestrates the stacking cards animation.
 * Displays four luxury room types with scroll-driven stacking effect.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 11.1, 11.2, 11.3, 11.4, 11.5
 */
export default function AccommodationsChapter({
  id,
  className = '',
  rooms = accommodationRooms,
  ctaButton = {
    text: 'View All Rooms',
    href: '/accommodations',
    variant: 'primary',
  },
}: AccommodationsChapterProps) {
  // Refs for container and individual cards
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  // Validate and filter room data (Requirement 6.4)
  const validRooms = useMemo(() => {
    try {
      const filtered = rooms.filter(validateRoomData);
      const invalidCount = rooms.length - filtered.length;
      
      if (invalidCount > 0) {
        console.warn(
          `[AccommodationsChapter] ${invalidCount} invalid room(s) filtered out. ` +
          `Valid rooms: ${filtered.length}/${rooms.length}`
        );
        
        // Log details of invalid rooms for debugging
        const invalidRooms = rooms.filter(room => !validateRoomData(room));
        invalidRooms.forEach(room => {
          console.error('[AccommodationsChapter] Invalid room data:', {
            id: room.id || 'missing',
            name: room.name || 'missing',
            issues: getValidationIssues(room)
          });
        });
      }
      
      // Ensure we have at least one valid room
      if (filtered.length === 0) {
        console.error('[AccommodationsChapter] No valid rooms available. Using fallback data.');
        // Return a minimal fallback room to prevent complete failure
        return [{
          id: 'fallback-room',
          name: 'Luxury Room',
          tagline: 'Experience safari luxury',
          price: 250,
          size: 50,
          capacity: 2,
          features: ['King bed', 'Private veranda', 'Shower', 'Wi-Fi'],
          imageUrl: '/images/fallback-room.jpg',
          imageAlt: 'Luxury safari accommodation'
        }];
      }
      
      return filtered;
    } catch (error) {
      console.error('[AccommodationsChapter] Error validating room data:', error);
      // Return empty array on error - component will handle gracefully
      return [];
    }
  }, [rooms]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Initialize stacking cards hook (Requirements 5.1, 5.2, 5.3, 5.4, 5.5)
  const { transforms, isInViewport, isSimplifiedMode } = useStackingCards({
    cardRefs: cardRefs.current.map(ref => ({ current: ref })),
    containerRef,
    enabled: !prefersReducedMotion,
  });

  // Check if desktop viewport (>= 768px)
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;

  // Log simplified mode activation for debugging
  useEffect(() => {
    if (isSimplifiedMode) {
      console.info('[AccommodationsChapter] Simplified animation mode activated for better performance');
    }
  }, [isSimplifiedMode]);

  // Fade-in transition and emit custom event when chapter becomes active (Requirements 11.2, 11.5)
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create Intersection Observer for fade-in and event emission
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class for fade-in (Requirement 11.2)
            entry.target.classList.add(styles.visible);
            
            // Emit custom event when chapter becomes active (Requirement 11.5)
            const event = new CustomEvent('chapterActive', {
              detail: {
                chapterId: id,
                chapterName: 'accommodations',
                timestamp: Date.now(),
              },
              bubbles: true,
              composed: true,
            });
            
            // Dispatch event from the section element
            entry.target.dispatchEvent(event);
            
            console.info('[AccommodationsChapter] Chapter became active, event emitted');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -25% 0px', // Start fade-in when chapter is 25% into viewport
        threshold: 0.1, // Trigger when 10% visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [id]);

  // Restore scroll position on back navigation (Requirement 12.5)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedPosition = sessionStorage.getItem('accommodations_scroll_position');
      const savedTimestamp = sessionStorage.getItem('accommodations_scroll_timestamp');

      if (savedPosition && savedTimestamp) {
        const timestamp = parseInt(savedTimestamp, 10);
        const now = Date.now();
        
        // Only restore if saved within last 5 minutes (prevents stale data)
        if (now - timestamp < 5 * 60 * 1000) {
          const position = parseInt(savedPosition, 10);
          
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            window.scrollTo({
              top: position,
              behavior: 'auto', // Instant scroll for back navigation
            });
            
            console.info('[AccommodationsChapter] Restored scroll position:', position);
          });
        }
        
        // Clear the saved position after restoration
        sessionStorage.removeItem('accommodations_scroll_position');
        sessionStorage.removeItem('accommodations_scroll_timestamp');
      }
    } catch (error) {
      console.warn('[AccommodationsChapter] Failed to restore scroll position:', error);
    }
  }, []); // Run only once on mount

  // Handle case where no valid rooms are available
  if (validRooms.length === 0) {
    console.error('[AccommodationsChapter] No valid rooms to display');
    return (
      <section
        id={id}
        ref={containerRef}
        className={`${styles.accommodationsChapter} ${className}`}
        data-chapter="accommodations"
        aria-labelledby="accommodations-heading"
      >
        <div className={styles.errorContainer}>
          <h2 id="accommodations-heading" className={styles.heading}>
            Accommodations
          </h2>
          <p className={styles.errorMessage}>
            We&apos;re currently updating our room information. Please check back soon or contact us directly.
          </p>
          <a href="/contact" className={styles.cta}>
            Contact Us
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={containerRef}
      className={`${styles.accommodationsChapter} ${className} ${prefersReducedMotion ? styles.reducedMotion : ''} ${isSimplifiedMode ? styles.simplifiedMode : ''}`}
      data-chapter="accommodations"
      data-simplified-mode={isSimplifiedMode}
      aria-labelledby="accommodations-heading"
      aria-describedby="accommodations-description"
    >
      {/* Skip Link for Keyboard Navigation (Requirement 10.2) */}
      <a href="#accommodations-cta" className={styles.skipLink}>
        Skip to accommodations booking
      </a>

      {/* Background with midday gradient (Requirement 11.3) */}
      <div className={styles.backgroundContainer} aria-hidden="true">
        <div className={styles.gradientOverlay} />
      </div>

      {/* Intro Heading and Subtitle - 100vh section (Requirement 4.1) */}
      <header className={styles.headingContainer}>
        <h2 id="accommodations-heading" className={styles.heading}>
          Your Safari Sanctuary
        </h2>
        <p id="accommodations-description" className={styles.subtitle}>
          Four levels of luxury, each with its own story
        </p>
      </header>

      {/* Rooms Container with Stacking Cards (Requirements 4.2, 4.3, 4.4) */}
      <ul className={styles.cardsWrapper} aria-label="Available room types">
        {validRooms.map((room, index) => (
          <li
            key={room.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={styles.cardContainer}
          >
            <RoomCard
              room={room}
              index={index}
              transform={prefersReducedMotion || isSimplifiedMode ? undefined : transforms[index]}
              isDesktop={isDesktop}
              reducedMotion={prefersReducedMotion || isSimplifiedMode}
            />
          </li>
        ))}
      </ul>

      {/* CTA Button at the end (Requirement 4.5) */}
      <nav className={styles.ctaContainer} aria-label="Accommodations actions">
        <a
          id="accommodations-cta"
          href={ctaButton.href}
          className={`${styles.cta} ${styles[`cta${ctaButton.variant.charAt(0).toUpperCase() + ctaButton.variant.slice(1)}`]}`}
          aria-label={`${ctaButton.text} - View detailed information about all available rooms`}
        >
          {ctaButton.text}
        </a>
      </nav>
    </section>
  );
}

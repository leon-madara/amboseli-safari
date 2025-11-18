'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import styles from './MorningDriveChapter.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Interface for image transform calculations
 */
interface ImageTransform {
  scale: number;  // Scale factor to grow image to target size
  x: number;      // X translation in pixels to center horizontally
  y: number;      // Y translation in pixels to center vertically
}

/**
 * Calculate the transform values needed to grow and center the safari image
 * 
 * @param imageRect - The current bounding rectangle of the image element
 * @param viewportWidth - Current viewport width in pixels
 * @param viewportHeight - Current viewport height in pixels
 * @returns ImageTransform object with scale, x, and y values
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 7.1
 */
function calculateImageTransform(
  imageRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): ImageTransform {
  // Original image width (as defined in the component)
  const imageStartWidth = 400;
  
  // Determine target width based on viewport size
  // Mobile (< 768px): 90% of viewport width
  // Desktop (>= 768px): 80% of viewport width
  const isMobile = viewportWidth < 768;
  const targetWidthPercentage = isMobile ? 0.9 : 0.8;
  const targetWidth = viewportWidth * targetWidthPercentage;
  
  // Calculate scale factor to grow image from original size to target size
  const targetScale = targetWidth / imageStartWidth;
  
  // Calculate current image center position
  const imageCenterX = imageRect.left + imageRect.width / 2;
  const imageCenterY = imageRect.top + imageRect.height / 2;
  
  // Calculate viewport center position
  const viewportCenterX = viewportWidth / 2;
  const viewportCenterY = viewportHeight / 2;
  
  // Calculate translation needed to move image center to viewport center
  // This compensates for the image's current position and centers it
  const translateX = viewportCenterX - imageCenterX;
  const translateY = viewportCenterY - imageCenterY;
  
  return {
    scale: targetScale,
    x: translateX,
    y: translateY
  };
}

export interface MorningDriveChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  midgroundImage?: string;
  ctaButton?: CTAButton;
}

export default function MorningDriveChapter({
  id,
  className = '',
  midgroundImage = '/images/wildlife/lionPride.png',
  ctaButton = {
    text: 'Discover the Wildlife',
    href: '#wildlife-encounters',
    variant: 'primary',
  },
}: MorningDriveChapterProps) {
  // Refs for GSAP animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const animatedOverlayRef = useRef<HTMLDivElement>(null);
  
  // Viewport width state for responsive behavior
  // Requirements: 7.1, 7.2
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  // Accessibility: aria-live region for screen reader announcements
  // Requirement: 7.5
  const ariaLiveRef = useRef<HTMLDivElement>(null);
  const [ariaMessage, setAriaMessage] = useState<string>('');

  // Resize handler with debouncing
  // Requirements: 7.3, 7.4
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      // Clear existing timeout to debounce
      clearTimeout(resizeTimeout);
      
      // Set new timeout to update viewport width and refresh ScrollTrigger
      resizeTimeout = setTimeout(() => {
        setViewportWidth(window.innerWidth);
        
        // Refresh all ScrollTrigger instances to recalculate positions
        // This ensures animations work correctly after viewport size changes
        ScrollTrigger.refresh();
      }, 150); // 150ms debounce delay to avoid excessive recalculations
    };
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    // Ensure refs are available
    if (!sectionRef.current) {
      console.error('MorningDrive: Section ref not available');
      return;
    }

    // Accessibility: Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show final state without animations
      if (textCardRef.current) {
        gsap.set(textCardRef.current, { opacity: 0 });
      }

      if (imageContainerRef.current) {
        const imageStartWidth = 400;
        const isMobile = viewportWidth < 768;
        const targetWidthPercentage = isMobile ? 0.9 : 0.8;
        const targetWidth = viewportWidth * targetWidthPercentage;
        const targetScale = targetWidth / imageStartWidth;

        gsap.set(imageContainerRef.current, {
          position: 'fixed',
          top: '50vh',
          left: '50vw',
          x: '-50%',
          y: '-50%',
          scale: targetScale,
          transformOrigin: 'center center',
        });
      }

      if (animatedOverlayRef.current) {
        gsap.set(animatedOverlayRef.current, { opacity: 1 });
      }

      setAriaMessage('Morning Safari Drive content is ready. Image and text are now visible.');
      return;
    }

    // GSAP Context for cleanup
    const ctx = gsap.context(() => {
      // Calculate target scale for image
      const imageStartWidth = 400;
      const isMobile = viewportWidth < 768;
      const targetWidthPercentage = isMobile ? 0.9 : 0.8;
      const targetWidth = viewportWidth * targetWidthPercentage;
      const targetScale = targetWidth / imageStartWidth;

      // Main Pin ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200vh',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;

          // Screen reader announcements
          if (progress > 0 && progress < 0.05) {
            setAriaMessage('Morning Safari Drive section is now in focus.');
          }
          else if (progress > 0.48 && progress < 0.52) {
            setAriaMessage('Safari image is growing and centering.');
          }
          else if (progress > 0.73 && progress < 0.77) {
            setAriaMessage('Safari image is now fully visible and centered.');
          }
          else if (progress > 0.88 && progress < 0.92) {
            setAriaMessage('Inspirational message is now visible: This could be your morning.');
          }
        },
      });

      // Master Timeline - All animations in one
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200vh',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Set initial overlay state
      gsap.set(animatedOverlayRef.current, {
        opacity: 0,
        force3D: true,
      });

      // PHASE 1: Pin & Read (0-50vh) - No animations, just static content

      // PHASE 2: Content Fade (50vh-100vh) - Starts at 25% progress
      if (textCardRef.current) {
        masterTimeline
          .to(textCardRef.current, {
            opacity: 0,
            y: -50,
            duration: 0.25,
            ease: 'power1.inOut',
            force3D: true,
          }, 0.25);
      }

      // Image subtle scale hint during Phase 2
      if (imageContainerRef.current) {
        masterTimeline
          .to(imageContainerRef.current, {
            scale: 1.05,
            opacity: 1,
            duration: 0.25,
            ease: 'power1.inOut',
            transformOrigin: 'center center',
            force3D: true,
          }, 0.25);

        // PHASE 3: Image Growth (100vh-150vh)
        // 3a. Detachment scale bump (100vh-110vh) - Starts at 50% progress
        masterTimeline
          .to(imageContainerRef.current, {
            scale: 1.1,
            duration: 0.05,
            ease: 'power1.out',
          }, 0.5);

        // 3b. Move to center + major growth (110vh-150vh) - Starts at 55% progress
        masterTimeline
          .to(imageContainerRef.current, {
            position: 'fixed',
            top: '50vh',
            left: '50vw',
            x: '-50%',
            y: '-50%',
            scale: targetScale,
            opacity: 1,
            duration: 0.2,
            ease: 'expo.out',
            transformOrigin: 'center center',
            force3D: true,
            willChange: 'transform',
          }, 0.55);
      }

      // PHASE 4: Overlay Reveal (150vh-175vh) - Starts at 75% progress
      if (animatedOverlayRef.current) {
        masterTimeline
          .to(animatedOverlayRef.current, {
            opacity: 1,
            duration: 0.125,
            ease: 'power1.inOut',
            force3D: true,
          }, 0.75);
      }

      // PHASE 5: Section Exit (175vh-200vh)
      // Handled automatically by pin release at 200vh

    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
  }, [viewportWidth]); // Re-run animations when viewport width changes

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.morningDriveChapter} ${className}`}
      data-chapter="morning-drive"
      aria-labelledby="morning-drive-heading"
      tabIndex={-1}
    >
      {/* Accessibility: aria-live region for screen reader announcements */}
      {/* Requirement: 7.5 - Announce key animation points to screen readers */}
      <div
        ref={ariaLiveRef}
        className={styles.srOnly}
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {ariaMessage}
      </div>

      <div className={styles.container}>
        <h2
          id="morning-drive-heading"
          className={styles.heading}
        >
          Morning Safari Drive
        </h2>

        {/* Two-Card Content Wrapper */}
        <div className={styles.contentWrapper}>
          {/* Text Card - Fades out during Phase 2 */}
          <div ref={textCardRef} className={styles.textCard}>
            <h3 className={styles.subHeading}>
              First Light on the Golden Plains
            </h3>
            <p className={styles.description}>
              Experience the magic of dawn as the savanna awakens. Track wildlife across the golden plains
              with Mount Kilimanjaro rising majestically in the distance. This pre-dawn adventure offers an
              intimate glimpse into the bushveld&apos;s most active hours, where predators conclude their nightly
              hunts and herds begin their daily grazing rituals.
            </p>
            <div className={styles.tripDetails}>
              <h4 className={styles.detailsHeading}>Trip Details</h4>
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Distance Covered:</span>
                  <span className={styles.detailValue}>15 KM</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Time of Day:</span>
                  <span className={styles.detailValue}>Pre-dawn departure</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Available From:</span>
                  <span className={styles.detailValue}>December 2025</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>Approximately 3-4 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Card - Stays visible, detaches & grows */}
          <div className={styles.imageCard}>
            <div ref={imageContainerRef} className={styles.imageContainer}>
              <OptimizedImage
                src={midgroundImage}
                alt="A golden savanna at dawn with Mount Kilimanjaro silhouetted in the distance, safari vehicle in the foreground tracking wildlife"
                width={400}
                height={250}
                imageType="content"
                className={styles.image}
              />
            </div>
          </div>
        </div>

        {/* Animated heading overlay - Fades in during Phase 4 */}
        <div ref={animatedOverlayRef} className={styles.animatedHeading}>
          <h3 className={styles.animatedHeadingText}>
            <span className={styles.headingWord1}>This could be</span>{' '}
            <span className={styles.headingWord2}>your morning.</span>{' '}
            <span className={styles.headingWord3}>Exciting.</span>{' '}
            <span className={styles.headingWord4}>Beautiful.</span>{' '}
            <span className={styles.headingWord5}>Captivating.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

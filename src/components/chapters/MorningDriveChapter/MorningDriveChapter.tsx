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
  const fullScreenImageRef = useRef<HTMLDivElement>(null);
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
        const targetWidthPercentage = isMobile ? 0.9 : 0.4;
        const targetWidth = viewportWidth * targetWidthPercentage;
        const targetScale = targetWidth / imageStartWidth;

        gsap.set(imageContainerRef.current, {
          scale: targetScale,
          transformOrigin: 'top left',
        });
      }

      if (animatedOverlayRef.current) {
        gsap.set(animatedOverlayRef.current, {
          opacity: 1,
          left: '10%'
        });
      }

      setAriaMessage('Morning Safari Drive content is ready. Image and text are now visible.');
      return;
    }

    // GSAP Context for cleanup
    const ctx = gsap.context(() => {
      // Calculate target dimensions
      const imageStartWidth = 400;
      const isMobile = viewportWidth < 768;
      // Image grows to 40% viewport width (not 80%)
      const targetWidthPercentage = isMobile ? 0.9 : 0.4;
      const targetWidth = viewportWidth * targetWidthPercentage;
      const targetScale = targetWidth / imageStartWidth;

      // Main Pin ScrollTrigger with manual animation via onUpdate
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=750vh',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;

          // PHASE 1: Pin & Read (0-6.67% = 0-50vh)
          // No animations, content is static

          // PHASE 2: Everything Fades Up & Out (6.67%-13.33% = 50vh-100vh)
          if (progress >= 0.0667 && progress < 0.1333) {
            const fadeProgress = (progress - 0.0667) / 0.0666; // 0 to 1

            // Text card fades up and out
            if (textCardRef.current) {
              textCardRef.current.style.opacity = String(1 - fadeProgress);
              textCardRef.current.style.transform = `translateY(${-100 * fadeProgress}px)`;
            }

            // Small image fades up and out
            if (imageContainerRef.current) {
              imageContainerRef.current.style.opacity = String(1 - fadeProgress);
              imageContainerRef.current.style.transform = `translateY(${-100 * fadeProgress}px)`;
            }
          } else if (progress < 0.0667) {
            // Reset to initial state when scrolling back before fade
            if (textCardRef.current) {
              textCardRef.current.style.opacity = '1';
              textCardRef.current.style.transform = 'translateY(0)';
            }
            if (imageContainerRef.current) {
              imageContainerRef.current.style.opacity = '1';
              imageContainerRef.current.style.transform = 'translateY(0)';
            }
          } else if (progress >= 0.1333) {
            // Keep faded out after phase completes
            if (textCardRef.current) {
              textCardRef.current.style.opacity = '0';
              textCardRef.current.style.transform = 'translateY(-100px)';
            }
            if (imageContainerRef.current) {
              imageContainerRef.current.style.opacity = '0';
              imageContainerRef.current.style.transform = 'translateY(-100px)';
            }
          }

          // PHASE 3: Full-Screen Image Slides In (12%-72% = 90vh-540vh)
          // Now 450vh duration (1.5x slower) - starts when fade is 80% complete
          if (progress >= 0.12 && progress < 0.72) {
            const slideProgress = (progress - 0.12) / 0.6; // 0 to 1
            // Use power-6 easing for extremely smooth, luxurious slide
            const easedSlide = 1 - Math.pow(1 - slideProgress, 6);

            if (fullScreenImageRef.current) {
              fullScreenImageRef.current.style.transform = `translateX(${-100 + (100 * easedSlide)}%)`;
              fullScreenImageRef.current.style.opacity = '1';
            }
          } else if (progress < 0.12) {
            // Reset to off-screen when scrolling back before slide
            if (fullScreenImageRef.current) {
              fullScreenImageRef.current.style.transform = 'translateX(-100%)';
              fullScreenImageRef.current.style.opacity = '0';
            }
          } else if (progress >= 0.72) {
            // Keep fully visible after slide completes
            if (fullScreenImageRef.current) {
              fullScreenImageRef.current.style.transform = 'translateX(0%)';
              fullScreenImageRef.current.style.opacity = '1';
            }
          }

          // PHASE 4: Pause Before Text (72%-76% = 540vh-570vh)
          // Full-screen image visible, no text yet

          // PHASE 5: Text Overlay Appears (76%-80% = 570vh-600vh)
          if (progress >= 0.76 && progress < 0.80) {
            const textProgress = (progress - 0.76) / 0.04; // 0 to 1
            const easedText = 1 - Math.pow(1 - textProgress, 3);

            if (animatedOverlayRef.current) {
              animatedOverlayRef.current.style.opacity = String(easedText);
            }
          } else if (progress < 0.76) {
            // Keep hidden when scrolling back before text appears
            if (animatedOverlayRef.current) {
              animatedOverlayRef.current.style.opacity = '0';
            }
          } else if (progress >= 0.80) {
            // Keep fully visible after text fade completes
            if (animatedOverlayRef.current) {
              animatedOverlayRef.current.style.opacity = '1';
            }
          }

          // PHASE 6: Hold for Reading (80%-93.33% = 600vh-700vh)
          // Everything stays visible and static

          // PHASE 7: Exit (93.33%-100% = 700vh-750vh)
          // No animations, just unpinning

          // Screen reader announcements
          if (progress > 0 && progress < 0.03) {
            setAriaMessage('Morning Safari Drive section is now in focus.');
          }
          else if (progress > 0.06 && progress < 0.09) {
            setAriaMessage('Content is fading away.');
          }
          else if (progress > 0.11 && progress < 0.14) {
            setAriaMessage('Full safari scene is slowly appearing with Mount Kilimanjaro and elephants.');
          }
          else if (progress > 0.75 && progress < 0.78) {
            setAriaMessage('Inspirational message is appearing: This could be your morning.');
          }
        },
      });

      // Set initial states
      if (fullScreenImageRef.current) {
        fullScreenImageRef.current.style.opacity = '0';
        fullScreenImageRef.current.style.transform = 'translateX(-100%)';
      }

      if (animatedOverlayRef.current) {
        animatedOverlayRef.current.style.opacity = '0';
      }

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

        {/* Full-screen safari image - slides in from left */}
        <div ref={fullScreenImageRef} className={styles.fullScreenImage}>
          <OptimizedImage
            src="/images/experiences/game-drive/yourMorning.png"
            alt="Elephants at sunrise with Mount Kilimanjaro in background, viewed from inside a safari vehicle"
            width={1920}
            height={1080}
            imageType="hero"
            priority
            className={styles.fullScreenImageElement}
          />
        </div>

        {/* Text overlay - appears at top after full-screen image */}
        <div ref={animatedOverlayRef} className={styles.animatedHeading}>
          <h3 className={styles.animatedHeadingText}>
            <span className={styles.textLine1}>This could be your morning</span>
            <span className={styles.textLine2}>Exciting. Beautiful. Captivating.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const fullScreenImageRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLSpanElement>(null);
  const textLine2Word1Ref = useRef<HTMLSpanElement>(null);
  const textLine2Word2Ref = useRef<HTMLSpanElement>(null);
  const textLine2Word3Ref = useRef<HTMLSpanElement>(null);
  
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
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0 });
      }
      if (contentWrapperRef.current) {
        gsap.set(contentWrapperRef.current, { opacity: 0 });
      }

      if (textLine1Ref.current) {
        gsap.set(textLine1Ref.current, { opacity: 1 });
      }
      if (textLine2Word1Ref.current) {
        gsap.set(textLine2Word1Ref.current, { opacity: 1 });
      }
      if (textLine2Word2Ref.current) {
        gsap.set(textLine2Word2Ref.current, { opacity: 1 });
      }
      if (textLine2Word3Ref.current) {
        gsap.set(textLine2Word3Ref.current, { opacity: 1 });
      }

      setAriaMessage('Morning Safari Drive content is ready. Image and text are now visible.');
      return;
    }

    // GSAP Context for cleanup
    const ctx = gsap.context(() => {

      // Main Pin ScrollTrigger with manual animation via onUpdate
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1200vh',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
        onUpdate: (self) => {
          // Defensive: Ensure progress is always a valid number between 0 and 1
          const progress = Math.max(0, Math.min(1, self.progress ?? 0));

          // PHASE 1: Pin & Read (0-12.5% = 0-150vh)
          // Entire scene stays static during the first 150vh of scroll after pin

          const animationStart = 0.125; // 150vh / 1200vh
          const fadeStart = animationStart; // fade begins after 150vh dwell
          const fadeEnd = 0.1667;        // 200vh / 1200vh
          const mainSlideStart = fadeEnd;
          const mainSlideEnd = 0.8417;  // 1010vh / 1200vh

          const clamp = (value: number, min = 0, max = 1) =>
            Math.max(min, Math.min(max, value));

          const setImageState = (
            translateXPercent: number,
            scaleValue: number,
            opacityValue: number
          ) => {
            if (!fullScreenImageRef.current) return;
            fullScreenImageRef.current.style.transform = `translateX(${translateXPercent}%) scale(${scaleValue})`;
            fullScreenImageRef.current.style.opacity = String(opacityValue);
          };

          // PHASE 2: Heading and Content Card Fade Up & Out (8.33%-12.5% = 100vh-150vh)
          // Heading and entire card (text + image) fade as one unit
          if (progress >= fadeStart && progress < fadeEnd) {
            // Calculate fade progress with defensive bounds checking
            const fadeProgress = clamp((progress - fadeStart) / (fadeEnd - fadeStart));

            // Heading fades up and out
            if (headingRef.current) {
              headingRef.current.style.opacity = String(Math.max(0, 1 - fadeProgress));
              headingRef.current.style.transform = `translateY(${-50 * fadeProgress}px)`;
            }

            // Entire content wrapper card fades up and out
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.opacity = String(Math.max(0, 1 - fadeProgress));
              contentWrapperRef.current.style.transform = `translateY(${-100 * fadeProgress}px)`;
            }
          } else if (progress < fadeStart) {
            // Reset to initial state when scrolling back before fade (REVERSE SCROLL)
            if (headingRef.current) {
              headingRef.current.style.opacity = '1';
              headingRef.current.style.transform = 'translateY(0)';
            }
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.opacity = '1';
              contentWrapperRef.current.style.transform = 'translateY(0)';
            }
          } else if (progress >= fadeEnd) {
            // Keep faded out after phase completes (FORWARD SCROLL LOCK)
            if (headingRef.current) {
              headingRef.current.style.opacity = '0';
              headingRef.current.style.transform = 'translateY(-50px)';
            }
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.opacity = '0';
              contentWrapperRef.current.style.transform = 'translateY(-100px)';
            }
          }

          // SAFARI IMAGE: extended hold, synchronized fade slide, cinematic glide
          if (progress < animationStart) {
            setImageState(-100, 0.7, 0.3);
          } else if (progress >= fadeStart && progress < fadeEnd) {
            // Tie slide directly to card fade: -90% -> -40% while text fades out
            const fadeProgress = clamp((progress - fadeStart) / (fadeEnd - fadeStart));
            const translateX = -90 + (50 * fadeProgress);
            const scale = 0.8 + (0.1 * fadeProgress); // 0.8 -> 0.9
            const visibilityProgress = clamp((translateX + 90) / 40);
            const opacity = translateX >= -50
              ? 1
              : Math.max(0.3, Math.min(1, 0.3 + (0.7 * visibilityProgress)));
            setImageState(translateX, scale, opacity);
          } else if (progress >= mainSlideStart && progress < mainSlideEnd) {
            // Continue glide across horizon once text is gone: -40% -> 0%
            const slideProgress = clamp((progress - mainSlideStart) / (mainSlideEnd - mainSlideStart));
            const easedSlide = slideProgress < 0.5
              ? 2 * slideProgress * slideProgress
              : 1 - Math.pow(-2 * slideProgress + 2, 2) / 2;
            const translateX = -40 + (40 * easedSlide);
            const scale = 0.9 + (0.1 * easedSlide);
            setImageState(translateX, scale, 1);
          } else {
            // Lock final state after glide completes
            setImageState(0, 1, 1);
          }

          // PHASE 4: Pause After Image Fully Visible (84.17%-85% = 1010vh-1020vh)
          // Image is fully on screen, wait 10vh before first text
          if (progress >= 0.8417 && progress < 0.85) {
            // State handled above - keep block for clarity
          }

          // PHASE 5A: First Line Appears (85%-85.42% = 1020vh-1025vh)
          // "This could be your morning" fades in after 10vh pause
          if (progress >= 0.85 && progress < 0.8542) {
            const line1Progress = Math.max(0, Math.min(1, (progress - 0.85) / 0.0042));
            const easedLine1 = Math.max(0, Math.min(1, 1 - Math.pow(1 - line1Progress, 3)));

            if (textLine1Ref.current) {
              textLine1Ref.current.style.opacity = String(easedLine1);
            }
          } else if (progress < 0.85) {
            // Keep hidden when scrolling back (REVERSE SCROLL)
            if (textLine1Ref.current) {
              textLine1Ref.current.style.opacity = '0';
            }
          } else if (progress >= 0.8542) {
            // Keep fully visible after fade completes (FORWARD SCROLL LOCK)
            if (textLine1Ref.current) {
              textLine1Ref.current.style.opacity = '1';
            }
          }

          // PHASE 5B: "Exciting." Appears (85.83%-86.25% = 1030vh-1035vh)
          // Appears 5vh after first line completes
          if (progress >= 0.8583 && progress < 0.8625) {
            const word1Progress = Math.max(0, Math.min(1, (progress - 0.8583) / 0.0042));
            const easedWord1 = Math.max(0, Math.min(1, 1 - Math.pow(1 - word1Progress, 3)));

            if (textLine2Word1Ref.current) {
              textLine2Word1Ref.current.style.opacity = String(easedWord1);
            }
          } else if (progress < 0.8583) {
            if (textLine2Word1Ref.current) {
              textLine2Word1Ref.current.style.opacity = '0';
            }
          } else if (progress >= 0.8625) {
            if (textLine2Word1Ref.current) {
              textLine2Word1Ref.current.style.opacity = '1';
            }
          }

          // PHASE 5C: "Beautiful." Appears (87.5%-87.92% = 1050vh-1055vh)
          // Appears 15vh after "Exciting." completes for extra breathing room
          if (progress >= 0.875 && progress < 0.8792) {
            const word2Progress = Math.max(0, Math.min(1, (progress - 0.875) / 0.0042));
            const easedWord2 = Math.max(0, Math.min(1, 1 - Math.pow(1 - word2Progress, 3)));

            if (textLine2Word2Ref.current) {
              textLine2Word2Ref.current.style.opacity = String(easedWord2);
            }
          } else if (progress < 0.875) {
            if (textLine2Word2Ref.current) {
              textLine2Word2Ref.current.style.opacity = '0';
            }
          } else if (progress >= 0.8792) {
            if (textLine2Word2Ref.current) {
              textLine2Word2Ref.current.style.opacity = '1';
            }
          }

          // PHASE 5D: "Breath taking." Appears (89.17%-89.58% = 1070vh-1075vh)
          // Appears 20vh after "Beautiful." completes for dramatic pacing
          if (progress >= 0.8917 && progress < 0.8958) {
            const word3Progress = Math.max(0, Math.min(1, (progress - 0.8917) / 0.0041));
            const easedWord3 = Math.max(0, Math.min(1, 1 - Math.pow(1 - word3Progress, 3)));

            if (textLine2Word3Ref.current) {
              textLine2Word3Ref.current.style.opacity = String(easedWord3);
            }
          } else if (progress < 0.8917) {
            if (textLine2Word3Ref.current) {
              textLine2Word3Ref.current.style.opacity = '0';
            }
          } else if (progress >= 0.8958) {
            if (textLine2Word3Ref.current) {
              textLine2Word3Ref.current.style.opacity = '1';
            }
          }

          // PHASE 6: Hold for Reading (89.58%-95.83% = 1075vh-1150vh)
          // Everything stays visible and static
          // Defensive: Ensure all elements maintain final state
          if (progress >= 0.8958 && progress < 0.9583) {
            if (headingRef.current) {
              headingRef.current.style.opacity = '0';
            }
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.opacity = '0';
            }
            if (textLine1Ref.current) {
              textLine1Ref.current.style.opacity = '1';
            }
            if (textLine2Word1Ref.current) {
              textLine2Word1Ref.current.style.opacity = '1';
            }
            if (textLine2Word2Ref.current) {
              textLine2Word2Ref.current.style.opacity = '1';
            }
            if (textLine2Word3Ref.current) {
              textLine2Word3Ref.current.style.opacity = '1';
            }
          }

          // PHASE 7: Exit (95.83%-100% = 1150vh-1200vh)
          // No animations, just unpinning
          // Defensive: Maintain final state during unpin
          if (progress >= 0.9583) {
            if (headingRef.current) {
              headingRef.current.style.opacity = '0';
            }
            if (contentWrapperRef.current) {
              contentWrapperRef.current.style.opacity = '0';
            }
            if (textLine1Ref.current) {
              textLine1Ref.current.style.opacity = '1';
            }
            if (textLine2Word1Ref.current) {
              textLine2Word1Ref.current.style.opacity = '1';
            }
            if (textLine2Word2Ref.current) {
              textLine2Word2Ref.current.style.opacity = '1';
            }
            if (textLine2Word3Ref.current) {
              textLine2Word3Ref.current.style.opacity = '1';
            }
          }

          // Screen reader announcements
          if (progress > 0 && progress < 0.03) {
            setAriaMessage('Morning Safari Drive section is now in focus.');
          }
          else if (progress > 0.11 && progress < 0.17) {
            setAriaMessage('Heading and content are fading away.');
          }
          else if (progress > 0.12 && progress < 0.18) {
            setAriaMessage('Full safari scene is slowly appearing with Mount Kilimanjaro and elephants.');
          }
          else if (progress > 0.8417 && progress < 0.85) {
            setAriaMessage('Image is now fully visible. Waiting before text appears.');
          }
          else if (progress > 0.85 && progress < 0.86) {
            setAriaMessage('First message appearing: This could be your morning.');
          }
          else if (progress > 0.8583 && progress < 0.8625) {
            setAriaMessage('Word appearing: Exciting.');
          }
          else if (progress > 0.8667 && progress < 0.8708) {
            setAriaMessage('Word appearing: Beautiful.');
          }
          else if (progress > 0.8917 && progress < 0.896) {
            setAriaMessage('Word appearing: Breath taking.');
          }
        },
      });

      // Set initial states
      if (fullScreenImageRef.current) {
        fullScreenImageRef.current.style.opacity = '0.3';
        fullScreenImageRef.current.style.transform = 'translateX(-100%) scale(0.7)';
      }

      if (textLine1Ref.current) {
        textLine1Ref.current.style.opacity = '0';
      }

      if (textLine2Word1Ref.current) {
        textLine2Word1Ref.current.style.opacity = '0';
      }

      if (textLine2Word2Ref.current) {
        textLine2Word2Ref.current.style.opacity = '0';
      }

      if (textLine2Word3Ref.current) {
        textLine2Word3Ref.current.style.opacity = '0';
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
          ref={headingRef}
          id="morning-drive-heading"
          className={styles.heading}
        >
          Morning Safari Drive
        </h2>

        {/* Two-Card Content Wrapper - Fades as one unit during Phase 2 */}
        <div ref={contentWrapperRef} className={styles.contentWrapper}>
          {/* Text Card */}
          <div className={styles.textCard}>
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

          {/* Image Card */}
          <div className={styles.imageCard}>
            <div className={styles.imageContainer}>
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

        {/* Text overlay - appears sequentially after full-screen image */}
        <div className={styles.animatedHeading}>
          <h3 className={styles.animatedHeadingText}>
            <span ref={textLine1Ref} className={styles.textLine1}>This could be your morning</span>
            <span className={styles.textLine2}>
              <span ref={textLine2Word1Ref} className={styles.word}>Exciting.</span>
              <span ref={textLine2Word2Ref} className={styles.word}>Beautiful.</span>
              <span ref={textLine2Word3Ref} className={styles.word}>Breath taking.</span>
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MorningDriveChapter.module.css';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const fullScreenImageRef = useRef<HTMLDivElement>(null);
  const animatedHeadingRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !fullScreenImageRef.current || !animatedHeadingRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const fullScreenImage = fullScreenImageRef.current;
    const animatedHeading = animatedHeadingRef.current;
    const container = containerRef.current;
    const line1Words = animatedHeading.querySelectorAll(`.${styles.line1Word}`);
    const line2Words = animatedHeading.querySelectorAll(`.${styles.line2Word}`);

    // Create timeline for animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=835vh',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        scrub: 1,
      },
    });

    // Animation sequence (835vh total)
    // Timeline breakdown:
    // 0vh: Pin occurs, background gradient activates
    // 0-250vh: Initial content visible with gradient background
    // 250-300vh: Initial content fades out (50vh)
    // 300-500vh: Image slides in from left (200vh)
    // 500-540vh: Line 1 words appear (5 words × 10vh = 40vh)
    // 540-555vh: Gap between lines (15vh)
    // 555-585vh: Line 2 phrases appear (3 phrases × 15vh = 30vh)
    // 585-785vh: Hold everything visible (200vh)
    // 785-835vh: Final fade out (50vh)

    tl
      // Phase 1: Background gradient transition (0-10vh = 0-0.012%)
      .to(section, {
        background: 'linear-gradient(to bottom, #f9d59a, #1b557b)',
        duration: 0.012,
        ease: 'power1.inOut'
      }, 0)

      // Phase 2: Hold initial content visible (0-250vh = 0-29.94%)
      .to({}, { duration: 0.2994 }, 0)

      // Phase 3: Fade out initial content (250-300vh = 29.94-35.93%)
      .to(container, {
        opacity: 0,
        duration: 0.0599,
        ease: 'power1.inOut'
      }, 0.2994)

      // Phase 4: Image slides in from left (300-500vh = 35.93-59.88%)
      .to(fullScreenImage, {
        x: '0%',
        opacity: 1,
        duration: 0.2395,
        ease: 'none'  // Linear for 1:1 scroll mapping
      }, 0.3593)

      // Phase 5: Line 1 words appear - "This could be your morning" (500-540vh)
      .to(line1Words[0], { opacity: 1, duration: 0.012 }, 0.5988)  // "This" at 500vh
      .to(line1Words[1], { opacity: 1, duration: 0.012 }, 0.6108)  // "could" at 510vh
      .to(line1Words[2], { opacity: 1, duration: 0.012 }, 0.6228)  // "be" at 520vh
      .to(line1Words[3], { opacity: 1, duration: 0.012 }, 0.6347)  // "your" at 530vh
      .to(line1Words[4], { opacity: 1, duration: 0.012 }, 0.6467)  // "morning" at 540vh

      // Phase 6: Gap between lines (540-555vh = 64.67-66.47%)
      .to({}, { duration: 0.018 }, 0.6467)

      // Phase 7: Line 2 phrases appear - "Exciting. Beautiful. Breath taking" (555-585vh)
      .to(line2Words[0], { opacity: 1, duration: 0.012 }, 0.6647)  // "Exciting." at 555vh
      .to(line2Words[1], { opacity: 1, duration: 0.012 }, 0.6826)  // "Beautiful." at 570vh
      .to(line2Words[2], { opacity: 1, duration: 0.012 }, 0.7006)  // "Breath taking." at 585vh

      // Phase 8: Hold everything visible (585-785vh = 70.06-94.01%)
      .to({}, { duration: 0.2395 }, 0.7006)

      // Phase 9: Final fade out (785-835vh = 94.01-100%)
      .to([fullScreenImage, animatedHeading], {
        opacity: 0,
        duration: 0.0599,
        ease: 'power1.inOut'
      }, 0.9401);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.morningDriveChapter} ${className}`}
      data-chapter="morning-drive"
      aria-labelledby="morning-drive-heading"
      tabIndex={-1}
    >
      {/* Full-screen safari image that slides in from left */}
      <div ref={fullScreenImageRef} className={styles.fullScreenImage}>
        <OptimizedImage
          src="/images/experiences/Elephants Walking Right.png"
          alt="Elephants walking across the golden savanna at dawn"
          width={1920}
          height={1080}
          imageType="hero"
          priority
        />
      </div>

      {/* Animated heading overlay */}
      <div ref={animatedHeadingRef} className={styles.animatedHeading}>
        <div className={styles.animatedHeadingText}>
          <div className={styles.textLine1}>
            <span className={styles.line1Word}>This</span>
            <span className={styles.line1Word}>could</span>
            <span className={styles.line1Word}>be</span>
            <span className={styles.line1Word}>your</span>
            <span className={styles.line1Word}>morning</span>
          </div>
          <div className={styles.textLine2}>
            <span className={styles.line2Word}>Exciting.</span>
            <span className={styles.line2Word}>Beautiful.</span>
            <span className={styles.line2Word}>Breath taking.</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className={styles.container}>
        <h2
          id="morning-drive-heading"
          className={styles.heading}
        >
          Morning Safari Drive
        </h2>

        {/* Two-Card Content Wrapper */}
        <div className={styles.contentWrapper}>
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

        {/* Trip Details - Full Width Below Both Cards */}
        <div className={styles.tripDetailsWrapper}>
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
      </div>
    </section>
  );
}

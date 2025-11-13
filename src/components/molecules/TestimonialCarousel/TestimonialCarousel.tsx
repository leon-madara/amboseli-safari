'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from '@/data/guestTestimonials';
import styles from './TestimonialCarousel.module.css';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoAdvanceDelay?: number; // milliseconds
  className?: string;
}

export default function TestimonialCarousel({
  testimonials,
  autoAdvanceDelay = 5000,
  className = '',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const handleDotClick = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-advance functionality
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoAdvanceDelay);

    return () => clearInterval(interval);
  }, [isPaused, handleNext, autoAdvanceDelay, testimonials.length]);

  if (testimonials.length === 0) {
    return <div className={styles.empty}>No testimonials available</div>;
  }

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div
      className={`${styles.carousel} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.carouselContainer}>
        {/* Previous Button */}
        {testimonials.length > 1 && (
          <button
            onClick={handlePrev}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Testimonial Content */}
        <div className={styles.testimonialWrapper}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className={styles.testimonialContent}
            >
              {/* Avatar */}
              {currentTestimonial.avatar && (
                <div className={styles.avatarWrapper}>
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    width={80}
                    height={80}
                    className={styles.avatar}
                  />
                </div>
              )}

              {/* Rating Stars */}
              <div className={styles.rating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < currentTestimonial.rating ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className={styles.quote}>
                <p className={styles.text}>"{currentTestimonial.text}"</p>
              </blockquote>

              {/* Guest Info */}
              <div className={styles.guestInfo}>
                <div className={styles.guestName}>{currentTestimonial.name}</div>
                <div className={styles.guestLocation}>
                  {currentTestimonial.location}, {currentTestimonial.country}
                </div>
                <div className={styles.tripType}>{currentTestimonial.tripType} Trip</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        {testimonials.length > 1 && (
          <button
            onClick={handleNext}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Dot Indicators */}
      {testimonials.length > 1 && (
        <div className={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}

      {/* Pause Indicator */}
      {isPaused && testimonials.length > 1 && (
        <div className={styles.pauseIndicator}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        </div>
      )}
    </div>
  );
}

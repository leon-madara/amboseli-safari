'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageCarousel.module.css';

export interface ImageCarouselProps {
  images: string[];
  alt: string;
  onImageChange?: (index: number) => void;
}

export default function ImageCarousel({
  images,
  alt,
  onImageChange,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
    onImageChange?.(index);
  };

  if (images.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.imageWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className={`${styles.navButton} ${styles.navButtonNext}`}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className={styles.dotsContainer}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(e, index)}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ''
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

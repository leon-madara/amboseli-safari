'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './VirtualTourModal.module.css';

export interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomTitle: string;
  tourImages: string[];
}

export default function VirtualTourModal({
  isOpen,
  onClose,
  roomTitle,
  tourImages,
}: VirtualTourModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle arrow key navigation
  useEffect(() => {
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleArrows);
    }

    return () => {
      document.removeEventListener('keydown', handleArrows);
    };
  }, [isOpen, currentImageIndex]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${isFullscreen ? styles.fullscreen : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>
              🔄 360° Virtual Tour - {roomTitle}
            </h2>
            <p className={styles.subtitle}>
              {currentImageIndex + 1} of {tourImages.length} views
            </p>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={toggleFullscreen}
              className={styles.fullscreenButton}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close virtual tour"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tour Viewer */}
        <div className={styles.viewer}>
          <div className={styles.imageContainer}>
            <Image
              src={tourImages[currentImageIndex]}
              alt={`${roomTitle} - View ${currentImageIndex + 1}`}
              fill
              className={styles.image}
              sizes="100vw"
              priority
            />

            {/* Hotspot Indicators (Simulated) */}
            <div className={styles.hotspots}>
              <button className={`${styles.hotspot} ${styles.hotspot1}`} aria-label="View bed area">
                <span className={styles.hotspotPulse} />
                <span className={styles.hotspotIcon}>🛏️</span>
              </button>
              <button className={`${styles.hotspot} ${styles.hotspot2}`} aria-label="View bathroom">
                <span className={styles.hotspotPulse} />
                <span className={styles.hotspotIcon}>🚿</span>
              </button>
              <button className={`${styles.hotspot} ${styles.hotspot3}`} aria-label="View balcony">
                <span className={styles.hotspotPulse} />
                <span className={styles.hotspotIcon}>🌅</span>
              </button>
            </div>

            {/* Navigation Arrows */}
            {tourImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className={`${styles.navButton} ${styles.navPrevious}`}
                  aria-label="Previous view"
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
                  className={`${styles.navButton} ${styles.navNext}`}
                  aria-label="Next view"
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
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {tourImages.length > 1 && (
            <div className={styles.thumbnails}>
              {tourImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.thumbnailActive : ''
                  }`}
                  aria-label={`View ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="120px"
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.controlsInfo}>
            <p>Use arrow keys or swipe to navigate • Press ESC to close</p>
          </div>
        </div>
      </div>
    </div>
  );
}

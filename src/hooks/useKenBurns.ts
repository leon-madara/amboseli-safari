'use client';

import { useState, useEffect } from 'react';

/**
 * Ken Burns effect hook for image galleries
 * Creates a slow zoom and pan effect on images
 */
export function useKenBurns(images: string[], interval: number = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return {
    currentIndex,
    currentImage: images[currentIndex],
    isTransitioning,
  };
}

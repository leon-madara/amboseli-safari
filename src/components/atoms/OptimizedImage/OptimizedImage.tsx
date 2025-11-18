'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState, useRef } from 'react';

export interface OptimizedImageProps extends Omit<ImageProps, 'quality' | 'loading'> {
  /**
   * Image type determines optimization strategy
   * - 'hero': Critical images that load immediately (quality: 90, priority: true)
   * - 'chapter-background': Chapter background images (quality: 85, lazy load)
   * - 'content': Content images like cards, dishes, etc. (quality: 85, lazy load)
   */
  imageType?: 'hero' | 'chapter-background' | 'content';
  
  /**
   * Distance threshold in pixels below viewport to start loading
   * Default: 500px for lazy-loaded images
   */
  lazyLoadThreshold?: number;
}

/**
 * OptimizedImage Component
 * 
 * Provides standardized image optimization for the safari scroll experience:
 * - Hero images: quality 90, priority loading, WEBP with JPEG fallback
 * - Chapter backgrounds: quality 85, lazy loading with 500px threshold
 * - Content images: quality 85, lazy loading with 500px threshold
 * - Responsive sizes based on viewport width
 * - Automatic WEBP format with JPEG fallback (configured in next.config.js)
 */
export default function OptimizedImage({
  imageType = 'content',
  lazyLoadThreshold = 500,
  sizes,
  alt,
  ...props
}: OptimizedImageProps) {
  const [shouldLoad, setShouldLoad] = useState(imageType === 'hero');
  const imageRef = useRef<HTMLDivElement>(null);

  // Determine quality based on image type
  const quality = imageType === 'hero' ? 90 : 85;
  
  // Determine priority based on image type
  const priority = imageType === 'hero';

  // Determine responsive sizes if not provided
  const responsiveSizes = sizes || getResponsiveSizes(imageType);

  // Lazy loading with custom threshold for non-hero images
  useEffect(() => {
    if (imageType === 'hero' || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: `${lazyLoadThreshold}px 0px ${lazyLoadThreshold}px 0px`,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [imageType, lazyLoadThreshold, shouldLoad]);

  // For hero images, load immediately
  if (imageType === 'hero') {
    return (
      <Image
        {...props}
        alt={alt}
        quality={quality}
        priority={priority}
        sizes={responsiveSizes}
      />
    );
  }

  // For lazy-loaded images, use intersection observer
  return (
    <div ref={imageRef} style={{ width: '100%', height: '100%' }}>
      {shouldLoad ? (
        <Image
          {...props}
          alt={alt}
          quality={quality}
          loading="lazy"
          sizes={responsiveSizes}
        />
      ) : (
        // Placeholder while image is not yet in viewport
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
          aria-label={`Loading ${alt}`}
        />
      )}
    </div>
  );
}

/**
 * Get responsive sizes based on image type
 */
function getResponsiveSizes(imageType: 'hero' | 'chapter-background' | 'content'): string {
  switch (imageType) {
    case 'hero':
      // Hero images always full viewport width
      return '100vw';
    
    case 'chapter-background':
      // Chapter backgrounds full viewport width
      return '100vw';
    
    case 'content':
      // Content images responsive based on viewport
      return '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px';
    
    default:
      return '100vw';
  }
}

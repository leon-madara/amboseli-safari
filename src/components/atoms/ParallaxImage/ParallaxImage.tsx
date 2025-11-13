'use client';

import { useRef, CSSProperties } from 'react';
import Image from 'next/image';
import { useParallax, ParallaxOptions } from '@/hooks/useParallax';
import styles from './ParallaxImage.module.css';

/**
 * ParallaxImage Component Props
 */
export interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0-1, default 0.5
  direction?: 'up' | 'down';
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * ParallaxImage Atom Component
 * 
 * A reusable image component with scroll-based parallax effect.
 * Integrates with Next.js Image optimization and supports lazy loading.
 * 
 * Features:
 * - Scroll-based transform calculations using useParallax hook
 * - Next.js Image optimization with automatic WebP conversion
 * - Lazy loading by default (unless priority=true)
 * - Respects prefers-reduced-motion preference
 * - GPU-accelerated transforms for smooth performance
 * 
 * @example
 * <ParallaxImage
 *   src="/images/hero-background.jpg"
 *   alt="Safari landscape"
 *   speed={0.5}
 *   direction="up"
 *   priority
 * />
 */
export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  direction = 'up',
  className = '',
  priority = false,
  fill = true,
  width,
  height,
  sizes,
  quality = 85,
  objectFit = 'cover',
  objectPosition = 'center',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate parallax offset
  const offset = useParallax(containerRef, { speed, direction });

  // Build transform style
  const transformStyle: CSSProperties = {
    transform: `translateY(${offset}px)`,
    willChange: offset !== 0 ? 'transform' : 'auto',
  };

  // Build image style
  const imageStyle: CSSProperties = {
    objectFit,
    objectPosition,
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.parallaxContainer} ${className}`}
      data-parallax-speed={speed}
      data-parallax-direction={direction}
    >
      <div 
        className={styles.parallaxImage}
        style={transformStyle}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            quality={quality}
            sizes={sizes || '100vw'}
            style={imageStyle}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            quality={quality}
            sizes={sizes}
            style={imageStyle}
          />
        )}
      </div>
    </div>
  );
}

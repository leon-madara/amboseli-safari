'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ParallaxContainer, ParallaxLayer } from '@/components/animations';
import { useSafariProgress, type TimeOfDay } from '@/providers/SafariProgressProvider';
import { useInView } from '@/hooks/useInView';
import styles from './SafariChapter.module.css';

export interface BackgroundLayer {
  src: string;
  alt: string;
  speed: number;      // Parallax speed: 0.1-2.0
  opacity?: number;   // 0-1
  blend?: string;     // CSS mix-blend-mode
  priority?: boolean; // Image loading priority
}

export interface SafariChapterProps {
  id: string;
  chapterNumber: number;
  title: string;
  timeOfDay: TimeOfDay;
  backgroundLayers?: BackgroundLayer[];
  backgroundColor?: string;
  minHeight?: string;
  className?: string;
  children: ReactNode;
  enableParallax?: boolean;
}

export function SafariChapter({
  id,
  chapterNumber,
  title,
  timeOfDay,
  backgroundLayers = [],
  backgroundColor,
  minHeight = '100vh',
  className = '',
  children,
  enableParallax = true,
}: SafariChapterProps) {
  const chapterRef = useRef<HTMLElement>(null);
  const isInView = useInView(chapterRef, { threshold: 0.3 });
  const { registerChapter, unregisterChapter } = useSafariProgress();

  // Register chapter with progress provider
  useEffect(() => {
    if (chapterRef.current) {
      registerChapter(id, chapterRef.current);
    }

    return () => {
      unregisterChapter(id);
    };
  }, [id, registerChapter, unregisterChapter]);

  return (
    <section
      ref={chapterRef}
      id={id}
      data-chapter={chapterNumber}
      data-time-of-day={timeOfDay}
      className={`${styles.chapter} ${className}`}
      style={{
        minHeight,
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      {/* Background Layers with Parallax */}
      {backgroundLayers.length > 0 && enableParallax ? (
        <ParallaxContainer className={styles.backgroundContainer}>
          {backgroundLayers.map((layer, index) => (
            <ParallaxLayer
              key={`${id}-layer-${index}`}
              speed={layer.speed}
              className={styles.backgroundLayer}
              style={{
                opacity: layer.opacity ?? 1,
                mixBlendMode: layer.blend as any,
                zIndex: index,
              }}
            >
              <Image
                src={layer.src}
                alt={layer.alt}
                fill
                className={styles.layerImage}
                priority={layer.priority ?? false}
                quality={90}
                sizes="100vw"
              />
            </ParallaxLayer>
          ))}
        </ParallaxContainer>
      ) : (
        // Fallback: single background without parallax
        backgroundLayers.length > 0 && (
          <div className={styles.backgroundContainer}>
            <Image
              src={backgroundLayers[0].src}
              alt={backgroundLayers[0].alt}
              fill
              className={styles.layerImage}
              priority={backgroundLayers[0].priority ?? false}
              quality={90}
              sizes="100vw"
            />
          </div>
        )
      )}

      {/* Gradient Overlay */}
      <div className={`${styles.overlay} ${styles[`overlay-${timeOfDay}`]}`} />

      {/* Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}

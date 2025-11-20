'use client';

import { useEffect, useRef, useState } from 'react';
import { ChapterType } from '@/utils/timeline';
import styles from './ParallaxBackground.module.css';

interface ParallaxBackgroundProps {
  activeChapter: ChapterType;
}

const chapterGradients: Record<ChapterType, string> = {
  dawn: 'linear-gradient(180deg, #FF7B54 0%, #FFB26B 50%, #E8D5C4 100%)',
  midday: 'linear-gradient(180deg, #87CEEB 0%, #D4AF37 100%)',
  sunset: 'linear-gradient(180deg, #C86F4D 0%, #CC8B3F 50%, #2D4A3E 100%)',
  night: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
};

export function ParallaxBackground({ activeChapter }: ParallaxBackgroundProps) {
  const [currentGradient, setCurrentGradient] = useState(chapterGradients.dawn);
  const skyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smoothly transition background gradient when chapter changes
    setCurrentGradient(chapterGradients[activeChapter]);
  }, [activeChapter]);

  return (
    <div className={styles.background}>
      {/* Sky layer - moves slowest (parallax) */}
      <div
        ref={skyRef}
        className={`${styles.skyLayer} parallax-sky`}
        style={{ background: currentGradient }}
      />

      {/* Mountain silhouette layer - medium speed */}
      <div className={`${styles.mountainLayer} parallax-mountains`}>
        <svg
          className={styles.mountainSvg}
          viewBox="0 0 1920 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400V200L320 100L640 180L960 80L1280 160L1600 120L1920 200V400H0Z"
            fill="rgba(45, 74, 62, 0.3)"
          />
          <path
            d="M0 400V250L400 150L800 220L1200 140L1600 200L1920 180V400H0Z"
            fill="rgba(45, 74, 62, 0.2)"
          />
        </svg>
      </div>

      {/* Ground layer - moves with content (no parallax) */}
      <div className={styles.groundLayer} />
    </div>
  );
}

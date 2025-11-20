'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './TimelineHero.module.css';

export function TimelineHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    setIsVisible(true);
  }, []);

  const handleScrollDown = () => {
    // Smooth scroll to timeline section
    const timelineSection = document.getElementById('timeline-section');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background with Ken Burns effect */}
      <div className={styles.backgroundContainer}>
        <div className={styles.backgroundImage}>
          <Image
            src="/images/experiences/sunrise-game-drive.jpg"
            alt="Amboseli Safari at sunrise"
            fill
            priority
            quality={90}
            sizes="100vw"
            className={styles.image}
          />
          {/* Gradient overlay */}
          <div className={styles.overlay} />
        </div>
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <div className={`${styles.textContainer} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.title}>Your Safari Story Begins</h1>
          <p className={styles.subtitle}>
            Follow the rhythm of a day in Amboseli, from dawn's first light to the mysteries of the African night
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={handleScrollDown}
          className={`${styles.scrollIndicator} ${isVisible ? styles.visible : ''}`}
          aria-label="Scroll to explore experiences"
        >
          <span className={styles.scrollText}>Scroll to explore</span>
          <svg
            className={styles.scrollArrow}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

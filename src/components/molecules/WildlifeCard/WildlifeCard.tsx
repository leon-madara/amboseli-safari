'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from '@/components/atoms/OptimizedImage';
import styles from './WildlifeCard.module.css';

export interface WildlifeCardProps {
  id: string;
  name: string;
  image: string;
  funFact: string;
  scientificName: string;
}

export default function WildlifeCard({
  id,
  name,
  image,
  funFact,
  scientificName,
}: WildlifeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.wildlifeCard}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container with Zoom Effect */}
      <div className={styles.imageContainer}>
        <motion.div
          className={styles.imageWrapper}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <OptimizedImage
            src={image}
            alt={`${name} in the wild`}
            fill
            imageType="content"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
        </motion.div>

        {/* Overlay that appears on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.scientificName}>{scientificName}</p>

        {/* Fun Fact - Revealed on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.funFactContainer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.funFactLabel}>Did you know?</div>
              <p className={styles.funFact}>{funFact}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Indicator */}
      <div className={styles.hoverIndicator}>
        <span className={styles.indicatorText}>Hover to learn more</span>
      </div>
    </motion.div>
  );
}

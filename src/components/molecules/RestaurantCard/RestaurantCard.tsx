'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Restaurant } from '@/data/dining';
import styles from './RestaurantCard.module.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

function getFeatureIcon(feature: string): string {
  const iconMap: Record<string, string> = {
    'indoor': '🪑',
    'outdoor': '🌅',
    'views': '🏔️',
    'kilimanjaro': '🏔️',
    'breakfast': '🍳',
    'lunch': '🍽️',
    'dinner': '🍽️',
    'wine': '🍷',
    'cellar': '🍷',
    'private': '✨',
    'terrace': '🌅',
    'cocktails': '🍹',
    'bbq': '🔥',
    'grilled': '🔥',
    'wildlife': '🦁',
    'viewing': '🦁',
    'bar': '🍸',
    'spirits': '🍸',
    'lounge': '🛋️',
    'late': '🌙',
    'open': '⏰',
    'cooking': '👨‍🍳',
    'stations': '🔥',
    'premium': '⭐',
    'selections': '🍷',
    'beers': '🍺',
    'imported': '🍺',
    'bites': '🥗',
    'appetizers': '🥗',
    'seating': '🪑',
    'cozy': '🛋️',
  };

  const key = Object.keys(iconMap).find(k =>
    feature.toLowerCase().includes(k)
  );

  return key ? iconMap[key] : '✓';
}

export default function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: mousePosition.y * -0.3,
        rotateY: mousePosition.x * 0.3,
      }}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {restaurant.image && (
        <div className={styles.imageContainer}>
          <Image
            src={restaurant.image}
            alt={restaurant.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
          <div className={styles.imageVignette} />
          <div className={styles.imageGradient} />
        </div>
      )}

      <div className={styles.content}>
        <motion.h3
          className={styles.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          {restaurant.title}
        </motion.h3>

        <p className={styles.description}>{restaurant.description}</p>

        <ul className={styles.features}>
          {restaurant.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className={styles.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + idx * 0.05 }}
            >
              <span className={styles.featureIcon}>
                {getFeatureIcon(feature)}
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

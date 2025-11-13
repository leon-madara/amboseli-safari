'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Restaurant } from '@/data/dining';
import styles from './RestaurantCard.module.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export default function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
          <div className={styles.imageOverlay} />
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
              <span className={styles.featureIcon}>✓</span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

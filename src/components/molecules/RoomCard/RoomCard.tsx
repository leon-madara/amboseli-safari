'use client';

import Image from 'next/image';
import Link from '@/components/atoms/Link';
import { motion } from 'framer-motion';
import styles from './RoomCard.module.css';

export interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  capacity: number;
  size: string;
  price: string;
  features: string[];
  slug: string;
}

export default function RoomCard({
  title,
  description,
  image,
  imageAlt,
  capacity,
  size,
  price,
  features,
  slug,
}: RoomCardProps) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/accommodations/${slug}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.overlay} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{capacity} {capacity === 1 ? 'Guest' : 'Guests'}</span>
          </div>

          <div className={styles.detailItem}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
            </svg>
            <span>{size}</span>
          </div>
        </div>

        <ul className={styles.features}>
          {features.slice(0, 4).map((feature, index) => (
            <li key={index} className={styles.feature}>
              <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.priceLabel}>From</span>
            <span className={styles.price}>{price}</span>
            <span className={styles.pricePeriod}>per night</span>
          </div>

          <Link href={`/accommodations/${slug}`} className={styles.button}>
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

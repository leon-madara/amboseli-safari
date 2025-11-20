'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Restaurant } from '@/data/dining';
import styles from './RestaurantCard.module.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

interface AvailabilityStatus {
  available: boolean;
  nextAvailable?: string;
  popular?: boolean;
}

function getAvailabilityStatus(restaurant: Restaurant): AvailabilityStatus {
  // Mock logic - in real implementation, this would fetch from API
  const now = new Date();
  const hour = now.getHours();

  // Lunch: 12-15, Dinner: 18-22
  const isLunchTime = hour >= 12 && hour < 15;
  const isDinnerTime = hour >= 18 && hour < 22;

  return {
    available: isLunchTime || isDinnerTime,
    nextAvailable: !isLunchTime && !isDinnerTime ? (hour < 12 ? '12:00 PM' : '6:00 PM') : undefined,
    popular: restaurant.title === 'Kilimanjaro Restaurant',
  };
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
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const availability = getAvailabilityStatus(restaurant);

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

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
        <div ref={imageRef} className={styles.imageContainer}>
          <motion.div style={{ y: imageY }} className={styles.imageWrapper}>
            <Image
              src={restaurant.image}
              alt={restaurant.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />
          </motion.div>
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

        {/* Availability Badges */}
        <div className={styles.badges}>
          {availability.available && (
            <motion.span
              className={styles.badgeAvailable}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <span className={styles.badgeDot} />
              Available Now
            </motion.span>
          )}

          {!availability.available && availability.nextAvailable && (
            <span className={styles.badgeNext}>
              Next: {availability.nextAvailable}
            </span>
          )}

          {availability.popular && (
            <span className={styles.badgePopular}>
              ⭐ Popular Choice
            </span>
          )}
        </div>

        <p className={styles.description}>{restaurant.description}</p>

        <motion.ul
          className={styles.features}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {restaurant.features.slice(0, isExpanded ? undefined : 3).map((feature, idx) => (
            <motion.li
              key={idx}
              className={styles.feature}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
            >
              <span className={styles.featureIcon}>
                {getFeatureIcon(feature)}
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        {restaurant.features.length > 3 && (
          <motion.button
            className={styles.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExpanded
              ? 'Show Less'
              : `Show ${restaurant.features.length - 3} More`
            }
          </motion.button>
        )}

        <motion.button
          className={styles.ctaButton}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(200, 111, 77, 0.4)",
              "0 0 0 10px rgba(200, 111, 77, 0)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>View Menu & Book</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

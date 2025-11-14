'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './RoomComparisonBar.module.css';

export interface ComparisonRoom {
  slug: string;
  title: string;
  image: string;
  price: string;
}

export interface RoomComparisonBarProps {
  rooms: ComparisonRoom[];
  onRemove: (slug: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

export default function RoomComparisonBar({
  rooms,
  onRemove,
  onCompare,
  onClear,
}: RoomComparisonBarProps) {
  if (rooms.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.bar}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h4 className={styles.title}>
                Compare Rooms ({rooms.length}/3)
              </h4>
              <button
                onClick={onClear}
                className={styles.clearButton}
                aria-label="Clear all comparisons"
              >
                Clear All
              </button>
            </div>

            <div className={styles.roomsList}>
              {rooms.map((room) => (
                <div key={room.slug} className={styles.roomChip}>
                  <div className={styles.roomImage}>
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      sizes="60px"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.roomInfo}>
                    <span className={styles.roomTitle}>{room.title}</span>
                    <span className={styles.roomPrice}>{room.price}</span>
                  </div>
                  <button
                    onClick={() => onRemove(room.slug)}
                    className={styles.removeButton}
                    aria-label={`Remove ${room.title} from comparison`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Placeholder slots */}
              {Array.from({ length: 3 - rooms.length }).map((_, i) => (
                <div key={`placeholder-${i}`} className={styles.placeholderChip}>
                  <span>+</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onCompare}
            className={styles.compareButton}
            disabled={rooms.length < 2}
          >
            Compare {rooms.length > 1 ? `${rooms.length} Rooms` : ''}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

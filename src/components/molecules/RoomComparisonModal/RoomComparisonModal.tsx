'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import styles from './RoomComparisonModal.module.css';

export interface ComparisonRoomDetails {
  slug: string;
  title: string;
  image: string;
  price: string;
  capacity: number;
  size: string;
  features: string[];
  rating?: number;
  reviewCount?: number;
  description: string;
}

export interface RoomComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: ComparisonRoomDetails[];
}

export default function RoomComparisonModal({
  isOpen,
  onClose,
  rooms,
}: RoomComparisonModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Collect all unique features across selected rooms
  const allFeatures = Array.from(
    new Set(rooms.flatMap((room) => room.features))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>Compare Rooms</h3>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close comparison"
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

            <div className={styles.content}>
              <div className={styles.comparisonTable}>
                {/* Room Headers */}
                <div className={styles.tableRow}>
                  <div className={styles.labelCell}></div>
                  {rooms.map((room) => (
                    <div key={room.slug} className={styles.roomHeaderCell}>
                      <div className={styles.roomImage}>
                        <Image
                          src={room.image}
                          alt={room.title}
                          fill
                          sizes="300px"
                          className={styles.image}
                        />
                      </div>
                      <h4 className={styles.roomTitle}>{room.title}</h4>
                      {room.rating && (
                        <div className={styles.rating}>
                          ⭐ {room.rating} ({room.reviewCount})
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Price Row */}
                <div className={styles.tableRow}>
                  <div className={styles.labelCell}>
                    <strong>Price</strong>
                  </div>
                  {rooms.map((room) => (
                    <div key={room.slug} className={styles.dataCell}>
                      <span className={styles.price}>{room.price}</span>
                      <span className={styles.pricePeriod}>per night</span>
                    </div>
                  ))}
                </div>

                {/* Capacity Row */}
                <div className={styles.tableRow}>
                  <div className={styles.labelCell}>
                    <strong>Capacity</strong>
                  </div>
                  {rooms.map((room) => (
                    <div key={room.slug} className={styles.dataCell}>
                      {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                    </div>
                  ))}
                </div>

                {/* Size Row */}
                <div className={styles.tableRow}>
                  <div className={styles.labelCell}>
                    <strong>Size</strong>
                  </div>
                  {rooms.map((room) => (
                    <div key={room.slug} className={styles.dataCell}>
                      {room.size}
                    </div>
                  ))}
                </div>

                {/* Features Rows */}
                <div className={styles.tableRow}>
                  <div className={styles.labelCell}>
                    <strong>Amenities</strong>
                  </div>
                  {rooms.map((room) => (
                    <div key={room.slug} className={styles.dataCell}>
                      <div className={styles.featuresList}>
                        {allFeatures.map((feature) => (
                          <div key={feature} className={styles.featureItem}>
                            {room.features.includes(feature) ? (
                              <>
                                <svg
                                  className={styles.checkIcon}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{feature}</span>
                              </>
                            ) : (
                              <>
                                <svg
                                  className={styles.crossIcon}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className={styles.unavailable}>{feature}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions Row */}
                <div className={styles.tableRow}>
                  <div className={styles.labelCell}></div>
                  {rooms.map((room) => (
                    <div key={room.slug} className={styles.dataCell}>
                      <Link
                        href={`/accommodations/${room.slug}`}
                        className={styles.viewButton}
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

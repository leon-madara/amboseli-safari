'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Restaurant } from '@/data/dining';
import styles from './MenuPreviewModal.module.css';

interface MenuPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
}

export default function MenuPreviewModal({
  isOpen,
  onClose,
  restaurant
}: MenuPreviewModalProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  if (!restaurant.menuCategories || restaurant.menuCategories.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>{restaurant.title} Menu</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Category Tabs */}
            <div className={styles.categories}>
              {restaurant.menuCategories.map((category, idx) => (
                <button
                  key={idx}
                  className={`${styles.categoryTab} ${
                    activeCategory === idx ? styles.categoryTabActive : ''
                  }`}
                  onClick={() => setActiveCategory(idx)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <motion.div
              key={activeCategory}
              className={styles.menuContent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {restaurant.menuCategories[activeCategory].items.map((item, idx) => (
                <div key={idx} className={styles.menuItem}>
                  <div className={styles.itemHeader}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <span className={styles.itemPrice}>${item.price}</span>
                  </div>
                  {item.description && (
                    <p className={styles.itemDescription}>{item.description}</p>
                  )}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className={styles.dietaryTags}>
                      {item.dietary.map((tag, i) => (
                        <span key={i} className={styles.dietaryTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Footer CTA */}
            <div className={styles.footer}>
              <button className={styles.bookButton}>Reserve Table</button>
              <button className={styles.downloadButton}>Download Full Menu</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PriceFilter.module.css';

export interface PriceRange {
  min: number;
  max: number;
}

export interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  currentRange: PriceRange;
  onRangeChange: (range: PriceRange) => void;
  onReset: () => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  currentRange,
  onRangeChange,
  onReset,
}: PriceFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Default expanded for better UX

  // Calculate average/current price for display (using middle of range)
  const currentAvgPrice = Math.round((minPrice + maxPrice) / 2);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, currentRange.max);
    onRangeChange({
      min: newMin,
      max: currentRange.max,
    });
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, currentRange.min);
    onRangeChange({
      min: currentRange.min,
      max: newMax,
    });
  };

  const increment = (type: 'min' | 'max', amount: number = 10) => {
    if (type === 'min') {
      handleMinChange(currentRange.min + amount);
    } else {
      handleMaxChange(currentRange.max + amount);
    }
  };

  const decrement = (type: 'min' | 'max', amount: number = 10) => {
    if (type === 'min') {
      handleMinChange(Math.max(minPrice, currentRange.min - amount));
    } else {
      handleMaxChange(Math.max(currentRange.min, currentRange.max - amount));
    }
  };

  const isFiltered = currentRange.min !== minPrice || currentRange.max !== maxPrice;

  // Calculate percentage positions for slider track
  const minPercent = ((currentRange.min - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercent = ((currentRange.max - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className={styles.priceFilter}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.filterButton}
        aria-expanded={isExpanded}
      >
        <span className={styles.filterLabel}>
          <span className={styles.icon}>🔥</span>
          <span>Price Range</span>
          {isFiltered && (
            <span className={styles.activeIndicator}>
              ${currentRange.min} - ${currentRange.max}
            </span>
          )}
        </span>
        <motion.svg
          className={styles.chevron}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="filter-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
            className={styles.filterContent}
          >
            {/* Current Average Price Display */}
            <div className={styles.currentPrice}>
              Current avg. price <strong>${currentAvgPrice}</strong> per night
            </div>

            {/* Visual Slider with Safari Gradient */}
            <div className={styles.sliderWrapper}>
              <span className={styles.sliderLabel}>Min</span>

              <div className={styles.sliderTrack}>
                {/* Safari gradient background */}
                <div className={styles.sliderGradient} />

                {/* Active range highlight */}
                <div
                  className={styles.sliderRange}
                  style={{
                    left: `${minPercent}%`,
                    width: `${maxPercent - minPercent}%`,
                  }}
                />

                {/* Min range input */}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={currentRange.min}
                  onChange={(e) => handleMinChange(Number(e.target.value))}
                  className={styles.sliderInput}
                  aria-label="Minimum price"
                />

                {/* Max range input */}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={currentRange.max}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  className={styles.sliderInput}
                  aria-label="Maximum price"
                />
              </div>

              <span className={styles.sliderLabel}>Max</span>
            </div>

            {/* Min and Max Price Inputs Side by Side */}
            <div className={styles.priceInputsRow}>
              {/* Min Price Input with +/- Buttons */}
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Min price</label>
                <div className={styles.priceInput}>
                  <motion.button
                    type="button"
                    onClick={() => decrement('min')}
                    className={styles.incrementButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Decrease minimum price"
                  >
                    −
                  </motion.button>
                  <input
                    type="number"
                    min={minPrice}
                    max={currentRange.max}
                    value={currentRange.min}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className={styles.input}
                    aria-label="Minimum price value"
                  />
                  <motion.button
                    type="button"
                    onClick={() => increment('min')}
                    className={styles.incrementButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Increase minimum price"
                  >
                    +
                  </motion.button>
                </div>
                <span className={styles.unit}>USD per night</span>
              </div>

              {/* Max Price Input with +/- Buttons */}
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Max price</label>
                <div className={styles.priceInput}>
                  <motion.button
                    type="button"
                    onClick={() => decrement('max')}
                    className={styles.incrementButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Decrease maximum price"
                  >
                    −
                  </motion.button>
                  <input
                    type="number"
                    min={currentRange.min}
                    max={maxPrice}
                    value={currentRange.max}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className={styles.input}
                    aria-label="Maximum price value"
                  />
                  <motion.button
                    type="button"
                    onClick={() => increment('max')}
                    className={styles.incrementButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Increase maximum price"
                  >
                    +
                  </motion.button>
                </div>
                <span className={styles.unit}>USD per night</span>
              </div>
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <motion.button
                key="reset-button"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={onReset}
                className={styles.resetButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reset Filter
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

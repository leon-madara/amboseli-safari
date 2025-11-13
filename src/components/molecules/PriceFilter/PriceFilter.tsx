'use client';

import { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    onRangeChange({
      min: newMin,
      max: Math.max(newMin, currentRange.max),
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    onRangeChange({
      min: Math.min(currentRange.min, newMax),
      max: newMax,
    });
  };

  const isFiltered = currentRange.min !== minPrice || currentRange.max !== maxPrice;

  return (
    <div className={styles.priceFilter}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.filterButton}
        aria-expanded={isExpanded}
      >
        <span className={styles.filterLabel}>
          💰 Price Range
          {isFiltered && (
            <span className={styles.activeIndicator}>
              ${currentRange.min} - ${currentRange.max}
            </span>
          )}
        </span>
        <svg
          className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ''}`}
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
        </svg>
      </button>

      {isExpanded && (
        <div className={styles.filterContent}>
          <div className={styles.rangeContainer}>
            <div className={styles.rangeInputs}>
              <div className={styles.inputGroup}>
                <label htmlFor="minPrice" className={styles.inputLabel}>
                  Min
                </label>
                <input
                  id="minPrice"
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={currentRange.min}
                  onChange={handleMinChange}
                  className={styles.input}
                />
              </div>

              <span className={styles.separator}>-</span>

              <div className={styles.inputGroup}>
                <label htmlFor="maxPrice" className={styles.inputLabel}>
                  Max
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={currentRange.max}
                  onChange={handleMaxChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.sliderContainer}>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={currentRange.min}
                onChange={handleMinChange}
                className={styles.slider}
                style={{
                  background: `linear-gradient(to right,
                    var(--color-border) 0%,
                    var(--color-border) ${((currentRange.min - minPrice) / (maxPrice - minPrice)) * 100}%,
                    var(--color-primary-terracotta) ${((currentRange.min - minPrice) / (maxPrice - minPrice)) * 100}%,
                    var(--color-primary-terracotta) ${((currentRange.max - minPrice) / (maxPrice - minPrice)) * 100}%,
                    var(--color-border) ${((currentRange.max - minPrice) / (maxPrice - minPrice)) * 100}%,
                    var(--color-border) 100%)`
                }}
              />
            </div>
          </div>

          {isFiltered && (
            <button onClick={onReset} className={styles.resetButton}>
              Reset Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}

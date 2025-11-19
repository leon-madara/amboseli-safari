'use client';

import { useState } from 'react';
import styles from './AmenitiesFilter.module.css';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface AmenitiesFilterProps {
  amenities: Amenity[];
  selectedAmenities: Set<string>;
  onToggleAmenity: (amenityId: string) => void;
  onClearAll: () => void;
}

export default function AmenitiesFilter({
  amenities,
  selectedAmenities,
  onToggleAmenity,
  onClearAll,
}: AmenitiesFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSelection = selectedAmenities.size > 0;

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.toggleButton}
        aria-expanded={isExpanded}
      >
        <span className={styles.toggleLabel}>
          🏨 Amenities
          {hasSelection && (
            <span className={styles.selectedCount}>({selectedAmenities.size})</span>
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
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.subtitle}>Select amenities to filter rooms</p>
            {hasSelection && (
              <button onClick={onClearAll} className={styles.clearButton}>
                Clear all
              </button>
            )}
          </div>

          <div className={styles.chipGrid}>
            {amenities.map((amenity) => {
              const isSelected = selectedAmenities.has(amenity.id);
              return (
                <button
                  key={amenity.id}
                  onClick={() => onToggleAmenity(amenity.id)}
                  className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`}
                  aria-pressed={isSelected}
                >
                  <span className={styles.chipIcon}>{amenity.icon}</span>
                  <span className={styles.chipName}>{amenity.name}</span>
                  {isSelected && (
                    <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

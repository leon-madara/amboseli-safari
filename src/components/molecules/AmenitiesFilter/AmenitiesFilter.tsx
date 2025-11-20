'use client';

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
  const hasSelection = selectedAmenities.size > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>
          <span className={styles.icon}>🏨</span>
          <span>Amenities</span>
        </span>
        {hasSelection && (
          <button onClick={onClearAll} className={styles.clearButton}>
            Clear all
          </button>
        )}
      </div>

      <p className={styles.subtitle}>Select amenities to filter rooms</p>

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
            </button>
          );
        })}
      </div>
    </div>
  );
}

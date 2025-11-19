'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './SortDropdown.module.css';

export type SortOption =
  | 'recommended'
  | 'price-low-high'
  | 'price-high-low'
  | 'rating'
  | 'size'
  | 'popular';

export interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: string }[] = [
  { value: 'recommended', label: 'Recommended', icon: '⭐' },
  { value: 'price-low-high', label: 'Price: Low to High', icon: '↑' },
  { value: 'price-high-low', label: 'Price: High to Low', icon: '↓' },
  { value: 'rating', label: 'Highest Rated', icon: '👍' },
  { value: 'size', label: 'Room Size', icon: '📏' },
  { value: 'popular', label: 'Most Popular', icon: '🔥' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value)!;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.triggerIcon}>{selectedOption.icon}</span>
        <span className={styles.triggerLabel}>
          Sort: <strong>{selectedOption.label}</strong>
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
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

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                role="option"
                aria-selected={isSelected}
              >
                <span className={styles.optionIcon}>{option.icon}</span>
                <span className={styles.optionLabel}>{option.label}</span>
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
      )}
    </div>
  );
}

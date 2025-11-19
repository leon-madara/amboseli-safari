'use client';

import styles from './CategoryFilters.module.css';

interface Category {
  name: string;
  icon: string;
  count: number;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategories: Set<string>;
  onToggleCategory: (category: string) => void;
  onClearAll: () => void;
}

export default function CategoryFilters({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearAll,
}: CategoryFiltersProps) {
  const hasSelection = selectedCategories.size > 0;
  const allSelected = selectedCategories.size === categories.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.titleIcon} aria-hidden="true">
            🏷️
          </span>
          Filter by Category
        </h3>
        {hasSelection && !allSelected && (
          <button onClick={onClearAll} className={styles.clearButton} aria-label="Clear all filters">
            <span>Clear All</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 4L4 10M4 4l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.filters}>
        {categories.map((category) => {
          const isSelected = selectedCategories.has(category.name);
          return (
            <button
              key={category.name}
              onClick={() => onToggleCategory(category.name)}
              className={`${styles.filterChip} ${isSelected ? styles.active : ''}`}
              aria-label={`${isSelected ? 'Remove' : 'Add'} ${category.name} filter`}
              aria-pressed={isSelected}
            >
              <span className={styles.chipIcon} aria-hidden="true">
                {category.icon}
              </span>
              <span className={styles.chipName}>{category.name}</span>
              <span className={styles.chipCount}>{category.count}</span>
            </button>
          );
        })}
      </div>

      {hasSelection && !allSelected && (
        <div className={styles.statusBar}>
          <span className={styles.statusText}>
            Showing {selectedCategories.size} of {categories.length} categories
          </span>
        </div>
      )}
    </div>
  );
}

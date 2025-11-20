'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import RestaurantCard from '@/components/molecules/RestaurantCard/RestaurantCard';
import type { Restaurant } from '@/data/dining';
import styles from './RestaurantGrid.module.css';

type FilterType = 'all' | 'fine-dining' | 'casual' | 'bar';
type SortType = 'featured' | 'name';

interface RestaurantGridProps {
  restaurants: Restaurant[];
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('featured');

  const filteredAndSorted = useMemo(() => {
    let result = [...restaurants];

    // For future: when restaurant data includes category field
    // if (filter !== 'all') {
    //   result = result.filter(r => r.category === filter);
    // }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // 'featured' - keep original order
        break;
    }

    return result;
  }, [restaurants, filter, sortBy]);

  return (
    <div className={styles.wrapper}>
      {/* Filter Controls */}
      <motion.div
        className={styles.controls}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.filterGroup}>
          <h3 className={styles.controlsLabel}>Filter by Type</h3>
          <div className={styles.filterButtons}>
            {(['all', 'fine-dining', 'casual', 'bar'] as FilterType[]).map((type) => (
              <button
                key={type}
                className={`${styles.filterButton} ${
                  filter === type ? styles.filterButtonActive : ''
                }`}
                onClick={() => setFilter(type)}
              >
                {type === 'all' ? 'All Dining' : type.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sortGroup}>
          <label htmlFor="sort" className={styles.controlsLabel}>
            Sort by
          </label>
          <select
            id="sort"
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
          >
            <option value="featured">Featured</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </motion.div>

      {/* Asymmetric Grid */}
      <div className={styles.grid}>
        {filteredAndSorted.map((restaurant, index) => (
          <div
            key={index}
            className={`${styles.gridItem} ${
              index === 0 ? styles.gridItemFeatured : ''
            }`}
          >
            <RestaurantCard restaurant={restaurant} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

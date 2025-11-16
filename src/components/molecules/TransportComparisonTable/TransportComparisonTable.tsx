'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TransferOption } from '@/data/locationData';
import styles from './TransportComparisonTable.module.css';

export interface TransportComparisonTableProps {
  options: TransferOption[];
}

// Helper functions to calculate ratings
function getComfortLevel(type: string): string {
  const levels: Record<string, string> = {
    'Private Car': '⭐⭐⭐⭐⭐',
    'Flight': '⭐⭐⭐⭐⭐',
    'Shared Shuttle': '⭐⭐⭐',
    'Self-Drive': '⭐⭐⭐⭐',
  };
  return levels[type] || '⭐⭐⭐';
}

function getFlexibility(type: string): string {
  const levels: Record<string, string> = {
    'Private Car': 'Very High',
    'Flight': 'Medium',
    'Shared Shuttle': 'Low',
    'Self-Drive': 'Very High',
  };
  return levels[type] || 'Medium';
}

function getSceneryRating(type: string): string {
  const levels: Record<string, string> = {
    'Private Car': '⭐⭐⭐⭐',
    'Flight': '⭐⭐⭐⭐⭐',
    'Shared Shuttle': '⭐⭐⭐⭐',
    'Self-Drive': '⭐⭐⭐⭐⭐',
  };
  return levels[type] || '⭐⭐⭐';
}

export function TransportComparisonTable({
  options,
}: TransportComparisonTableProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    { key: 'duration', label: 'Duration', accessor: (opt: TransferOption) => opt.duration },
    { key: 'price', label: 'Price Range', accessor: (opt: TransferOption) => opt.priceRange },
    { key: 'comfort', label: 'Comfort Level', accessor: (opt: TransferOption) => getComfortLevel(opt.type) },
    { key: 'flexibility', label: 'Flexibility', accessor: (opt: TransferOption) => getFlexibility(opt.type) },
    { key: 'scenery', label: 'Scenery Views', accessor: (opt: TransferOption) => getSceneryRating(opt.type) },
  ];

  return (
    <div ref={ref} className={styles.comparisonContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th className={styles.featureHeader}>Feature</th>
              {options.map((option, index) => (
                <motion.th
                  key={option.id}
                  className={styles.optionHeader}
                  initial={{ opacity: 0, y: -20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={styles.optionIcon} aria-hidden="true">{option.icon}</div>
                  <div className={styles.optionName}>{option.name}</div>
                  {option.recommended && (
                    <span className={styles.recommendedBadge}>Best Value</span>
                  )}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, rowIndex) => (
              <motion.tr
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: rowIndex * 0.1 + 0.3 }}
              >
                <td className={styles.featureCell}>{feature.label}</td>
                {options.map(option => (
                  <td key={option.id} className={styles.valueCell}>
                    {feature.accessor(option)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface StaggeredGridProps {
  /**
   * Children elements to render in the grid
   */
  children: ReactNode;
  /**
   * Grid configuration (CSS grid-template-columns)
   */
  columns?: string;
  /**
   * Gap between items
   */
  gap?: string;
  /**
   * Base delay for first item
   */
  baseDelay?: number;
  /**
   * Delay increment between items
   */
  staggerDelay?: number;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
}

/**
 * StaggeredGrid adds staggered entrance animations to grid items
 * using Framer Motion. Respects user's motion preferences automatically.
 */
export default function StaggeredGrid({
  children,
  columns = 'repeat(auto-fit, minmax(280px, 1fr))',
  gap = 'var(--space-8)',
  baseDelay = 0.1,
  staggerDelay = 0.1,
  className = '',
  style = {},
}: StaggeredGridProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: gap,
        ...style,
      }}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: baseDelay + index * staggerDelay,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ height: '100%' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

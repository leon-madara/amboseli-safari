'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type AnimationVariant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';

export interface AnimatedSectionProps {
  /**
   * Content to animate
   */
  children: ReactNode;
  /**
   * Animation variant to use
   */
  variant?: AnimationVariant;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * AnimatedSection adds entrance animations to content using Framer Motion
 * Respects user's motion preferences automatically
 */
export default function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  // Animation variants
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

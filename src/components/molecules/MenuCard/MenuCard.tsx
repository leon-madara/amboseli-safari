'use client';

import { motion } from 'framer-motion';
import type { MenuCategory } from '@/data/dining';
import styles from './MenuCard.module.css';

interface MenuCardProps {
  menu: MenuCategory;
  index: number;
}

export default function MenuCard({ menu, index }: MenuCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className={styles.header}>
        <motion.div
          className={styles.iconContainer}
          initial={{ rotate: -10, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
        >
          <span className={styles.icon}>🍽️</span>
        </motion.div>
        <h3 className={styles.title}>{menu.category}</h3>
      </div>

      <ul className={styles.items}>
        {menu.items.map((item, idx) => (
          <motion.li
            key={idx}
            className={styles.item}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + idx * 0.05 }}
          >
            <span className={styles.bullet}>•</span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

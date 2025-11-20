'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StickyDiningNav.module.css';

export default function StickyDiningNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={styles.stickyNav}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.navContent}>
            <h2 className={styles.navTitle}>Dining Experiences</h2>
            <div className={styles.navLinks}>
              <button onClick={() => scrollToSection('restaurants')}>
                Restaurants
              </button>
              <button onClick={() => scrollToSection('menu')}>
                Menu
              </button>
              <button onClick={() => scrollToSection('experiences')}>
                Experiences
              </button>
              <a href="#book" className={styles.navCta}>
                Reserve Now
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

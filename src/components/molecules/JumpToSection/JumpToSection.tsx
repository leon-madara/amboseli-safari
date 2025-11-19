'use client';

import { useState, useEffect } from 'react';
import styles from './JumpToSection.module.css';

interface Category {
  name: string;
  icon: string;
  id: string;
}

interface JumpToSectionProps {
  categories: Category[];
}

export default function JumpToSection({ categories }: JumpToSectionProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if sticky
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 400);

      // Find active section based on scroll position
      const sectionElements = categories.map((cat) => ({
        id: cat.id,
        element: document.getElementById(cat.id),
      }));

      // Find the section that's currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // If section is in viewport (with some offset for the sticky nav)
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`${styles.jumpNav} ${isSticky ? styles.sticky : ''}`}
      aria-label="Jump to FAQ section"
    >
      <div className={styles.container}>
        <div className={styles.label}>Jump to:</div>
        <div className={styles.categoriesList}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className={`${styles.categoryButton} ${
                activeSection === category.id ? styles.active : ''
              }`}
              aria-label={`Jump to ${category.name}`}
            >
              <span className={styles.icon} aria-hidden="true">
                {category.icon}
              </span>
              <span className={styles.name}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

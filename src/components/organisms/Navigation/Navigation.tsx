'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import MobileMenu from './MobileMenu';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Only show blurry background on home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Hide navigation while scrolling (any direction)
      setIsVisible(false);

      // Show after 1 second of no scrolling
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <nav className={`${styles.navigation} ${isHomePage ? styles.blurryBg : ''} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.container}>
        {/* Logo - Left */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/logos/mainLOGOAmboseli.svg"
            alt="Amboseli Safari Club"
            width={120}
            height={40}
            className={styles.logo}
            priority
          />
        </Link>

        {/* Navigation Links - Center */}
        <div className={styles.desktop}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/accommodations" className={styles.navLink}>Accommodations</Link>
          <Link href="/experiences" className={styles.navLink}>Experiences</Link>
          <Link href="/dining" className={styles.navLink}>Dining</Link>
          <Link href="/wellness" className={styles.navLink}>Wellness</Link>
          <Link href="/location" className={styles.navLink}>Location</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/faq" className={styles.navLink}>FAQ</Link>
        </div>

        {/* CTA Button - Right */}
        <div className={styles.ctaGroup}>
          <Link href="/contact" className={styles.ctaButton}>Book Now</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </nav>
  );
}

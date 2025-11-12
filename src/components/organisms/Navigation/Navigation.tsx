'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import MobileMenu from './MobileMenu';
import styles from './Navigation.module.css';

// Page-specific color mapping
const pageColors: Record<string, string> = {
  '/': 'var(--color-primary-terracotta)',
  '/accommodations': 'var(--color-secondary-deep-green)',
  '/experiences': 'var(--color-primary-ochre)',
  '/dining': 'var(--color-accent-amber)',
  '/wellness': 'var(--color-secondary-sage)',
  '/location': 'var(--color-primary-sand-dark)',
  '/about': 'var(--color-neutral-charcoal)',
  '/faq': 'var(--color-primary-terracotta-light)',
  '/contact': 'var(--color-secondary-grass-dark)',
};

type NavState = 'idle' | 'scrolling' | 'hidden';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navState, setNavState] = useState<NavState>('idle');
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();
  const navBgColor = pageColors[pathname] || pageColors['/'];

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Throttle scroll handling with requestAnimationFrame
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Clear existing hide timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }

        if (scrollY === 0) {
          // At top of page - return to idle
          setNavState('idle');
        } else {
          // Scrolling - set to scrolling state
          setNavState('scrolling');

          // Start 1-second timeout to hide after scroll stops
          scrollTimeoutRef.current = setTimeout(() => {
            setNavState('hidden');
            scrollTimeoutRef.current = null;
          }, 1000);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize state based on current scroll position
    if (window.scrollY === 0) {
      setNavState('idle');
    } else {
      setNavState('scrolling');
      scrollTimeoutRef.current = setTimeout(() => {
        setNavState('hidden');
      }, 1000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Map state to CSS class
  const navStateClass =
    navState === 'idle'
      ? ''
      : navState === 'scrolling'
        ? styles.scrolling
        : styles.hidden;

  return (
    <nav
      className={`${styles.navigation} ${navStateClass}`}
      data-state={navState}
      style={
        {
          '--nav-bg': navBgColor,
        } as React.CSSProperties
      }
    >
      <div className={styles.container}>
        {/* Logo - Left */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/logos/mainLOGOAmboseli.svg"
            alt="Amboseli Safari Club"
            width={90}
            height={30}
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

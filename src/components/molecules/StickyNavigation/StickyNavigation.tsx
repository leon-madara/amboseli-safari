'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import { useChapterProgress } from '@/hooks/useChapterProgress';
import styles from './StickyNavigation.module.css';

/**
 * StickyNavigation Component Props
 */
export interface StickyNavigationProps {
  className?: string;
  showAfterVh?: number; // Show navigation after scrolling past this vh value
}

/**
 * Navigation link configuration
 */
interface NavLink {
  href: string;
  label: string;
}

/**
 * Navigation links data (matching existing Navigation component)
 */
const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/accommodations', label: 'Accommodations' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/dining', label: 'Dining' },
  { href: '/wellness', label: 'Wellness' },
  { href: '/location', label: 'Location' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

/**
 * StickyNavigation Molecule Component
 * 
 * A sticky navigation bar that appears after scrolling past the hero section.
 * Features auto-hide behavior when scrolling up and a blur background effect.
 * 
 * Features:
 * - Appears after scrolling past hero (100vh by default)
 * - Auto-hides when scrolling up for immersive experience
 * - Shows when scrolling down
 * - Blur background effect for premium feel
 * - Integrates with existing navigation structure
 * - Compact design (60px height)
 * - Responsive with mobile menu toggle
 * 
 * @example
 * <StickyNavigation showAfterVh={100} />
 */
export function StickyNavigation({
  className = '',
  showAfterVh = 100,
}: StickyNavigationProps) {
  const { scrollVh, scrollY } = useChapterProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Determine if navigation should be visible based on scroll position
    const shouldBeVisible = scrollVh >= showAfterVh;
    setIsVisible(shouldBeVisible);

    // Auto-hide logic: hide when scrolling up, show when scrolling down
    if (shouldBeVisible) {
      const scrollDelta = scrollY - lastScrollY;
      
      // Only hide if scrolling up more than 5px (prevents jitter)
      if (scrollDelta < -5) {
        setIsHidden(true);
      } else if (scrollDelta > 5) {
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }

    setLastScrollY(scrollY);
  }, [scrollVh, scrollY, showAfterVh, lastScrollY]);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = () => setMobileMenuOpen(false);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`${styles.stickyNavigation} ${
        isVisible ? styles.visible : ''
      } ${isHidden ? styles.hidden : ''} ${className}`}
      aria-label="Sticky navigation"
    >
      <div className={styles.container}>
        {/* Logo - Left */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/logos/mainLOGOAmboseli.svg"
            alt="Amboseli Safari Club"
            width={140}
            height={47}
            className={styles.logo}
          />
        </Link>

        {/* Navigation Links - Center (Desktop) */}
        <div className={styles.desktop}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button - Right */}
        <div className={styles.ctaGroup}>
          <Link href="/contact" className={styles.ctaButton}>
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={styles.mobileCtaButton}
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

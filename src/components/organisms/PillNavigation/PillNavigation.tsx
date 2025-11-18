'use client';

import { useState, useEffect, useCallback, useRef, useMemo, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationPill from '@/components/molecules/NavigationPill/NavigationPill';
import { useScrollBlur } from '@/hooks/useScrollBlur';
import { NAVIGATION_ITEMS, LOGO_CONFIG, CTA_BUTTON_CONFIG, NavigationItem } from '@/data/navigation';
import styles from './PillNavigation.module.css';

export interface PillNavigationProps {
  logoSrc?: string;
  logoAlt?: string;
  items?: NavigationItem[];
  activeItem?: string;
  className?: string;
}

export default function PillNavigation({
  logoSrc = LOGO_CONFIG.src,
  logoAlt = LOGO_CONFIG.alt,
  items = NAVIGATION_ITEMS,
  activeItem: activeItemProp,
  className = '',
}: PillNavigationProps) {
  const pathname = usePathname();
  const { blurLevel, isAtTop, isScrolling } = useScrollBlur();
  const [activeItem, setActiveItem] = useState<string | undefined>(activeItemProp || 'home');
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Memoize navigation items to prevent unnecessary re-renders
  // Handle missing navigation data gracefully
  const memoizedItems = useMemo(() => {
    if (!items || items.length === 0) {
      console.warn('PillNavigation: No navigation items provided, using defaults');
      return NAVIGATION_ITEMS;
    }
    return items;
  }, [items]);
  
  // Memoize logo configuration to prevent unnecessary re-renders
  // Handle missing logo data gracefully
  const memoizedLogoConfig = useMemo(() => {
    const config = {
      src: logoSrc || LOGO_CONFIG.src,
      alt: logoAlt || LOGO_CONFIG.alt,
      width: LOGO_CONFIG.width,
      height: LOGO_CONFIG.height,
    };
    
    if (!config.src) {
      console.warn('PillNavigation: No logo source provided, using default');
    }
    
    return config;
  }, [logoSrc, logoAlt]);

  // Determine scroll state for NavigationPill (memoized)
  const scrollState = useMemo(
    () => (isAtTop ? 'top' : isScrolling ? 'scrolling' : 'idle'),
    [isAtTop, isScrolling]
  );

  // Detect active item from URL or scroll position (using memoized items)
  useEffect(() => {
    if (!activeItemProp) {
      // Check if items are hash-based (section links)
      const isHashBased = memoizedItems.some(item => item.href.startsWith('#'));
      
      if (isHashBased) {
        // For hash-based navigation, detect active section from scroll position
        const handleScroll = () => {
          const sections = memoizedItems.map(item => {
            const sectionId = item.href.replace('#', '');
            const element = document.getElementById(sectionId);
            return { id: item.id, element, sectionId };
          }).filter(s => s.element);

          // Find the section currently in view
          const scrollPosition = window.scrollY + window.innerHeight / 3;
          
          // If at the very top of the page (within 100px), default to 'home'
          if (window.scrollY < 100) {
            setActiveItem('home');
            return;
          }
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section.element && section.element.offsetTop <= scrollPosition) {
              setActiveItem(section.id);
              return;
            }
          }
          
          // Default to 'home' if no section is in view
          setActiveItem('home');
        };

        // Initial check
        handleScroll();
        
        // Listen for scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      } else {
        // For route-based navigation, match by pathname
        const matchedItem = memoizedItems.find((item) => {
          if (item.href === '/' && pathname === '/') {
            return true;
          }
          if (item.href !== '/' && pathname.startsWith(item.href)) {
            return true;
          }
          return false;
        });
        setActiveItem(matchedItem?.id || 'home');
      }
    } else {
      setActiveItem(activeItemProp);
    }
  }, [pathname, memoizedItems, activeItemProp]);

  // Handle item click
  const handleItemClick = useCallback((itemId: string) => {
    setActiveItem(itemId);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!navItemsRef.current) return;

      const navLinks = Array.from(
        navItemsRef.current.querySelectorAll('a[role="link"]')
      ) as HTMLAnchorElement[];

      if (navLinks.length === 0) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (focusedIndex + 1) % navLinks.length;
          navLinks[nextIndex]?.focus();
          setFocusedIndex(nextIndex);
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = focusedIndex <= 0 ? navLinks.length - 1 : focusedIndex - 1;
          navLinks[prevIndex]?.focus();
          setFocusedIndex(prevIndex);
          break;

        case 'Home':
          e.preventDefault();
          navLinks[0]?.focus();
          setFocusedIndex(0);
          break;

        case 'End':
          e.preventDefault();
          const lastIndex = navLinks.length - 1;
          navLinks[lastIndex]?.focus();
          setFocusedIndex(lastIndex);
          break;
      }
    },
    [focusedIndex]
  );

  return (
    <div className={`${styles.pillNavigation} ${className}`}>
      {/* Logo - positioned separately */}
      <div className={styles.logoContainer}>
        <a href="/" aria-label="Amboseli Safari Club Home">
          <Image
            src={memoizedLogoConfig.src}
            alt={memoizedLogoConfig.alt}
            width={memoizedLogoConfig.width}
            height={memoizedLogoConfig.height}
            priority
            className={styles.logo}
          />
        </a>
      </div>

      {/* Navigation Pill - centered */}
      <div
        className={styles.pillContainer}
        ref={navItemsRef}
        onKeyDown={handleKeyDown}
      >
        <NavigationPill
          items={memoizedItems}
          activeItem={activeItem}
          blurLevel={blurLevel}
          scrollState={scrollState}
          onItemClick={handleItemClick}
        />
      </div>

      {/* CTA Button - positioned on the right */}
      <div className={styles.ctaContainer}>
        <Link href={CTA_BUTTON_CONFIG.href} className={styles.ctaButton}>
          {CTA_BUTTON_CONFIG.label}
        </Link>
      </div>
    </div>
  );
}

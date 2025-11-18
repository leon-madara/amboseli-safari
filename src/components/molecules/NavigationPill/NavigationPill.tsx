'use client';

import { useState, useEffect, useMemo, memo, useRef } from 'react';
import NavItem from '@/components/atoms/NavItem/NavItem';
import { NavigationItem } from '@/data/navigation';
import styles from './NavigationPill.module.css';

export interface NavigationPillProps {
  items: NavigationItem[];
  activeItem?: string;
  blurLevel: number;
  scrollState?: 'scrolling' | 'idle' | 'top';
  onItemClick?: (itemId: string) => void;
}

function NavigationPill({
  items,
  activeItem,
  blurLevel,
  scrollState = 'top',
  onItemClick,
}: NavigationPillProps) {
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState(true);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Check for backdrop-filter support
    const hasSupport =
      CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
    setSupportsBackdropFilter(hasSupport);
  }, []);

  // Update sliding indicator position when active item changes
  useEffect(() => {
    if (activeItem && itemRefs.current.has(activeItem)) {
      const activeElement = itemRefs.current.get(activeItem);
      const navElement = navRef.current;
      
      if (activeElement && navElement) {
        const navRect = navElement.getBoundingClientRect();
        const itemRect = activeElement.getBoundingClientRect();
        
        setIndicatorStyle({
          width: `${itemRect.width}px`,
          transform: `translateX(${itemRect.left - navRect.left}px)`,
        });
      }
    }
  }, [activeItem, items]);

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      try {
        onItemClick(itemId);
      } catch (error) {
        console.error('NavigationPill: Error handling item click', error);
      }
    }
  };

  // Memoize inline styles to prevent unnecessary recalculations
  const pillStyles = useMemo(
    () => ({
      '--blur-amount': `${blurLevel}px`,
    } as React.CSSProperties),
    [blurLevel]
  );

  // Handle missing items data gracefully
  if (!items || items.length === 0) {
    console.warn('NavigationPill: No items provided');
    return null;
  }

  return (
    <nav
      className={`${styles.navigationPill} ${!supportsBackdropFilter ? styles.fallback : ''}`}
      style={pillStyles}
      data-scroll-state={scrollState}
      aria-label="Main navigation"
    >
      <ul className={styles.itemList} ref={navRef}>
        {/* Sliding active indicator */}
        <div 
          className={styles.activeIndicator} 
          style={indicatorStyle}
          aria-hidden="true"
        />
        
        {items.map((item) => (
          <li 
            key={item.id} 
            className={styles.itemWrapper}
            ref={(el) => {
              if (el) {
                itemRefs.current.set(item.id, el);
              } else {
                itemRefs.current.delete(item.id);
              }
            }}
          >
            <NavItem
              label={item.label}
              href={item.href}
              isActive={activeItem === item.id}
              onClick={() => handleItemClick(item.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(NavigationPill);

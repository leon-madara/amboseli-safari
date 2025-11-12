'use client';

import { useState } from 'react';
import Link from '@/components/atoms/Link';
import { mainNavigation, type NavItem } from '@/data/navigation';
import styles from './Navigation.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const toggleItem = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);

    return (
      <div key={item.label} className={styles.mobileMenuItem}>
        {hasChildren ? (
          <>
            <button
              className={styles.mobileMenuButton}
              onClick={() => toggleItem(item.label)}
              aria-expanded={isExpanded}
            >
              <span>{item.label}</span>
              <svg
                className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isExpanded && (
              <div className={styles.mobileSubMenu}>
                {item.children.map(child => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={onClose}
                    className={styles.mobileSubMenuItem}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <Link href={item.href} onClick={onClose} className={styles.mobileMenuLink}>
            {item.label}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className={styles.mobileMenu} onClick={onClose}>
      <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {mainNavigation.map(item => renderNavItem(item))}
        </nav>
      </div>
    </div>
  );
}

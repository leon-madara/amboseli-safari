import Link from 'next/link';
import { MouseEvent, KeyboardEvent, memo } from 'react';
import styles from './NavItem.module.css';

export interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavItem({ label, href, isActive, onClick }: NavItemProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Handle hash-based navigation with smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      const element = document.getElementById(sectionId);
      
      if (element) {
        // Use smooth scroll with fallback for browsers that don't support it
        try {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
          // Fallback for older browsers (including some mobile browsers)
          element.scrollIntoView({ block: 'start' });
        }
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      
      // Handle hash-based navigation with smooth scroll
      if (href.startsWith('#')) {
        const sectionId = href.replace('#', '');
        const element = document.getElementById(sectionId);
        
        if (element) {
          // Use smooth scroll with fallback for browsers that don't support it
          try {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (error) {
            // Fallback for older browsers
            element.scrollIntoView({ block: 'start' });
          }
        }
      }
      
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <Link
      href={href}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-current={isActive ? 'page' : undefined}
      role="link"
      tabIndex={0}
    >
      {label}
    </Link>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(NavItem);

'use client';

import Link from '@/components/atoms/Link';
import styles from './Navigation.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileMenuContent}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
        <Link href="/" onClick={onClose}>
          Home
        </Link>
        <Link href="/accommodations" onClick={onClose}>
          Accommodations
        </Link>
        <Link href="/experiences" onClick={onClose}>
          Experiences
        </Link>
        <Link href="/dining" onClick={onClose}>
          Dining
        </Link>
        <Link href="/wellness" onClick={onClose}>
          Wellness
        </Link>
        <Link href="/location" onClick={onClose}>
          Location
        </Link>
        <Link href="/about" onClick={onClose}>
          About
        </Link>
        <Link href="/faq" onClick={onClose}>
          FAQ
        </Link>
        <Link href="/contact" onClick={onClose}>
          Contact
        </Link>
      </div>
    </div>
  );
}

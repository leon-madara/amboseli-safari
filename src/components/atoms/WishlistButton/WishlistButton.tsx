'use client';

import { useState, useEffect } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import styles from './WishlistButton.module.css';

export interface WishlistButtonProps {
  roomSlug: string;
  roomTitle: string;
  variant?: 'icon' | 'full';
}

export default function WishlistButton({
  roomSlug,
  roomTitle,
  variant = 'icon',
}: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isFavorited = isInWishlist(roomSlug);

  const handleToggle = () => {
    if (isFavorited) {
      removeFromWishlist(roomSlug);
      setToastMessage('Removed from wishlist');
    } else {
      addToWishlist(roomSlug);
      setToastMessage('Added to wishlist');
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`
          ${styles.button}
          ${variant === 'full' ? styles.buttonFull : styles.buttonIcon}
          ${isFavorited ? styles.favorited : ''}
          ${isAnimating ? styles.animating : ''}
        `}
        aria-label={isFavorited ? `Remove ${roomTitle} from wishlist` : `Add ${roomTitle} to wishlist`}
        aria-pressed={isFavorited}
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill={isFavorited ? 'currentColor' : 'none'}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {variant === 'full' && (
          <span className={styles.label}>
            {isFavorited ? 'Saved' : 'Save'}
          </span>
        )}
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className={styles.toast}>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

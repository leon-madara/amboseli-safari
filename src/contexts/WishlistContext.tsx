'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
  wishlist: Set<string>;
  addToWishlist: (roomSlug: string) => void;
  removeFromWishlist: (roomSlug: string) => void;
  isInWishlist: (roomSlug: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'amboseli-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setWishlist(new Set(parsed));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(Array.from(wishlist)));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    }
  }, [wishlist, isHydrated]);

  const addToWishlist = (roomSlug: string) => {
    setWishlist((prev) => new Set(prev).add(roomSlug));
  };

  const removeFromWishlist = (roomSlug: string) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      newSet.delete(roomSlug);
      return newSet;
    });
  };

  const isInWishlist = (roomSlug: string) => {
    return wishlist.has(roomSlug);
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount: wishlist.size,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

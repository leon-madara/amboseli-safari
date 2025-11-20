/**
 * Utilities for saving and restoring scroll positions
 * Used to maintain horizontal scroll position on browser back button
 */

const SCROLL_POSITION_KEY = 'timeline_scroll_position';
const ACTIVE_CHAPTER_KEY = 'timeline_active_chapter';

export interface ScrollPosition {
  horizontal: number;
  vertical: number;
  activeChapter?: string;
  timestamp: number;
}

/**
 * Save current scroll position to sessionStorage
 */
export function saveScrollPosition(horizontal: number, vertical: number, activeChapter?: string): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;

  const position: ScrollPosition = {
    horizontal,
    vertical,
    activeChapter,
    timestamp: Date.now(),
  };

  try {
    sessionStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(position));
  } catch (error) {
    console.warn('Failed to save scroll position:', error);
  }
}

/**
 * Get saved scroll position from sessionStorage
 */
export function getSavedScrollPosition(): ScrollPosition | null {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;

  try {
    const saved = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (!saved) return null;

    const position: ScrollPosition = JSON.parse(saved);

    // Invalidate if older than 5 minutes
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - position.timestamp > fiveMinutes) {
      clearScrollPosition();
      return null;
    }

    return position;
  } catch (error) {
    console.warn('Failed to retrieve scroll position:', error);
    return null;
  }
}

/**
 * Clear saved scroll position
 */
export function clearScrollPosition(): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;

  try {
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
    sessionStorage.removeItem(ACTIVE_CHAPTER_KEY);
  } catch (error) {
    console.warn('Failed to clear scroll position:', error);
  }
}

/**
 * Save active chapter separately (lightweight)
 */
export function saveActiveChapter(chapterId: string): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;

  try {
    sessionStorage.setItem(ACTIVE_CHAPTER_KEY, chapterId);
  } catch (error) {
    console.warn('Failed to save active chapter:', error);
  }
}

/**
 * Get saved active chapter
 */
export function getSavedActiveChapter(): string | null {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;

  try {
    return sessionStorage.getItem(ACTIVE_CHAPTER_KEY);
  } catch (error) {
    console.warn('Failed to retrieve active chapter:', error);
    return null;
  }
}

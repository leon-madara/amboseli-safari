'use client';

import styles from './ViewToggle.module.css';

export type ViewMode = 'grid' | 'list';

export interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className={styles.container} role="radiogroup" aria-label="View mode">
      <button
        onClick={() => onChange('grid')}
        className={`${styles.button} ${view === 'grid' ? styles.buttonActive : ''}`}
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
        role="radio"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
          <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={styles.label}>Grid</span>
      </button>

      <button
        onClick={() => onChange('list')}
        className={`${styles.button} ${view === 'list' ? styles.buttonActive : ''}`}
        aria-label="List view"
        aria-pressed={view === 'list'}
        role="radio"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
          <line x1="8" y1="6" x2="21" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="8" y1="12" x2="21" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="8" y1="18" x2="21" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={styles.label}>List</span>
      </button>
    </div>
  );
}

'use client';

import styles from './ExpandCollapseControls.module.css';

interface ExpandCollapseControlsProps {
  isExpanded: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  totalQuestions: number;
}

export default function ExpandCollapseControls({
  isExpanded,
  onExpandAll,
  onCollapseAll,
  totalQuestions,
}: ExpandCollapseControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.info}>
        <span className={styles.count}>{totalQuestions}</span>
        <span className={styles.label}>Total Questions</span>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={onExpandAll}
          className={`${styles.button} ${isExpanded ? styles.active : ''}`}
          aria-label="Expand all FAQs"
          disabled={isExpanded}
        >
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M8 3v10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Expand All</span>
        </button>
        <button
          onClick={onCollapseAll}
          className={`${styles.button} ${!isExpanded ? styles.active : ''}`}
          aria-label="Collapse all FAQs"
          disabled={!isExpanded}
        >
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Collapse All</span>
        </button>
      </div>
    </div>
  );
}

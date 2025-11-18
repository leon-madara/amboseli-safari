'use client';

import Link from 'next/link';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export default function EmptyState({
  title = 'No Experiences Available',
  message = 'We are currently updating our experiences. Please check back soon or return to the homepage to explore other offerings.',
  linkText = 'Return to Home',
  linkHref = '/',
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <path
            d="M40 20C28.954 20 20 28.954 20 40C20 51.046 28.954 60 40 60C51.046 60 60 51.046 60 40C60 28.954 51.046 20 40 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="M40 30V40L46 46"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <Link href={linkHref} className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
}

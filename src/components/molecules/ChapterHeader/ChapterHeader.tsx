'use client';

import styles from './ChapterHeader.module.css';

interface ChapterHeaderProps {
  icon: string;
  title: string;
  time: string;
  description: string;
}

export function ChapterHeader({ icon, title, time, description }: ChapterHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.iconContainer}>
        <span className={styles.icon} aria-hidden="true">{icon}</span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.time}>{time}</p>
      <p className={styles.description}>{description}</p>
    </header>
  );
}

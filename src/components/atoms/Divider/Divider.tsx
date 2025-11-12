import styles from './Divider.module.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Divider({
  orientation = 'horizontal',
  className = '',
}: DividerProps) {
  return (
    <hr
      className={`${styles.divider} ${styles[orientation]} ${className}`}
      aria-hidden="true"
    />
  );
}

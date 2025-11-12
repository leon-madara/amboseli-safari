import { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

export default function Label({
  children,
  required = false,
  className = '',
  ...props
}: LabelProps) {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}

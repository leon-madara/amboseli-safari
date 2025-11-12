import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import styles from './Link.module.css';

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'underline';
  className?: string;
}

export default function Link({
  children,
  variant = 'default',
  className = '',
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={`${styles.link} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </NextLink>
  );
}

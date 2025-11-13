import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode, CSSProperties } from 'react';
import styles from './Link.module.css';

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'underline' | 'secondary';
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
}

export default function Link({
  children,
  variant = 'default',
  className = '',
  style,
  target,
  rel,
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={`${styles.link} ${styles[variant]} ${className}`}
      style={style}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </NextLink>
  );
}

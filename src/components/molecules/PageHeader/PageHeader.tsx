'use client';

import Link from 'next/link';
import styles from './PageHeader.module.css';

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol 
              className={styles.breadcrumbList}
              itemScope 
              itemType="https://schema.org/BreadcrumbList"
            >
              {breadcrumbs.map((crumb, index) => (
                <li
                  key={crumb.href}
                  className={styles.breadcrumbItem}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {index < breadcrumbs.length - 1 ? (
                    <>
                      <Link 
                        href={crumb.href} 
                        className={styles.breadcrumbLink}
                        itemProp="item"
                      >
                        <span itemProp="name">{crumb.label}</span>
                      </Link>
                      <meta itemProp="position" content={String(index + 1)} />
                      <span className={styles.breadcrumbSeparator} aria-hidden="true">
                        /
                      </span>
                    </>
                  ) : (
                    <>
                      <span 
                        className={styles.breadcrumbCurrent}
                        itemProp="item"
                        aria-current="page"
                      >
                        <span itemProp="name">{crumb.label}</span>
                      </span>
                      <meta itemProp="position" content={String(index + 1)} />
                    </>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}

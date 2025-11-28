'use client';

import { useState, useMemo, useEffect } from 'react';
import AccordionGroup from '@/components/organisms/AccordionGroup';
import ExpandCollapseControls from '@/components/molecules/ExpandCollapseControls';
import { FAQ } from '@/types/faq';
import styles from './FAQSearchAndContent.module.css';

interface FAQSearchAndContentProps {
  faqs: FAQ[];
  categoryConfig: Record<string, { icon: string; description: string }>;
}

export default function FAQSearchAndContent({
  faqs,
  categoryConfig,
}: FAQSearchAndContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // -- Search Logic --
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          (faq.category?.toLowerCase().includes(query) ?? false)
      );
    }
    return filtered;
  }, [faqs, searchQuery]);

  const faqsByCategory = useMemo(() => {
    return filteredFaqs.reduce((acc, faq) => {
      const category = faq.category ?? 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  }, [filteredFaqs]);

  const categories = Object.keys(faqsByCategory);
  const hasResults = filteredFaqs.length > 0;

  // -- Scroll Spy & Navigation Logic --
  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
    if (element) {
      // Offset for sticky header/nav
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveCategory(category);
    }
  };

  // Simple scroll spy to update active category
  useEffect(() => {
    const handleScroll = () => {
      // Find the category section closest to the top
      let currentCategory = null;
      
      for (const category of categories) {
        const element = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the upper part of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentCategory = category;
            break;
          }
        }
      }
      
      if (currentCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  // Handle URL hash for deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(`faq-${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Desktop Sidebar */}
      {hasResults && (
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Categories</h3>
          <nav className={styles.categoryNav}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`${styles.categoryLink} ${
                  activeCategory === category ? styles.active : ''
                }`}
                aria-label={`Scroll to ${category}`}
              >
                <span className={styles.categoryLinkIcon} aria-hidden="true">
                  {categoryConfig[category]?.icon || '❓'}
                </span>
                {category}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className={styles.contentArea}>
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <div className={styles.searchIconWrapper}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search specific questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearButton}
                aria-label="Clear search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className={styles.searchResults}>
              {hasResults
                ? `Found ${filteredFaqs.length} results`
                : 'No results found'}
            </p>
          )}
        </div>

        {/* Mobile Categories (Horizontal Scroll) */}
        {hasResults && (
          <div className={styles.mobileCategories}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`${styles.mobileCategoryChip} ${
                  activeCategory === category ? styles.active : ''
                }`}
              >
                <span>{categoryConfig[category]?.icon || '❓'}</span>
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Sections */}
        {hasResults ? (
          <>
            <ExpandCollapseControls
              isExpanded={expandAll}
              onExpandAll={() => setExpandAll(true)}
              onCollapseAll={() => setExpandAll(false)}
              totalQuestions={filteredFaqs.length}
            />

            {categories.map((category) => (
              <section
                key={category}
                id={`category-${category.replace(/\s+/g, '-')}`}
                className={styles.categorySection}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon} aria-hidden="true">
                    {categoryConfig[category]?.icon || '❓'}
                  </span>
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  <span className={styles.countBadge}>
                    {faqsByCategory[category].length} Qs
                  </span>
                </div>

                <AccordionGroup
                  items={faqsByCategory[category].map((faq) => ({
                    id: faq.id,
                    title: faq.question,
                    content: faq.answer,
                  }))}
                  expandAll={expandAll}
                />
              </section>
            ))}
          </>
        ) : (
          /* No Results State */
          <div className={styles.noResults}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 className={styles.noResultsTitle}>No questions found</h3>
            <p className={styles.noResultsText}>
              We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className={styles.clearSearchButton}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

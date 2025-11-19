'use client';

import { useState, useMemo } from 'react';
import AccordionGroup from '@/components/organisms/AccordionGroup';
import JumpToSection from '@/components/molecules/JumpToSection';
import PopularQuestions from '@/components/molecules/PopularQuestions';
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

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs;
    }

    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        (faq.category?.toLowerCase().includes(query) ?? false)
    );
  }, [faqs, searchQuery]);

  // Group filtered FAQs by category
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
  const isSearching = searchQuery.trim().length > 0;

  // Prepare categories for JumpToSection
  const jumpCategories = categories.map((category) => ({
    name: category,
    icon: categoryConfig[category]?.icon || '❓',
    id: category.toLowerCase().replace(/\s+/g, '-'),
  }));

  // Popular questions - highlight important FAQs
  const popularQuestions = [
    {
      id: 'booking-1',
      question: 'How do I make a reservation?',
      categoryId: 'booking-&-reservations',
      icon: '📅',
    },
    {
      id: 'safari-2',
      question: 'When is the best time to visit?',
      categoryId: 'safari-experiences',
      icon: '🦁',
    },
    {
      id: 'booking-2',
      question: 'What is your cancellation policy?',
      categoryId: 'booking-&-reservations',
      icon: '📋',
    },
    {
      id: 'safari-3',
      question: 'Will I see elephants and other wildlife?',
      categoryId: 'safari-experiences',
      icon: '🐘',
    },
    {
      id: 'location-1',
      question: 'How do I get to Amboseli Safari Club?',
      categoryId: 'travel-&-location',
      icon: '✈️',
    },
  ];

  return (
    <>
      {/* Popular Questions - Only show when not searching */}
      {!isSearching && <PopularQuestions questions={popularQuestions} />}

      {/* Search Section */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchIconWrapper}>
            <svg
              className={styles.searchIcon}
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
            placeholder="Search all FAQs..."
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
        {isSearching && (
          <p className={styles.searchResults}>
            {hasResults
              ? `Found ${filteredFaqs.length} result${filteredFaqs.length === 1 ? '' : 's'}`
              : 'No results found'}
          </p>
        )}
      </div>

      {/* Jump to Section Navigation */}
      {hasResults && jumpCategories.length > 1 && <JumpToSection categories={jumpCategories} />}

      {/* FAQ Categories */}
      {hasResults ? (
        <div className={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <div
              key={category}
              id={category.toLowerCase().replace(/\s+/g, '-')}
              className={styles.categorySection}
              style={{
                marginBottom: index < categories.length - 1 ? 'var(--space-20)' : 0,
                paddingBottom: index < categories.length - 1 ? 'var(--space-12)' : 0,
                borderBottom:
                  index < categories.length - 1 ? '1px solid var(--color-border-light)' : 'none',
              }}
            >
              {/* Category Header with Icon */}
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>
                  {/* Icon */}
                  <span className={styles.categoryIcon} aria-hidden="true">
                    {categoryConfig[category]?.icon || '❓'}
                  </span>
                  {category}
                  {/* Count badge */}
                  <span className={styles.countBadge}>{faqsByCategory[category].length}</span>
                </h2>

                {/* Decorative underline */}
                <div className={styles.decorativeUnderline} aria-hidden="true" />

                {/* Category description */}
                <p className={styles.categoryDescription}>
                  {categoryConfig[category]?.description || ''}
                </p>
              </div>

              {/* Accordion Group */}
              <AccordionGroup
                items={faqsByCategory[category].map((faq) => ({
                  id: faq.id,
                  title: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon} aria-hidden="true">
            🔍
          </div>
          <h3 className={styles.noResultsTitle}>No FAQs Found</h3>
          <p className={styles.noResultsText}>
            We couldn&apos;t find any questions matching &quot;{searchQuery}&quot;. Try different
            keywords or{' '}
            <a href="/contact" className={styles.noResultsLink}>
              contact us
            </a>{' '}
            directly.
          </p>
          <button onClick={() => setSearchQuery('')} className={styles.clearSearchButton}>
            Clear Search
          </button>
        </div>
      )}
    </>
  );
}

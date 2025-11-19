'use client';

import { useState, useMemo, useEffect } from 'react';
import AccordionGroup from '@/components/organisms/AccordionGroup';
import JumpToSection from '@/components/molecules/JumpToSection';
import PopularQuestions from '@/components/molecules/PopularQuestions';
import ExpandCollapseControls from '@/components/molecules/ExpandCollapseControls';
import CategoryFilters from '@/components/molecules/CategoryFilters';
import RecentlyViewed, { trackFaqView } from '@/components/molecules/RecentlyViewed';
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
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [highlightedFaqId, setHighlightedFaqId] = useState<string | null>(null);
  const [recentlyViewedKey, setRecentlyViewedKey] = useState(0);

  // Handle deep linking to specific FAQs via URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove '#'
      if (hash) {
        // Check if it's a FAQ ID
        const faqExists = faqs.some((faq) => faq.id === hash);
        if (faqExists) {
          setHighlightedFaqId(hash);
          // Wait for render, then scroll to element
          setTimeout(() => {
            const element = document.getElementById(`faq-${hash}`);
            if (element) {
              const offset = 100;
              const elementPosition = element.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }
          }, 300);
        }
      }
    };

    // Handle on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [faqs]);

  // Filter FAQs based on search query and selected categories
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          (faq.category?.toLowerCase().includes(query) ?? false)
      );
    }

    // Filter by selected categories
    if (selectedCategories.size > 0) {
      filtered = filtered.filter((faq) => selectedCategories.has(faq.category ?? 'General'));
    }

    return filtered;
  }, [faqs, searchQuery, selectedCategories]);

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

  // All available categories with counts
  const allCategories = useMemo(() => {
    const categoryCounts = faqs.reduce((acc, faq) => {
      const category = faq.category ?? 'General';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(categoryConfig).map((categoryName) => ({
      name: categoryName,
      icon: categoryConfig[categoryName].icon,
      count: categoryCounts[categoryName] || 0,
    }));
  }, [faqs, categoryConfig]);

  // Category filter handlers
  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleClearCategories = () => {
    setSelectedCategories(new Set());
  };

  // Handle clicking on a recently viewed FAQ
  const handleRecentFaqClick = (faqId: string) => {
    // Update URL hash to trigger deep link
    window.location.hash = faqId;
  };

  return (
    <>
      {/* Popular Questions - Only show when not searching */}
      {!isSearching && <PopularQuestions questions={popularQuestions} />}

      {/* Recently Viewed FAQs - Only show when not searching */}
      {!isSearching && (
        <RecentlyViewed
          key={recentlyViewedKey}
          faqs={faqs}
          onFaqClick={handleRecentFaqClick}
        />
      )}

      {/* Category Filters - Only show when not searching */}
      {!isSearching && (
        <CategoryFilters
          categories={allCategories}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearCategories}
        />
      )}

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

      {/* Expand/Collapse All Controls */}
      {hasResults && (
        <ExpandCollapseControls
          isExpanded={expandAll}
          onExpandAll={() => setExpandAll(true)}
          onCollapseAll={() => setExpandAll(false)}
          totalQuestions={filteredFaqs.length}
        />
      )}

      {/* FAQ Categories */}
      {hasResults ? (
        <div className={`${styles.categoriesContainer} ${styles.staggerChildren}`}>
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
                expandAll={expandAll}
                initialOpenIds={
                  highlightedFaqId &&
                  faqsByCategory[category].some((faq) => faq.id === highlightedFaqId)
                    ? [highlightedFaqId]
                    : undefined
                }
                onItemOpen={(itemId) => {
                  trackFaqView(itemId);
                  setRecentlyViewedKey((prev) => prev + 1); // Force re-render of RecentlyViewed
                }}
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

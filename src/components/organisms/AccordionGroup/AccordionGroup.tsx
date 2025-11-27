'use client';

import { useState, useEffect } from 'react';
import AccordionItem from '@/components/molecules/AccordionItem';

interface AccordionGroupProps {
  items: Array<{
    title: string;
    content: string;
    id?: string;
  }>;
  expandAll?: boolean;
  initialOpenIds?: string[];
  onItemOpen?: (itemId: string) => void;
}

export default function AccordionGroup({
  items,
  expandAll,
  initialOpenIds,
  onItemOpen,
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<Set<string | number>>(() => {
    // Initialize with initialOpenIds if provided
    if (initialOpenIds && initialOpenIds.length > 0) {
      return new Set(initialOpenIds);
    }
    return new Set();
  });

  // When expandAll changes, update all items
  useEffect(() => {
    if (expandAll !== undefined) {
      if (expandAll) {
        setOpenItems(new Set(items.map((item, index) => item.id || index)));
      } else {
        // Don't close if we have initialOpenIds that should stay open
        if (initialOpenIds && initialOpenIds.length > 0) {
          setOpenItems(new Set(initialOpenIds));
        } else {
          setOpenItems(new Set());
        }
      }
    }
  }, [expandAll, items, initialOpenIds]);

  const toggleItem = (itemId: string | number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      const isOpening = !newSet.has(itemId);

      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
        // Track view when opening - call after state update
        if (isOpening && typeof itemId === 'string' && onItemOpen) {
          // Use setTimeout to call after render completes
          setTimeout(() => onItemOpen(itemId), 0);
        }
      }
      return newSet;
    });
  };

  // Focus specific item button
  const focusItem = (index: number) => {
    const itemId = items[index]?.id || index;
    const element = document.querySelector(
      `#faq-${items[index]?.id} button`
    ) as HTMLButtonElement | null;
    if (element) {
      element.focus();
    }
  };

  return (
    <div role="group" aria-label="FAQ accordions">
      {items.map((item, index) => {
        const itemId = item.id || index;
        return (
          <div key={itemId} id={item.id ? `faq-${item.id}` : undefined}>
            <AccordionItem
              title={item.title}
              questionId={item.id}
              isOpen={openItems.has(itemId)}
              onToggle={() => toggleItem(itemId)}
              onNavigateNext={() => {
                if (index < items.length - 1) {
                  focusItem(index + 1);
                }
              }}
              onNavigatePrevious={() => {
                if (index > 0) {
                  focusItem(index - 1);
                }
              }}
            >
              {item.content}
            </AccordionItem>
          </div>
        );
      })}
    </div>
  );
}

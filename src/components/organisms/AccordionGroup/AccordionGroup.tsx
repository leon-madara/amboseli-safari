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
}

export default function AccordionGroup({ items, expandAll, initialOpenIds }: AccordionGroupProps) {
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
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div>
      {items.map((item, index) => {
        const itemId = item.id || index;
        return (
          <div key={itemId} id={item.id ? `faq-${item.id}` : undefined}>
            <AccordionItem
              title={item.title}
              questionId={item.id}
              isOpen={expandAll !== undefined ? expandAll : openItems.has(itemId)}
              onToggle={() => toggleItem(itemId)}
            >
              {item.content}
            </AccordionItem>
          </div>
        );
      })}
    </div>
  );
}

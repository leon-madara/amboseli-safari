'use client';

import { useState } from 'react';
import RoomCard from '@/components/molecules/RoomCard';
import RoomComparisonBar, { type ComparisonRoom } from '@/components/molecules/RoomComparisonBar';
import RoomComparisonModal, { type ComparisonRoomDetails } from '@/components/molecules/RoomComparisonModal';

interface Room {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  capacity: number;
  size: string;
  price: string;
  features: string[];
  slug: string;
  rating?: number;
  reviewCount?: number;
  availability?: 'available' | 'limited' | 'sold-out';
  recentlyBooked?: boolean;
  specialOffer?: string;
  includedItems?: string[];
}

interface RoomsSectionProps {
  rooms: Room[];
}

export default function RoomsSection({ rooms }: RoomsSectionProps) {
  const [comparedRooms, setComparedRooms] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const handleCompareToggle = (slug: string, isSelected: boolean) => {
    if (isSelected) {
      // Limit to 3 rooms max
      if (comparedRooms.length < 3) {
        setComparedRooms([...comparedRooms, slug]);
      }
    } else {
      setComparedRooms(comparedRooms.filter((s) => s !== slug));
    }
  };

  const handleRemoveFromComparison = (slug: string) => {
    setComparedRooms(comparedRooms.filter((s) => s !== slug));
  };

  const handleClearComparison = () => {
    setComparedRooms([]);
  };

  const handleOpenComparison = () => {
    setIsComparisonModalOpen(true);
  };

  const handleCloseComparison = () => {
    setIsComparisonModalOpen(false);
  };

  // Get comparison data for the bar
  const comparisonBarRooms: ComparisonRoom[] = comparedRooms
    .map((slug) => {
      const room = rooms.find((r) => r.slug === slug);
      if (!room) return null;
      return {
        slug: room.slug,
        title: room.title,
        image: room.image,
        price: room.price,
      };
    })
    .filter((r): r is ComparisonRoom => r !== null);

  // Get detailed comparison data for the modal
  const comparisonModalRooms: ComparisonRoomDetails[] = comparedRooms
    .map((slug): ComparisonRoomDetails | null => {
      const room = rooms.find((r) => r.slug === slug);
      if (!room) return null;
      return {
        slug: room.slug,
        title: room.title,
        image: room.image,
        price: room.price,
        capacity: room.capacity,
        size: room.size,
        features: room.features,
        rating: room.rating,
        reviewCount: room.reviewCount,
        description: room.description,
      };
    })
    .filter((r): r is ComparisonRoomDetails => r !== null);

  return (
    <>
      <section style={{ padding: 'var(--space-section-lg) var(--space-container-padding)' }}>
        <div style={{ maxWidth: 'var(--container-max-width-xl)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'var(--heading-h2-size)',
                fontWeight: 'var(--heading-h2-weight)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Our Accommodations
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--body-large-size)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              Each accommodation type is carefully designed to provide the ultimate safari
              experience, combining modern luxury with authentic African charm.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-10)',
            }}
          >
            {rooms.map((room, index) => (
              <RoomCard
                key={index}
                {...room}
                isComparing={comparedRooms.includes(room.slug)}
                onCompareToggle={handleCompareToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Bar */}
      <RoomComparisonBar
        rooms={comparisonBarRooms}
        onRemove={handleRemoveFromComparison}
        onCompare={handleOpenComparison}
        onClear={handleClearComparison}
      />

      {/* Comparison Modal */}
      <RoomComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={handleCloseComparison}
        rooms={comparisonModalRooms}
      />
    </>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import RoomCard from '@/components/molecules/RoomCard';
import RoomCardSkeleton from '@/components/molecules/RoomCardSkeleton';
import RoomComparisonBar, { type ComparisonRoom } from '@/components/molecules/RoomComparisonBar';
import RoomComparisonModal, { type ComparisonRoomDetails } from '@/components/molecules/RoomComparisonModal';
import PriceFilter, { type PriceRange } from '@/components/molecules/PriceFilter';

interface Room {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  images?: string[];
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
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading (in real app, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Extract price values for filtering
  const prices = useMemo(() => {
    return rooms.map((room) => parseInt(room.price.replace(/\D/g, '')));
  }, [rooms]);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: minPrice,
    max: maxPrice,
  });

  // Filter rooms by price
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const roomPrice = parseInt(room.price.replace(/\D/g, ''));
      return roomPrice >= priceRange.min && roomPrice <= priceRange.max;
    });
  }, [rooms, priceRange]);

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

          {/* Price Filter */}
          <div style={{ marginBottom: 'var(--space-8)', maxWidth: '400px' }}>
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              currentRange={priceRange}
              onRangeChange={setPriceRange}
              onReset={() => setPriceRange({ min: minPrice, max: maxPrice })}
            />
          </div>

          {/* Room Count */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Showing {filteredRooms.length} of {rooms.length} rooms
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-10)',
            }}
          >
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <RoomCardSkeleton key={`skeleton-${index}`} />
                ))}
              </>
            ) : (
              <>
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.slug}
                    {...room}
                    isComparing={comparedRooms.includes(room.slug)}
                    onCompareToggle={handleCompareToggle}
                  />
                ))}
              </>
            )}
          </div>

          {/* No Results Message */}
          {!isLoading && filteredRooms.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
              <p
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                No rooms found in this price range. Try adjusting your filter.
              </p>
            </div>
          )}
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

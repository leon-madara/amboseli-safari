'use client';

import { useState, useMemo, useEffect } from 'react';
import RoomCard from '@/components/molecules/RoomCard';
import RoomCardSkeleton from '@/components/molecules/RoomCardSkeleton';
import RoomComparisonBar, { type ComparisonRoom } from '@/components/molecules/RoomComparisonBar';
import RoomComparisonModal, { type ComparisonRoomDetails } from '@/components/molecules/RoomComparisonModal';
import PriceFilter, { type PriceRange } from '@/components/molecules/PriceFilter';
import ViewToggle, { type ViewMode } from '@/components/atoms/ViewToggle';
import SortDropdown, { type SortOption } from '@/components/molecules/SortDropdown';
import AmenitiesFilter, { type Amenity } from '@/components/molecules/AmenitiesFilter';

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

  // Phase 2 state
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());

  // Simulate initial loading (in real app, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Available amenities (in real app, this would be extracted from rooms)
  const availableAmenities: Amenity[] = useMemo(() => [
    { id: 'pool-view', name: 'Pool View', icon: '🏊' },
    { id: 'balcony', name: 'Balcony', icon: '🌅' },
    { id: 'king-bed', name: 'King Bed', icon: '🛏️' },
    { id: 'wifi', name: 'Free WiFi', icon: '📶' },
    { id: 'mini-bar', name: 'Mini Bar', icon: '🍷' },
    { id: 'ac', name: 'Air Conditioning', icon: '❄️' },
  ], []);

  // Toggle amenity filter
  const handleToggleAmenity = (amenityId: string) => {
    const newSelected = new Set(selectedAmenities);
    if (newSelected.has(amenityId)) {
      newSelected.delete(amenityId);
    } else {
      newSelected.add(amenityId);
    }
    setSelectedAmenities(newSelected);
  };

  // Clear amenity filters
  const handleClearAmenities = () => {
    setSelectedAmenities(new Set());
  };

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

  // Enhance rooms with Phase 2 data (pricing context & social proof)
  const enhancedRooms = useMemo(() => {
    return rooms.map((room, index) => {
      // Simulate pricing context and social proof (in real app, from API)
      const basePrice = parseInt(room.price.replace(/\D/g, ''));
      const avgPrice = Math.round(basePrice * 1.18);
      const savings = avgPrice - basePrice;

      return {
        ...room,
        avgPrice: `$${avgPrice}`,
        priceSavings: savings > 50 ? `$${savings}` : undefined,
        priceTrend: (index % 3 === 0 ? 'rising' : index % 3 === 1 ? 'stable' : 'falling') as 'rising' | 'falling' | 'stable',
        viewingCount: index % 2 === 0 ? Math.floor(Math.random() * 5) + 1 : undefined,
        lastBookedMinutes: index % 3 === 0 ? Math.floor(Math.random() * 60) + 10 : undefined,
      };
    });
  }, [rooms]);

  // Filter and sort rooms
  const filteredAndSortedRooms = useMemo(() => {
    let filtered = enhancedRooms.filter((room) => {
      // Price filter
      const roomPrice = parseInt(room.price.replace(/\D/g, ''));
      if (roomPrice < priceRange.min || roomPrice > priceRange.max) {
        return false;
      }

      // Amenities filter (simplified - in real app would check room.features)
      if (selectedAmenities.size > 0) {
        // For demo purposes, assume all rooms have all amenities
        // In real app: check if room.features includes selected amenities
        return true;
      }

      return true;
    });

    // Sorting
    const sorted = [...filtered].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));

      switch (sortOption) {
        case 'price-low-high':
          return priceA - priceB;
        case 'price-high-low':
          return priceB - priceA;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'size':
          const sizeA = parseInt(a.size);
          const sizeB = parseInt(b.size);
          return sizeB - sizeA;
        case 'popular':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'recommended':
        default:
          return 0; // Keep original order
      }
    });

    return sorted;
  }, [enhancedRooms, priceRange, selectedAmenities, sortOption]);

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
      const room = enhancedRooms.find((r) => r.slug === slug);
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
      const room = enhancedRooms.find((r) => r.slug === slug);
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

          {/* Filter Controls */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)'
            }}>
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                currentRange={priceRange}
                onRangeChange={setPriceRange}
                onReset={() => setPriceRange({ min: minPrice, max: maxPrice })}
              />

              <AmenitiesFilter
                amenities={availableAmenities}
                selectedAmenities={selectedAmenities}
                onToggleAmenity={handleToggleAmenity}
                onClearAll={handleClearAmenities}
              />
            </div>

            {/* Sort and View Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'var(--space-4)',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flex: 1 }}>
                <SortDropdown
                  value={sortOption}
                  onChange={setSortOption}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    margin: 0
                  }}
                >
                  {filteredAndSortedRooms.length} of {rooms.length} rooms
                </p>
              </div>

              <ViewToggle
                view={viewMode}
                onChange={setViewMode}
              />
            </div>
          </div>

          <div
            style={{
              display: viewMode === 'grid' ? 'grid' : 'flex',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(340px, 1fr))' : undefined,
              flexDirection: viewMode === 'list' ? 'column' : undefined,
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
                {filteredAndSortedRooms.map((room) => (
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
          {!isLoading && filteredAndSortedRooms.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
              <p
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                No rooms found matching your filters. Try adjusting your selections.
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

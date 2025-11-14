import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import RoomsSection from '@/components/organisms/RoomsSection';
import Link from '@/components/atoms/Link';
import { PROPERTY_IMAGES, ROOM_IMAGES } from '@/data/images';

export const metadata: Metadata = {
  title: 'Safari Accommodations | Amboseli Safari Club',
  description:
    'Modern, comfortable accommodations perfect for families and groups. Spacious rooms with Mount Kilimanjaro views, pool access, and easy access to Amboseli National Park.',
};

const rooms = [
  {
    title: 'Safari View Room',
    description:
      'Comfortable modern room with wilderness views. Perfect for couples or solo travelers seeking authentic safari experiences with contemporary amenities.',
    image: ROOM_IMAGES.premiumRoom,
    imageAlt: 'Safari View Room with savannah views',
    images: [
      '/images/rooms/premium-room/room-1.jpg',
      '/images/rooms/premium-room/room-2.jpg',
      '/images/rooms/premium-room/room-3.jpg',
      '/images/rooms/premium-room/room-4.jpg',
    ],
    capacity: 2,
    size: '35 m²',
    price: '$220',
    features: [
      'Queen or twin beds',
      'Modern bathroom',
      'Air conditioning',
      'Savannah views',
      'Wi-Fi access',
      'Pool access',
    ],
    slug: 'safari-view-room',
    // Enhanced conversion features
    rating: 4.7,
    reviewCount: 89,
    availability: 'available' as const,
    recentlyBooked: true,
    includedItems: ['Breakfast buffet', 'Pool access', 'Wi-Fi', 'Parking'],
  },
  {
    title: 'Deluxe Safari Room',
    description:
      'Enhanced space with modern amenities. More room to relax between game drives, with comfortable furnishings and great views of the surrounding landscape.',
    image: ROOM_IMAGES.deluxeSuite,
    imageAlt: 'Deluxe Safari Room with enhanced space',
    images: [
      '/images/rooms/deluxe-suite/suite-1.jpg',
      '/images/rooms/deluxe-suite/suite-2.jpg',
      '/images/rooms/deluxe-suite/suite-3.jpg',
      '/images/rooms/deluxe-suite/suite-4.jpg',
      '/images/rooms/deluxe-suite/suite-5.jpg',
    ],
    capacity: 2,
    size: '45 m²',
    price: '$280',
    features: [
      'King-size bed',
      'Sitting area',
      'Premium bathroom',
      'Private balcony',
      'Coffee maker',
      'Pool access',
    ],
    slug: 'deluxe-safari-room',
    // Enhanced conversion features
    rating: 4.8,
    reviewCount: 64,
    availability: 'limited' as const,
    recentlyBooked: false,
    specialOffer: 'Group discounts available',
    includedItems: ['Breakfast buffet', 'Pool access', 'Wi-Fi', 'Welcome drink'],
  },
  {
    title: 'Family Apartment',
    description:
      'Spacious two-bedroom accommodation perfect for families and groups. Self-contained with full amenities, ideal for extended stays and creating safari memories together.',
    image: ROOM_IMAGES.familySuite,
    imageAlt: 'Family Apartment with two bedrooms',
    images: [
      '/images/rooms/family-suite/family-1.jpg',
      '/images/rooms/family-suite/family-2.jpg',
      '/images/rooms/family-suite/family-3.jpg',
      '/images/rooms/family-suite/family-4.jpg',
    ],
    capacity: 4,
    size: '70 m²',
    price: '$380',
    features: [
      'Two bedrooms',
      'Kitchenette',
      'Living area',
      'Two bathrooms',
      'Large balcony',
      'Kids welcome',
    ],
    slug: 'family-apartment',
    // Enhanced conversion features
    rating: 4.9,
    reviewCount: 72,
    availability: 'available' as const,
    recentlyBooked: true,
    includedItems: ['Breakfast buffet', 'Pool access', 'Wi-Fi', 'Kids play area'],
  },
];

const amenities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    title: 'Modern Comfort',
    description:
      'Clean linens, quality toiletries, air conditioning, and all essential amenities for a comfortable stay.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: 'Helpful Staff',
    description:
      'Friendly team ready to assist with safari bookings, restaurant recommendations, and local information.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Sustainability',
    description:
      'Eco-friendly practices including solar power, water conservation, and community partnerships.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Flexible Check-in',
    description:
      'Accommodating arrival and departure times to match your safari schedule and travel plans.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
    title: 'Group-Friendly Dining',
    description:
      'Restaurant accommodates large parties with mix of Kenyan and international cuisine. Buffet and a la carte options.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Safety & Security',
    description:
      'Professional security team and comprehensive safety protocols for your peace of mind.',
  },
];

export default function AccommodationsPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Modern Safari Accommodations"
        subtitle="Comfortable Rooms for Families & Groups"
        description="Contemporary hotel-style rooms near Kimana Gate, Amboseli National Park. Perfect for families, groups, and safari enthusiasts seeking comfort and convenience"
        backgroundImage={PROPERTY_IMAGES.exteriorSunset}
        backgroundImageAlt="Amboseli Safari Club modern accommodations"
        height="medium"
        overlay="medium"
        priority={true}
        logo=""
      />

      {/* Rooms Section with Comparison */}
      <RoomsSection rooms={rooms} />

      {/* Amenities Section */}
      <section
        style={{
          padding: 'var(--space-section-xl) var(--space-container-padding)',
          backgroundColor: 'var(--color-neutral-cream)',
        }}
      >
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
              Included Amenities
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
              Every detail has been thoughtfully considered to ensure your stay exceeds
              expectations.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {amenities.map((amenity, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto var(--space-6)',
                    color: 'var(--color-primary-terracotta)',
                  }}
                >
                  {amenity.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {amenity.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-relaxed)',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: 'var(--space-section-xl) var(--space-container-padding)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--heading-h2-size)',
              fontWeight: 'var(--heading-h2-weight)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Ready to Experience Amboseli?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--body-large-size)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-10)',
            }}
          >
            Our team is ready to help you plan the perfect safari adventure. Get in touch to check
            availability and reserve your luxury accommodation.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-inverse)',
                backgroundColor: 'var(--color-primary-terracotta)',
                textDecoration: 'none',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-button)',
                transition: 'var(--transition-all)',
                boxShadow: 'var(--shadow-button)',
                minWidth: '200px',
              }}
            >
              Book Your Stay
            </Link>
            <Link
              href="/experiences"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary-terracotta)',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                padding: 'var(--space-4) var(--space-8)',
                border: '2px solid var(--color-primary-terracotta)',
                borderRadius: 'var(--radius-button)',
                transition: 'var(--transition-all)',
                minWidth: '200px',
              }}
            >
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

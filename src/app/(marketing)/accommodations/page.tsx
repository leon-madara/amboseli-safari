import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import RoomsSection from '@/components/organisms/RoomsSection';
import Link from '@/components/atoms/Link';

export const metadata: Metadata = {
  title: 'Luxury Accommodations',
  description:
    'Experience ultimate comfort in our luxury safari accommodations. From intimate premium rooms to spacious family suites, each offering breathtaking Mount Kilimanjaro views.',
};

const rooms = [
  {
    title: 'Premium Room',
    description:
      'Intimate luxury with panoramic savannah views. Perfect for couples seeking an authentic safari experience with modern comforts.',
    image: '/images/rooms/premium-room/room-1.jpg',
    imageAlt: 'Premium Room with Mount Kilimanjaro view',
    images: [
      '/images/rooms/premium-room/room-1.jpg',
      '/images/rooms/premium-room/room-2.jpg',
      '/images/rooms/premium-room/room-3.jpg',
      '/images/rooms/premium-room/room-4.jpg',
    ],
    capacity: 2,
    size: '45 m²',
    price: '$450',
    features: [
      'King-size bed',
      'Private veranda',
      'Rainfall shower',
      'Kilimanjaro views',
      'Wi-Fi access',
      'Minibar',
    ],
    slug: 'premium-room',
    // Enhanced conversion features
    rating: 4.8,
    reviewCount: 127,
    availability: 'available' as const,
    recentlyBooked: true,
    includedItems: ['Full breakfast', '2 game drives daily', 'Park fees', 'Airport transfer'],
  },
  {
    title: 'Deluxe Suite',
    description:
      'Spacious elegance with separate living area. Indulge in refined comfort with premium amenities and spectacular wildlife viewing opportunities.',
    image: '/images/rooms/deluxe-suite/suite-1.jpg',
    imageAlt: 'Deluxe Suite with separate living area',
    images: [
      '/images/rooms/deluxe-suite/suite-1.jpg',
      '/images/rooms/deluxe-suite/suite-2.jpg',
      '/images/rooms/deluxe-suite/suite-3.jpg',
      '/images/rooms/deluxe-suite/suite-4.jpg',
      '/images/rooms/deluxe-suite/suite-5.jpg',
    ],
    capacity: 2,
    size: '65 m²',
    price: '$650',
    features: [
      'King-size bed',
      'Living room',
      'Bathtub & shower',
      'Private deck',
      'Butler service',
      'Premium minibar',
    ],
    slug: 'deluxe-suite',
    // Enhanced conversion features
    rating: 4.9,
    reviewCount: 94,
    availability: 'limited' as const,
    recentlyBooked: false,
    specialOffer: 'Save 15% for 3+ nights',
    includedItems: ['Full breakfast', '2 game drives daily', 'Park fees', 'Butler service'],
  },
  {
    title: 'Family Suite',
    description:
      'Generous space for the entire family. Two bedrooms with connecting door, perfect for creating unforgettable safari memories together.',
    image: '/images/rooms/family-suite/family-1.jpg',
    imageAlt: 'Family Suite with two bedrooms',
    images: [
      '/images/rooms/family-suite/family-1.jpg',
      '/images/rooms/family-suite/family-2.jpg',
      '/images/rooms/family-suite/family-3.jpg',
      '/images/rooms/family-suite/family-4.jpg',
    ],
    capacity: 4,
    size: '85 m²',
    price: '$850',
    features: [
      'Two bedrooms',
      'Connecting door',
      'Family bathroom',
      'Large veranda',
      'Game viewing',
      'Kids amenities',
    ],
    slug: 'family-suite',
    // Enhanced conversion features
    rating: 4.9,
    reviewCount: 83,
    availability: 'available' as const,
    recentlyBooked: true,
    includedItems: ['Full breakfast', '2 game drives daily', 'Park fees', 'Kids activities'],
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
    title: 'Luxury Amenities',
    description:
      'Premium linens, organic toiletries, and thoughtful touches throughout your accommodation.',
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
    title: '24/7 Concierge',
    description:
      'Dedicated staff ready to assist with safari arrangements, dining reservations, and special requests.',
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
    title: 'Gourmet Dining',
    description:
      'Farm-to-table cuisine featuring local ingredients and international flavors at our restaurants.',
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
        title="Luxury Safari Accommodations"
        subtitle="Where Comfort Meets Wilderness"
        description="Experience the perfect blend of luxury and nature in our thoughtfully designed accommodations, each offering stunning views of Mount Kilimanjaro and the African savannah"
        backgroundImage="/images/property/exterior-sunset.jpg"
        backgroundImageAlt="Amboseli Safari Club luxury accommodations"
        height="medium"
        overlay="medium"
        priority={true}
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

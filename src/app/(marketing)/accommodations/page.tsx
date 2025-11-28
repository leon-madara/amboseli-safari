import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import RoomsSection from '@/components/organisms/RoomsSection';
import AmenityCard from '@/components/molecules/AmenityCard';
import Link from '@/components/atoms/Link';
import { PROPERTY_IMAGES, ROOM_IMAGES } from '@/data/images';

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
    image: ROOM_IMAGES.premiumRoom,
    imageAlt: 'Premium Room with Mount Kilimanjaro view',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80', // Elegant interior
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', // Bathroom with view
      'https://images.unsplash.com/photo-1519095616549-4d47a46f58da?w=1200&q=80', // Deck view
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80', // Detail
    ],
    capacity: 2,
    size: '45 m²',
    price: '$220',
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
    image: ROOM_IMAGES.deluxeSuite,
    imageAlt: 'Deluxe Suite with separate living area',
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80', // Living area
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=80', // Bedroom detail
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1200&q=80', // Private deck
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80', // Bathroom
    ],
    capacity: 2,
    size: '65 m²',
    price: '$280',
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
    image: ROOM_IMAGES.familySuite,
    imageAlt: 'Family Suite with two bedrooms',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80', // Second bedroom
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', // Spacious lounge
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80', // Exterior/Veranda
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80', // Family dining area
    ],
    capacity: 4,
    size: '85 m²',
    price: '$380',
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
        backgroundImage={PROPERTY_IMAGES.exteriorSunset}
        backgroundImageAlt="Amboseli Safari Club luxury accommodations"
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {amenities.map((amenity, index) => (
              <AmenityCard
                key={index}
                icon={amenity.icon}
                title={amenity.title}
                description={amenity.description}
                variant={index === 0 ? 'featured' : 'default'}
              />
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

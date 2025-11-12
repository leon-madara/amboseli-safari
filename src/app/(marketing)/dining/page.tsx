import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';

export const metadata: Metadata = {
  title: 'Dining Experience',
  description:
    'Savor exquisite cuisine at Amboseli Safari Club. From authentic Kenyan dishes to international favorites, our culinary team creates memorable dining experiences with locally sourced ingredients.',
};

const restaurants = [
  {
    title: 'Kilimanjaro Restaurant',
    description:
      'Our signature fine dining restaurant offering panoramic views of Mount Kilimanjaro. Enjoy a sophisticated menu that celebrates both international cuisine and authentic Kenyan flavors.',
    features: [
      'Indoor and outdoor seating',
      'Views of Mount Kilimanjaro',
      'Breakfast, lunch, and dinner service',
      'A la carte and set menu options',
      'Wine cellar with premium selections',
      'Private dining available',
    ],
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
  },
  {
    title: 'Savannah Terrace',
    description:
      'An al fresco dining experience under the African sky. Perfect for sundowners and casual meals while watching wildlife roam the plains.',
    features: [
      'Open-air terrace setting',
      'Sunset cocktails and appetizers',
      'Casual dining atmosphere',
      'BBQ and grilled specialties',
      'Live cooking stations',
      'Wildlife viewing opportunities',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: 'The Safari Bar',
    description:
      'Unwind with expertly crafted cocktails and premium spirits in our stylish bar. The perfect spot to share stories of your safari adventures.',
    features: [
      'Premium spirits and wines',
      'Signature safari cocktails',
      'Local and imported beers',
      'Light bites and appetizers',
      'Cozy lounge seating',
      'Open until late',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
];

const diningExperiences = [
  {
    title: 'Bush Breakfast',
    description:
      'Start your day with a memorable breakfast in the wild. Enjoy a gourmet meal surrounded by the sights and sounds of the African bush.',
    time: 'Early Morning',
  },
  {
    title: 'Sundowner Experience',
    description:
      'Watch the sun set over the savannah while enjoying cocktails and canapés at a scenic location within the reserve.',
    time: 'Evening',
  },
  {
    title: 'Private Bush Dinner',
    description:
      'An intimate dining experience under the stars. Our team creates a magical setting complete with lanterns, fine cuisine, and personalized service.',
    time: 'By Arrangement',
  },
  {
    title: 'Chef\'s Table',
    description:
      'Join our executive chef for an exclusive culinary journey. Learn about ingredients, techniques, and the stories behind our signature dishes.',
    time: 'By Reservation',
  },
];

const menuHighlights = [
  {
    category: 'Kenyan Specialties',
    items: [
      'Nyama Choma - Traditional grilled meat',
      'Ugali with Sukuma Wiki - Maize meal with collard greens',
      'Swahili Coconut Fish Curry',
      'Pilau Rice with Braised Goat',
    ],
  },
  {
    category: 'International Favorites',
    items: [
      'Grilled Prime Beef Fillet',
      'Pan-Seared Sea Bass',
      'Wild Mushroom Risotto',
      'Mediterranean Grilled Vegetables',
    ],
  },
  {
    category: 'Breakfast Selections',
    items: [
      'Full English Breakfast',
      'Tropical Fruit Platter',
      'Fresh Pastries and Breads',
      'Made-to-Order Omelettes',
    ],
  },
];

export default function DiningPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Culinary Excellence in the Wild"
        subtitle="A Feast for the Senses"
        description="Experience exceptional dining that celebrates the rich flavors of Kenya while embracing international culinary traditions"
        backgroundImage="/images/dining/restaurant-sunset.jpg"
        backgroundImageAlt="Amboseli Safari Club dining experience"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* Restaurants Section */}
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
              Our Dining Venues
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
              From fine dining to casual terrace meals, each venue offers a unique atmosphere and
              exceptional cuisine.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-10)',
            }}
          >
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-10)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'var(--transition-all)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    marginBottom: 'var(--space-6)',
                    color: 'var(--color-primary-terracotta)',
                  }}
                >
                  {restaurant.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'var(--heading-h3-size)',
                    fontWeight: 'var(--heading-h3-weight)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {restaurant.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {restaurant.description}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {restaurant.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-family-body)',
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: 'var(--line-height-relaxed)',
                        color: 'var(--color-text-secondary)',
                        paddingLeft: 'var(--space-6)',
                        position: 'relative',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--color-primary-terracotta)',
                        }}
                      >
                        •
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights Section */}
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
              Menu Highlights
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
              A selection of our most popular dishes, crafted with fresh, locally sourced
              ingredients.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {menuHighlights.map((menu, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-primary-terracotta)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {menu.category}
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {menu.items.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontFamily: 'var(--font-family-body)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: 'var(--line-height-relaxed)',
                        color: 'var(--color-text-secondary)',
                        paddingLeft: 'var(--space-6)',
                        position: 'relative',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--color-primary-terracotta)',
                        }}
                      >
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Dining Experiences Section */}
      <section style={{ padding: 'var(--space-section-xl) var(--space-container-padding)' }}>
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
              Special Dining Experiences
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
              Elevate your safari with unique dining experiences that create lasting memories.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {diningExperiences.map((experience, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  borderTop: '4px solid var(--color-primary-terracotta)',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: 'var(--space-2) var(--space-4)',
                    backgroundColor: 'var(--color-primary-terracotta)',
                    color: 'var(--color-text-inverse)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {experience.time}
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
                  {experience.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dietary Information Section */}
      <section
        style={{
          padding: 'var(--space-section-lg) var(--space-container-padding)',
          backgroundColor: 'var(--color-neutral-cream)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width-lg)', margin: '0 auto' }}>
          <div
            style={{
              padding: 'var(--space-12)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-2xl)',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'var(--heading-h3-size)',
                fontWeight: 'var(--heading-h3-weight)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Dietary Accommodations
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--body-large-size)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              We cater to all dietary requirements including vegetarian, vegan, gluten-free,
              dairy-free, and other special dietary needs. Please inform us of any allergies or
              preferences when booking.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-6)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 'var(--space-8)',
              }}
            >
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'].map((diet, index) => (
                <div
                  key={index}
                  style={{
                    padding: 'var(--space-3) var(--space-6)',
                    backgroundColor: 'var(--color-neutral-cream)',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-primary-terracotta)',
                  }}
                >
                  {diet}
                </div>
              ))}
            </div>
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
            Reserve Your Culinary Journey
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
            Book your stay and experience exceptional dining in the heart of the African wilderness.
            Special dining experiences can be arranged upon request.
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
              Make a Reservation
            </Link>
            <Link
              href="/accommodations"
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
              View Accommodations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

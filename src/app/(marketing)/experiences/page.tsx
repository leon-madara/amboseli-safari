import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';

export const metadata: Metadata = {
  title: 'Safari Experiences',
  description:
    'Discover unforgettable safari experiences at Amboseli National Park. From game drives to cultural encounters, create memories that last a lifetime.',
};

const experiences = [
  {
    title: 'Morning Game Drives',
    description:
      'Witness the African savannah come alive at dawn. Our expert guides lead you through Amboseli in search of elephants, lions, and spectacular wildlife against the backdrop of Mount Kilimanjaro.',
    features: ['4-6 hours', 'Professional guide', 'Binoculars provided', 'Refreshments included'],
  },
  {
    title: 'Sunset Safari',
    description:
      'Experience the golden hour magic as wildlife becomes most active. Watch elephants silhouetted against the setting sun and Kilimanjaro painted in spectacular colors.',
    features: ['3-4 hours', 'Sundowner drinks', 'Photography stops', 'Expert naturalist'],
  },
  {
    title: 'Walking Safari',
    description:
      'Connect intimately with nature on foot. Learn about tracks, plants, and ecosystems from experienced Maasai guides in this immersive wilderness experience.',
    features: ['2-3 hours', 'Armed ranger', 'Small groups', 'All fitness levels'],
  },
  {
    title: 'Cultural Visit',
    description:
      'Engage authentically with Maasai communities. Learn traditional customs, visit local homes, and support sustainable tourism that benefits local families.',
    features: ['Half day', 'Community guides', 'Traditional lunch', 'Craft shopping'],
  },
  {
    title: 'Bird Watching',
    description:
      'Discover over 400 bird species in Amboseli. From flamingos to eagles, explore diverse habitats with ornithology experts and specialized equipment.',
    features: ['Full/half day', 'Bird checklist', 'Spotting scopes', 'Expert birder'],
  },
  {
    title: 'Photography Safari',
    description:
      'Capture stunning wildlife and landscapes with guidance from professional photographers. Perfect timing, locations, and techniques for incredible images.',
    features: ['Flexible timing', 'Photo coaching', 'Best locations', 'Bean bag support'],
  },
];

export default function ExperiencesPage() {
  return (
    <main>
      <Hero
        title="Unforgettable Safari Experiences"
        subtitle="Adventures in the Wild"
        description="Immerse yourself in the wonders of Amboseli National Park with expertly guided experiences designed to create lasting memories"
        backgroundImage="/images/experiences/game-drive.jpg"
        backgroundImageAlt="Safari game drive in Amboseli"
        height="medium"
        overlay="medium"
        priority={true}
      />

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
              Our Experiences
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
              Each experience is carefully crafted to showcase the best of Amboseli while respecting
              wildlife and supporting local communities.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-10)',
            }}
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'var(--heading-h3-size)',
                    fontWeight: 'var(--heading-h3-weight)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {exp.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--body-base-size)',
                    lineHeight: 'var(--line-height-relaxed)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {exp.description}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 'var(--space-3)',
                  }}
                >
                  {exp.features.map((feature, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-family-body)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                      }}
                    >
                      <span style={{ color: 'var(--color-accent-gold)', fontSize: '1.2em' }}>
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

      <section
        style={{
          padding: 'var(--space-section-xl) var(--space-container-padding)',
          textAlign: 'center',
          backgroundColor: 'var(--color-neutral-cream)',
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
            Plan Your Safari Adventure
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
            Our team will help you create a personalized safari itinerary that matches your
            interests, fitness level, and schedule.
          </p>
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
            Book Your Experience
          </Link>
        </div>
      </section>
    </main>
  );
}

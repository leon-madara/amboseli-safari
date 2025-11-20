import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';
import CurvedDivider from '@/components/atoms/CurvedDivider';
import BentoServiceGrid from '@/components/organisms/BentoServiceGrid';
import styles from './wellness.module.css';

export const metadata: Metadata = {
  title: 'Wellness & Spa',
  description:
    'Rejuvenate your body and mind at Amboseli Safari Club. Our wellness center offers luxurious spa treatments, yoga sessions, and holistic wellness experiences in the heart of nature.',
};

const spaServices = [
  {
    title: 'Massage Therapies',
    treatments: [
      {
        name: 'African Stone Massage',
        description: 'Warm volcanic stones combined with traditional massage techniques',
        duration: '90 minutes',
      },
      {
        name: 'Deep Tissue Massage',
        description: 'Intensive pressure to release chronic muscle tension',
        duration: '60/90 minutes',
      },
      {
        name: 'Aromatherapy Massage',
        description: 'Relaxing massage with essential oils from indigenous plants',
        duration: '60/90 minutes',
      },
      {
        name: 'Couples Massage',
        description: 'Side-by-side massage experience in our private suite',
        duration: '90 minutes',
      },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Body Treatments',
    treatments: [
      {
        name: 'African Clay Body Wrap',
        description: 'Detoxifying wrap using mineral-rich African clay',
        duration: '75 minutes',
      },
      {
        name: 'Honey & Aloe Body Polish',
        description: 'Exfoliating scrub with local honey and aloe vera',
        duration: '60 minutes',
      },
      {
        name: 'Shea Butter Body Ritual',
        description: 'Nourishing full-body treatment with pure African shea butter',
        duration: '90 minutes',
      },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: 'Facial Treatments',
    treatments: [
      {
        name: 'Rejuvenating Facial',
        description: 'Anti-aging treatment with botanical extracts and serums',
        duration: '60 minutes',
      },
      {
        name: 'Purifying Clay Mask',
        description: 'Deep cleansing facial using natural African clay',
        duration: '45 minutes',
      },
      {
        name: 'Express Facial',
        description: 'Quick refresh for time-conscious guests',
        duration: '30 minutes',
      },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

const wellnessActivities = [
  {
    title: 'Sunrise Yoga',
    description:
      'Start your day with a guided yoga session as the sun rises over Mount Kilimanjaro. Suitable for all levels.',
    schedule: 'Daily at 6:30 AM',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Meditation Sessions',
    description:
      'Guided meditation in our peaceful garden setting. Learn mindfulness techniques to take home with you.',
    schedule: 'Daily at 5:00 PM',
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
  },
  {
    title: 'Nature Walks',
    description:
      'Gentle guided walks through our grounds, combining light exercise with nature observation and mindfulness.',
    schedule: 'By Arrangement',
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
  },
  {
    title: 'Fitness Center',
    description:
      'Fully equipped gym with modern cardio and strength training equipment. Personal training available.',
    schedule: 'Open 24/7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

const wellnessPackages = [
  {
    title: 'Half-Day Retreat',
    duration: '4 hours',
    price: '$220',
    includes: [
      '90-minute massage of choice',
      '60-minute facial treatment',
      'Access to sauna and steam room',
      'Light healthy lunch',
      'Herbal tea and refreshments',
    ],
  },
  {
    title: 'Full-Day Sanctuary',
    duration: '8 hours',
    price: '$380',
    includes: [
      '90-minute massage therapy',
      '75-minute body wrap',
      '60-minute facial treatment',
      'Yoga or meditation session',
      'Healthy gourmet lunch',
      'All-day spa access',
    ],
  },
  {
    title: 'Couples Escape',
    duration: '3 hours',
    price: '$380',
    includes: [
      'Side-by-side couples massage (90 min)',
      'Private jacuzzi session',
      'Champagne and chocolate-covered strawberries',
      'Rose petal turndown',
    ],
  },
];

const facilities = [
  {
    name: 'Sauna & Steam Room',
    description: 'Traditional Finnish sauna and aromatic steam room for deep relaxation',
  },
  {
    name: 'Jacuzzi',
    description: 'Outdoor hot tub with views of the savannah and Mount Kilimanjaro',
  },
  {
    name: 'Relaxation Lounge',
    description: 'Quiet space with comfortable seating and complimentary refreshments',
  },
  {
    name: 'Treatment Rooms',
    description: 'Five private treatment rooms including a couples suite',
  },
  {
    name: 'Yoga Pavilion',
    description: 'Open-air pavilion for yoga and meditation with panoramic views',
  },
  {
    name: 'Fitness Center',
    description: 'Modern equipment for cardio and strength training',
  },
];

export default function WellnessPage() {
  return (
    <main className={styles.wellnessPage}>
      {/* Page Hero */}
      <section className={styles.heroSection}>
        <Hero
          title="Wellness & Rejuvenation"
          subtitle="Harmony in the Wild"
          description="Reconnect with yourself through holistic wellness experiences designed to restore balance and vitality in the peaceful embrace of nature"
          backgroundImage="/images/wellness/spa-exterior.jpg"
          backgroundImageAlt="Amboseli Safari Club wellness center"
          height="medium"
          overlay="medium"
          priority={true}
        />
        <CurvedDivider variant="wave1" color="white" className={styles.dividerBottom} />
      </section>

      {/* Introduction Section */}
      <section className={styles.introSection} data-section="introduction">
        <div className={styles.introContent}>
          <h2 className={styles.introHeading}>A Sanctuary for Body and Mind</h2>
          <p className={styles.introText}>
            Our wellness center combines traditional African healing practices with contemporary spa
            therapies. Using indigenous ingredients and time-honored techniques, we create
            transformative experiences that nurture your well-being while honoring the natural world
            around us.
          </p>
        </div>
      </section>

      {/* Spa Services Section */}
      <section className={styles.servicesSection} data-section="services">
        <CurvedDivider variant="wave2" color="cream" className={styles.dividerTop} />

        <div className={styles.servicesContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Spa Services</h2>
            <p className={styles.sectionSubtitle}>
              Indulge in luxurious treatments using natural, locally sourced ingredients.
            </p>
          </div>

          <BentoServiceGrid services={spaServices} />
        </div>

        <CurvedDivider variant="wave3" color="white" flip className={styles.dividerBottom} />
      </section>

      {/* Wellness Activities Section */}
      <section className={styles.activitiesSection} data-section="activities">
        <div className={styles.activitiesContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Wellness Activities</h2>
            <p className={styles.sectionSubtitle}>
              Complement your spa experience with activities that nurture mind, body, and spirit.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {wellnessActivities.map((activity, index) => (
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
                    width: '48px',
                    height: '48px',
                    marginBottom: 'var(--space-4)',
                    color: 'var(--color-primary-terracotta)',
                  }}
                >
                  {activity.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {activity.title}
                </h3>
                <div
                  style={{
                    display: 'inline-block',
                    padding: 'var(--space-1) var(--space-3)',
                    backgroundColor: 'var(--color-neutral-cream)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-primary-terracotta)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {activity.schedule}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Packages Section */}
      <section className={styles.packagesSection} data-section="packages">
        <CurvedDivider variant="wave1" color="cream" className={styles.dividerTop} />

        <div className={styles.packagesContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Wellness Packages</h2>
            <p className={styles.sectionSubtitle}>
              Curated experiences combining multiple treatments for the ultimate wellness journey.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-10)',
            }}
          >
            {wellnessPackages.map((pkg, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-10)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-display)',
                      fontSize: 'var(--heading-h3-size)',
                      fontWeight: 'var(--heading-h3-weight)',
                      color: 'var(--color-text-primary)',
                      margin: 0,
                    }}
                  >
                    {pkg.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-primary-terracotta)',
                    }}
                  >
                    {pkg.price}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {pkg.duration}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {pkg.includes.map((item, idx) => (
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
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <CurvedDivider variant="wave2" color="white" flip className={styles.dividerBottom} />
      </section>

      {/* Facilities Section */}
      <section className={styles.facilitiesSection} data-section="facilities">
        <div className={styles.facilitiesContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Wellness Facilities</h2>
            <p className={styles.sectionSubtitle}>
              State-of-the-art amenities designed for your complete relaxation and rejuvenation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {facilities.map((facility, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-6)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '4px solid var(--color-primary-terracotta)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {facility.name}
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
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} data-section="cta">
        <CurvedDivider variant="wave3" color="cream" className={styles.dividerTop} />

        <div className={styles.ctaContent}>
          <h2 className={styles.ctaHeading}>Begin Your Wellness Journey</h2>
          <p className={styles.ctaText}>
            Book your wellness experience and discover the perfect balance between adventure and
            relaxation. Advance reservations recommended for spa treatments.
          </p>
          <div className={styles.ctaButtons}>
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
              Book Spa Treatment
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

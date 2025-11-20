import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';
import CurvedDivider from '@/components/atoms/CurvedDivider';
import BentoServiceGrid from '@/components/organisms/BentoServiceGrid';
import MorphingBlob from '@/components/atoms/MorphingBlob';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import StaggeredGrid from '@/components/atoms/StaggeredGrid';
import ActivityCard from '@/components/molecules/ActivityCard';
import PackageCard from '@/components/molecules/PackageCard';
import FacilityCard from '@/components/molecules/FacilityCard';
import WellnessBackgroundSymbols from '@/components/atoms/WellnessBackgroundSymbols';
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
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    imageAlt: 'Luxury spa treatment room with massage table',
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
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    imageAlt: 'Serene wellness sanctuary with natural lighting',
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
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    imageAlt: 'Couples relaxing in luxury spa jacuzzi',
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
          backgroundImage="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          backgroundImageAlt="Luxury spa treatment room with serene mountain views"
          height="medium"
          overlay="medium"
          priority={true}
        />
        <CurvedDivider variant="wave1" color="white" animated className={styles.dividerBottom} />
      </section>

      {/* Introduction Section */}
      <section className={styles.introSection} data-section="introduction">
        {/* Morphing blobs for visual interest */}
        <MorphingBlob
          color="peach"
          size="large"
          position={{ top: '10%', right: '5%' }}
          duration={28}
          delay={0}
          blur={80}
        />
        <MorphingBlob
          color="cream"
          size="medium"
          position={{ bottom: '15%', left: '8%' }}
          duration={32}
          delay={5}
          blur={70}
        />

        {/* Wellness symbols for complementary background */}
        <WellnessBackgroundSymbols
          type="leaf"
          position={{ top: '20%', left: '15%' }}
          size={140}
          opacity={0.06}
          duration={22}
          delay={0}
          rotation={-15}
        />
        <WellnessBackgroundSymbols
          type="mandala"
          position={{ bottom: '25%', right: '12%' }}
          size={100}
          opacity={0.05}
          duration={30}
          delay={3}
          rotation={0}
        />
        <WellnessBackgroundSymbols
          type="flower"
          position={{ top: '60%', left: '5%' }}
          size={80}
          opacity={0.07}
          duration={18}
          delay={6}
          rotation={25}
        />

        <AnimatedSection variant="fadeUp" delay={0.2}>
          <div className={styles.introContent}>
            <h2 className={styles.introHeading}>A Sanctuary for Body and Mind</h2>
            <p className={styles.introText}>
              Our wellness center combines traditional African healing practices with contemporary spa
              therapies. Using indigenous ingredients and time-honored techniques, we create
              transformative experiences that nurture your well-being while honoring the natural world
              around us.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Spa Services Section */}
      <section className={styles.servicesSection} data-section="services">
        <CurvedDivider variant="wave2" color="cream" animated className={styles.dividerTop} />

        {/* Background blobs for services section */}
        <MorphingBlob
          color="terracotta"
          size="xlarge"
          position={{ top: '20%', left: '-10%' }}
          duration={30}
          delay={2}
          blur={90}
        />
        <MorphingBlob
          color="warmGradient"
          size="large"
          position={{ bottom: '10%', right: '-5%' }}
          duration={35}
          delay={8}
          blur={85}
        />
        <MorphingBlob
          color="peach"
          size="medium"
          position={{ top: '50%', right: '10%' }}
          duration={26}
          delay={12}
          blur={75}
        />

        {/* Wellness symbols for services section */}
        <WellnessBackgroundSymbols
          type="spiral"
          position={{ top: '30%', left: '8%' }}
          size={120}
          opacity={0.06}
          duration={25}
          delay={2}
          rotation={45}
        />
        <WellnessBackgroundSymbols
          type="leaf"
          position={{ bottom: '20%', right: '8%' }}
          size={110}
          opacity={0.05}
          duration={20}
          delay={8}
          rotation={30}
        />
        <WellnessBackgroundSymbols
          type="wave"
          position={{ top: '65%', left: '3%' }}
          size={90}
          opacity={0.06}
          duration={15}
          delay={4}
          rotation={-10}
        />

        <div className={styles.servicesContainer}>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Spa Services</h2>
              <p className={styles.sectionSubtitle}>
                Indulge in luxurious treatments using natural, locally sourced ingredients.
              </p>
            </div>
          </AnimatedSection>

          <BentoServiceGrid services={spaServices} />
        </div>

        <CurvedDivider variant="wave3" color="white" flip animated className={styles.dividerBottom} />
      </section>

      {/* Wellness Activities Section */}
      <section className={styles.activitiesSection} data-section="activities">
        {/* Subtle blobs for activities section */}
        <MorphingBlob
          color="peach"
          size="medium"
          position={{ top: '5%', left: '15%' }}
          duration={29}
          delay={4}
          blur={70}
        />

        {/* Wellness symbols for activities section */}
        <WellnessBackgroundSymbols
          type="flower"
          position={{ top: '15%', right: '10%' }}
          size={95}
          opacity={0.06}
          duration={19}
          delay={1}
          rotation={-20}
        />
        <WellnessBackgroundSymbols
          type="mandala"
          position={{ bottom: '15%', left: '10%' }}
          size={85}
          opacity={0.05}
          duration={28}
          delay={5}
          rotation={0}
        />
        <WellnessBackgroundSymbols
          type="leaf"
          position={{ top: '50%', right: '5%' }}
          size={75}
          opacity={0.07}
          duration={21}
          delay={3}
          rotation={15}
        />

        <div className={styles.activitiesContainer}>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Wellness Activities</h2>
              <p className={styles.sectionSubtitle}>
                Complement your spa experience with activities that nurture mind, body, and spirit.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredGrid
            columns="repeat(auto-fit, minmax(280px, 1fr))"
            gap="var(--space-8)"
            baseDelay={0.2}
            staggerDelay={0.1}
          >
            {wellnessActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                title={activity.title}
                description={activity.description}
                schedule={activity.schedule}
                icon={activity.icon}
              />
            ))}
          </StaggeredGrid>
        </div>
      </section>

      {/* Wellness Packages Section */}
      <section className={styles.packagesSection} data-section="packages">
        <CurvedDivider variant="wave1" color="cream" animated className={styles.dividerTop} />

        {/* Elegant blobs for packages section */}
        <MorphingBlob
          color="cream"
          size="large"
          position={{ top: '15%', right: '10%' }}
          duration={33}
          delay={6}
          blur={75}
        />
        <MorphingBlob
          color="terracotta"
          size="medium"
          position={{ bottom: '20%', left: '5%' }}
          duration={27}
          delay={10}
          blur={65}
        />

        {/* Wellness symbols for packages section */}
        <WellnessBackgroundSymbols
          type="spiral"
          position={{ top: '25%', right: '15%' }}
          size={105}
          opacity={0.06}
          duration={24}
          delay={2}
          rotation={60}
        />
        <WellnessBackgroundSymbols
          type="wave"
          position={{ bottom: '30%', left: '8%' }}
          size={100}
          opacity={0.05}
          duration={16}
          delay={7}
          rotation={-5}
        />
        <WellnessBackgroundSymbols
          type="flower"
          position={{ top: '55%', right: '5%' }}
          size={85}
          opacity={0.06}
          duration={17}
          delay={4}
          rotation={35}
        />

        <div className={styles.packagesContainer}>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Wellness Packages</h2>
              <p className={styles.sectionSubtitle}>
                Curated experiences combining multiple treatments for the ultimate wellness journey.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredGrid
            columns="repeat(auto-fit, minmax(320px, 1fr))"
            gap="var(--space-10)"
            baseDelay={0.2}
            staggerDelay={0.15}
          >
            {wellnessPackages.map((pkg, index) => (
              <PackageCard
                key={index}
                title={pkg.title}
                duration={pkg.duration}
                price={pkg.price}
                includes={pkg.includes}
                image={pkg.image}
                imageAlt={pkg.imageAlt}
              />
            ))}
          </StaggeredGrid>
        </div>

        <CurvedDivider variant="wave2" color="white" flip className={styles.dividerBottom} />
      </section>

      {/* Facilities Section */}
      <section className={styles.facilitiesSection} data-section="facilities">
        {/* Wellness symbols for facilities section */}
        <WellnessBackgroundSymbols
          type="leaf"
          position={{ top: '10%', left: '12%' }}
          size={110}
          opacity={0.06}
          duration={23}
          delay={0}
          rotation={-25}
        />
        <WellnessBackgroundSymbols
          type="mandala"
          position={{ bottom: '20%', right: '10%' }}
          size={90}
          opacity={0.05}
          duration={29}
          delay={6}
          rotation={0}
        />
        <WellnessBackgroundSymbols
          type="spiral"
          position={{ top: '45%', left: '3%' }}
          size={80}
          opacity={0.06}
          duration={22}
          delay={3}
          rotation={50}
        />

        <div className={styles.facilitiesContainer}>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Wellness Facilities</h2>
              <p className={styles.sectionSubtitle}>
                State-of-the-art amenities designed for your complete relaxation and rejuvenation.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredGrid
            columns="repeat(auto-fill, minmax(280px, 1fr))"
            gap="var(--space-6)"
            baseDelay={0.2}
            staggerDelay={0.08}
          >
            {facilities.map((facility, index) => (
              <FacilityCard
                key={index}
                name={facility.name}
                description={facility.description}
              />
            ))}
          </StaggeredGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} data-section="cta">
        <CurvedDivider variant="wave3" color="cream" animated className={styles.dividerTop} />

        {/* Final blob for CTA section */}
        <MorphingBlob
          color="peach"
          size="large"
          position={{ top: '30%', left: '40%' }}
          duration={31}
          delay={3}
          blur={80}
        />

        {/* Wellness symbols for CTA section */}
        <WellnessBackgroundSymbols
          type="flower"
          position={{ top: '20%', left: '15%' }}
          size={100}
          opacity={0.06}
          duration={18}
          delay={1}
          rotation={-30}
        />
        <WellnessBackgroundSymbols
          type="wave"
          position={{ bottom: '25%', right: '12%' }}
          size={95}
          opacity={0.05}
          duration={14}
          delay={5}
          rotation={10}
        />
        <WellnessBackgroundSymbols
          type="mandala"
          position={{ top: '60%', left: '8%' }}
          size={85}
          opacity={0.06}
          duration={27}
          delay={3}
          rotation={0}
        />

        <AnimatedSection variant="fadeUp" delay={0.2}>
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
        </AnimatedSection>
      </section>
    </main>
  );
}

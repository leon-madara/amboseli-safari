import { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import StaggeredGrid from '@/components/atoms/StaggeredGrid';
import styles from './wellness.module.css';

export const metadata: Metadata = {
  title: 'Wellness & Spa - Modern Sanctuary',
  description:
    'Experience tranquility at our modern wellness sanctuary. Luxurious spa treatments, holistic wellness, and serene relaxation spaces designed for your complete rejuvenation.',
};

const spaServices = [
  {
    title: 'Signature Massage',
    description: 'Deep relaxation through expert touch therapy with aromatic oils',
    duration: '90 min',
    image: '/images/wellness/massage.jpg',
  },
  {
    title: 'Facial Treatments',
    description: 'Rejuvenating skincare rituals using natural botanicals',
    duration: '60 min',
    image: '/images/wellness/facial.jpg',
  },
  {
    title: 'Body Rituals',
    description: 'Full-body wellness experiences with African healing traditions',
    duration: '120 min',
    image: '/images/wellness/body-treatment.jpg',
  },
  {
    title: 'Couples Sanctuary',
    description: 'Shared wellness journey in our private suite',
    duration: '150 min',
    image: '/images/wellness/couples.jpg',
  },
];

const wellnessActivities = [
  {
    title: 'Sunrise Yoga',
    description: 'Greet the day with mindful movement overlooking the savannah',
    time: 'Daily 6:30 AM',
    icon: '🧘',
  },
  {
    title: 'Meditation Garden',
    description: 'Find inner peace in our tranquil outdoor sanctuary',
    time: 'Open All Day',
    icon: '🌸',
  },
  {
    title: 'Fitness Studio',
    description: 'Modern equipment and personal training',
    time: '24/7 Access',
    icon: '💪',
  },
  {
    title: 'Wellness Consultations',
    description: 'Personalized wellness planning with expert guidance',
    time: 'By Appointment',
    icon: '✨',
  },
];

const facilities = [
  'Heated Infinity Pool',
  'Finnish Sauna',
  'Steam Room',
  'Relaxation Lounge',
  'Hydrotherapy Pool',
  'Private Treatment Suites',
];

export default function WellnessPage() {
  return (
    <main className={styles.wellnessPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src="/images/wellness/spa-hero.jpg"
            alt="Modern wellness sanctuary"
            fill
            priority
            className={styles.heroImg}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className={styles.heroTitle}>Wellness & Spa</h1>
            <p className={styles.heroSubtitle}>A Modern Sanctuary for Mind, Body & Spirit</p>
            <button className={styles.heroButton}>Book Your Experience</button>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className={styles.intro}>
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div className={styles.introContent}>
            <h2 className={styles.introTitle}>Welcome to Tranquility</h2>
            <p className={styles.introText}>
              Our wellness sanctuary blends modern spa luxury with ancient African healing wisdom.
              Every treatment is crafted to restore balance, nurture well-being, and awaken your
              senses in harmony with nature.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Spa Services */}
      <section className={styles.services}>
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Spa Services</h2>
            <p className={styles.sectionSubtitle}>
              Curated treatments for your complete rejuvenation
            </p>
          </div>
        </AnimatedSection>

        <StaggeredGrid
          columns="repeat(auto-fit, minmax(280px, 1fr))"
          gap="var(--space-8)"
          baseDelay={0.2}
          staggerDelay={0.1}
        >
          {spaServices.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceImageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={styles.serviceImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <span className={styles.serviceDuration}>{service.duration}</span>
              </div>
            </div>
          ))}
        </StaggeredGrid>
      </section>

      {/* Wellness Activities */}
      <section className={styles.activities}>
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Wellness Activities</h2>
            <p className={styles.sectionSubtitle}>Holistic experiences for body and mind</p>
          </div>
        </AnimatedSection>

        <StaggeredGrid
          columns="repeat(auto-fit, minmax(260px, 1fr))"
          gap="var(--space-6)"
          baseDelay={0.2}
          staggerDelay={0.08}
        >
          {wellnessActivities.map((activity, index) => (
            <div key={index} className={styles.activityCard}>
              <span className={styles.activityIcon}>{activity.icon}</span>
              <h3 className={styles.activityTitle}>{activity.title}</h3>
              <p className={styles.activityDescription}>{activity.description}</p>
              <span className={styles.activityTime}>{activity.time}</span>
            </div>
          ))}
        </StaggeredGrid>
      </section>

      {/* Facilities Showcase */}
      <section className={styles.facilities}>
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <div className={styles.facilitiesContent}>
            <h2 className={styles.sectionTitle}>World-Class Facilities</h2>
            <div className={styles.facilitiesList}>
              {facilities.map((facility, index) => (
                <div key={index} className={styles.facilityItem}>
                  <span className={styles.facilityCheck}>✓</span>
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.facilitiesImage}>
            <Image
              src="/images/wellness/facilities.jpg"
              alt="Wellness facilities"
              fill
              className={styles.facilityImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <AnimatedSection variant="fadeUp" delay={0.2}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Begin Your Wellness Journey</h2>
            <p className={styles.ctaText}>
              Reserve your transformative spa experience today
            </p>
            <div className={styles.ctaButtons}>
              <Link
                href="/contact"
                className={styles.ctaPrimary}
              >
                Book Treatment
              </Link>
              <Link
                href="/accommodations"
                className={styles.ctaSecondary}
              >
                View Packages
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}

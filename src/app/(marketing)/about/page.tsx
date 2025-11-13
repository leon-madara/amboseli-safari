import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';
import Card from '@/components/molecules/Card';
import Icon from '@/components/atoms/Icon';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Amboseli Safari Club - our story, mission, values, and commitment to sustainable luxury tourism in Kenya. Discover what makes us unique.',
};

const values = [
  {
    title: 'Authentic Experiences',
    description:
      'We create genuine connections with nature and culture, offering immersive safari experiences that respect and celebrate East African heritage.',
    icon: 'leaf',
  },
  {
    title: 'Exceptional Service',
    description:
      'From arrival to departure, our dedicated team ensures every moment exceeds expectations through personalized attention and genuine hospitality.',
    icon: 'concierge-bell',
  },
  {
    title: 'Environmental Stewardship',
    description:
      'We protect and preserve the ecosystems we call home, minimizing our footprint while maximizing positive impact on wildlife and wilderness.',
    icon: 'shield-check',
  },
  {
    title: 'Community Partnership',
    description:
      'We empower local communities through employment, fair trade, and support for education and healthcare initiatives in the region.',
    icon: 'users',
  },
];

const sustainabilityInitiatives = [
  {
    category: 'Energy & Resources',
    initiatives: [
      'Solar power system provides 80% of our energy needs',
      'Rainwater harvesting and greywater recycling systems',
      'Energy-efficient lighting and appliances throughout',
      'Water conservation measures in all operations',
    ],
  },
  {
    category: 'Waste Management',
    initiatives: [
      'Zero single-use plastics policy',
      'Comprehensive recycling and composting program',
      'Organic waste converted to compost for gardens',
      'Partnership with local waste management initiatives',
    ],
  },
  {
    category: 'Wildlife Conservation',
    initiatives: [
      'Support for anti-poaching patrols in Amboseli',
      'Contribution to elephant research and monitoring',
      'Habitat restoration projects in partnership with KWS',
      'Wildlife corridor protection initiatives',
    ],
  },
  {
    category: 'Community Development',
    initiatives: [
      'Employment priority for local community members',
      'Support for local schools and healthcare facilities',
      'Partnerships with Maasai artisan cooperatives',
      'Cultural preservation and education programs',
    ],
  },
];

const milestones = [
  {
    year: '2024',
    title: 'Sustainability Certification',
    description: 'Awarded EcoTourism Kenya Gold Certification',
  },
  {
    year: '2023',
    title: 'Community Partnership Program',
    description: 'Launched education initiative supporting 5 local schools',
  },
  {
    year: '2022',
    title: 'Solar Power Installation',
    description: 'Completed installation of comprehensive solar energy system',
  },
  {
    year: '2020',
    title: 'Grand Opening',
    description: 'Officially opened Amboseli Safari Club to guests',
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Our Story"
        subtitle="Where Luxury Meets Conservation"
        description="Committed to creating unforgettable safari experiences while protecting the wildlife and communities that make Amboseli extraordinary"
        backgroundImage="/images/about/lodge-sunset.jpg"
        backgroundImageAlt="Amboseli Safari Club at sunset"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* Brand Story Section */}
      <section className={styles.section}>
        <div className={styles.containerLg}>
          <div className={`${styles.textCenter} ${styles.marginBottom12}`}>
            <h2 className={styles.heading2}>A Vision Born from Passion</h2>
            <div className={styles.storyContainer}>
              <p className={styles.storyText}>
                Amboseli Safari Club was founded on a simple yet profound belief: that luxury travel
                and conservation can not only coexist but strengthen one another. Nestled at the
                foot of Africa&apos;s highest peak, Mount Kilimanjaro, our lodge represents years of
                careful planning, sustainable design, and a deep commitment to the land and people
                of this remarkable region.
              </p>
              <p className={styles.storyText}>
                Our journey began with a vision to create a sanctuary where guests could experience
                the raw beauty of the African wilderness without compromising on comfort, and where
                every stay would contribute positively to wildlife conservation and community
                development. Today, we&apos;re proud to welcome travelers from around the world who share
                our passion for responsible tourism.
              </p>
              <p className={styles.storyText}>
                Every aspect of Amboseli Safari Club reflects our dedication to authenticity,
                sustainability, and excellence. From our architecture that harmonizes with the
                landscape to our partnerships with local Maasai communities, we strive to honor the
                heritage of this land while creating meaningful experiences for our guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.containerLg}>
          <div className={styles.missionVisionContainer}>
            <div className={styles.missionVisionCard}>
              <h2 className={styles.missionVisionTitle}>Our Mission</h2>
              <p className={styles.missionVisionText}>
                To provide exceptional safari experiences that inspire conservation, support local
                communities, and create lasting positive impact on the ecosystems and cultures of
                East Africa, while delivering world-class hospitality to every guest.
              </p>
            </div>

            <div className={styles.missionVisionCard}>
              <h2 className={styles.missionVisionTitle}>Our Vision</h2>
              <p className={styles.missionVisionText}>
                To be East Africa&apos;s leading example of sustainable luxury tourism, where every guest
                becomes an ambassador for conservation, and where tourism serves as a powerful force
                for protecting wildlife and empowering communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.textCenter} ${styles.marginBottom16}`}>
            <h2 className={styles.heading2}>Our Core Values</h2>
            <p className={styles.subheading}>
              The principles that guide every decision we make and every experience we create.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.gridFit}`}>
            {values.map((value, index) => (
              <Card key={index} className={styles.card}>
                <Icon name={value.icon as any} className={styles.icon} />
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardDescription}>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Initiatives Section */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.container}>
          <div className={`${styles.textCenter} ${styles.marginBottom16}`}>
            <h2 className={styles.heading2}>Sustainability in Action</h2>
            <p className={styles.subheading}>
              Our commitment to sustainability extends across every aspect of our operations.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.gridFitLarge}`}>
            {sustainabilityInitiatives.map((category, index) => (
              <div key={index} className={styles.sustainabilityCard}>
                <h3 className={styles.sustainabilityTitle}>{category.category}</h3>
                <ul className={styles.sustainabilityList}>
                  {category.initiatives.map((initiative, idx) => (
                    <li key={idx} className={styles.sustainabilityListItem}>
                      {initiative}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className={styles.section}>
        <div className={styles.containerLg}>
          <div className={`${styles.textCenter} ${styles.marginBottom16}`}>
            <h2 className={styles.heading2}>Our Journey</h2>
            <p className={styles.subheading}>
              Key milestones in our commitment to excellence and sustainability.
            </p>
          </div>

          <div className={styles.timeline}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>
                  <span>{milestone.year}</span>
                </div>
                <div className={styles.timelineConnector}>
                  <div className={styles.timelineDot} />
                  {index < milestones.length - 1 && <div className={styles.timelineLine} />}
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDescription}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Experience Our Vision</h2>
          <p className={styles.ctaText}>
            Join us in creating meaningful travel experiences that make a difference. Discover how
            your safari can contribute to conservation and community development.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" variant="primary">
              Plan Your Visit
            </Link>
            <Link href="/accommodations" variant="underline">
              View Accommodations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';
import Card from '@/components/molecules/Card';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';
import styles from './location.module.css';

export const metadata: Metadata = {
  title: 'Location & Directions',
  description:
    'Find Amboseli Safari Club in the heart of Amboseli National Park, Kenya. Discover how to reach us by air or road, and explore nearby attractions.',
};

const travelOptions = [
  {
    title: 'By Air',
    description:
      'The fastest and most scenic way to reach us. Fly directly from Nairobi to Amboseli.',
    options: [
      {
        name: 'Scheduled Flights',
        details: 'Daily flights from Wilson Airport, Nairobi (45 minutes)',
        providers: 'SafariLink, AirKenya',
      },
      {
        name: 'Private Charter',
        details: 'Flexible timing and direct flights available',
        providers: 'Various operators available',
      },
      {
        name: 'From Lodge Transfer',
        details: 'Complimentary airstrip pickup (10 minutes to lodge)',
        providers: 'Included in booking',
      },
    ],
    icon: 'plane',
  },
  {
    title: 'By Road',
    description:
      'Enjoy the scenic journey through the Kenyan countryside to Amboseli.',
    options: [
      {
        name: 'Private Transfer',
        details: 'Direct service from Nairobi (4-5 hours, 240km)',
        providers: 'We can arrange for you',
      },
      {
        name: 'Self-Drive',
        details: 'Well-maintained tarmac and murram roads',
        providers: '4WD recommended during rainy season',
      },
      {
        name: 'Scheduled Shuttle',
        details: 'Daily departures from Nairobi hotels',
        providers: 'Advance booking required',
      },
    ],
    icon: 'car',
  },
  {
    title: 'From Other Parks',
    description:
      'Combine your Amboseli experience with other iconic Kenyan destinations.',
    options: [
      {
        name: 'From Masai Mara',
        details: 'Fly via Nairobi or direct charter (2 hours)',
        providers: 'Charter flights available',
      },
      {
        name: 'From Tsavo',
        details: 'Road transfer 3-4 hours',
        providers: 'Easy to combine in itinerary',
      },
      {
        name: 'Multi-Park Safari',
        details: 'Custom itineraries combining multiple parks',
        providers: 'We can help plan',
      },
    ],
    icon: 'map-pin',
  },
];

const nearbyAttractions = [
  {
    name: 'Amboseli National Park',
    distance: 'Adjacent',
    description:
      'World-famous for large elephant herds and stunning views of Mount Kilimanjaro. Home to over 400 bird species.',
    highlights: ['Elephant herds', 'Kilimanjaro views', 'Big Five', 'Bird watching'],
  },
  {
    name: 'Mount Kilimanjaro',
    distance: 'View from lodge',
    description:
      "Africa's highest peak (5,895m). While in Tanzania, its magnificent presence dominates Amboseli's landscape.",
    highlights: ['Iconic views', 'Sunrise/sunset', 'Photography', 'Snow-capped peak'],
  },
  {
    name: 'Maasai Villages',
    distance: '15-30 minutes',
    description:
      'Experience authentic Maasai culture, traditional dances, and learn about pastoral nomadic lifestyle.',
    highlights: ['Cultural visits', 'Traditional dancing', 'Beadwork', 'Local crafts'],
  },
  {
    name: 'Observation Hill',
    distance: '20 minutes',
    description:
      'Panoramic viewpoint offering 360° views of Amboseli, the swamps, and Mount Kilimanjaro.',
    highlights: ['Scenic viewpoint', 'Photography spot', 'Hiking', 'Picnic area'],
  },
  {
    name: 'Kimana Sanctuary',
    distance: '30 minutes',
    description:
      'Community-owned wildlife sanctuary offering walking safaris and cultural experiences.',
    highlights: ['Walking safaris', 'Community tourism', 'Wildlife', 'Bird watching'],
  },
  {
    name: 'Tsavo West National Park',
    distance: '2 hours',
    description:
      'Volcanic landscapes, Mzima Springs, and diverse wildlife. Perfect for multi-day safaris.',
    highlights: ['Mzima Springs', 'Volcanic scenery', 'Rhino sanctuary', 'Game drives'],
  },
];

const travelTips = [
  {
    title: 'Best Time to Visit',
    tips: [
      'Dry season (June-October, January-February) for best wildlife viewing',
      'Wet season (March-May, November) for fewer crowds and lush landscapes',
      'Kilimanjaro is clearest early morning and late afternoon',
    ],
  },
  {
    title: 'What to Pack',
    tips: [
      'Lightweight, neutral-colored clothing for game drives',
      'Warm jacket for early morning drives',
      'Good quality binoculars and camera with zoom lens',
      'Sun protection (hat, sunscreen, sunglasses)',
      'Insect repellent',
    ],
  },
  {
    title: 'Travel Requirements',
    tips: [
      'Valid passport (6 months validity)',
      'Kenya eVisa (apply online in advance)',
      'Yellow fever certificate if coming from endemic countries',
      'Travel insurance recommended',
    ],
  },
  {
    title: 'Health & Safety',
    tips: [
      'Malaria prophylaxis recommended - consult your doctor',
      'Stay hydrated in the African sun',
      'Follow guide instructions during game drives',
      'Respect wildlife - maintain safe distances',
    ],
  },
];

export default function LocationPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Gateway to Amboseli"
        subtitle="Your Journey Begins Here"
        description="Nestled in the heart of Amboseli National Park with spectacular views of Mount Kilimanjaro, we're easily accessible from Nairobi by air or road"
        backgroundImage="/images/location/amboseli-landscape.jpg"
        backgroundImageAlt="Amboseli Safari Club location"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* Location Overview Section */}
      <section className={styles.section}>
        <div className={styles.containerLg}>
          <div className={`${styles.textCenter} ${styles.marginBottom12}`}>
            <h2 className={styles.heading2}>Our Location</h2>
            <p className={styles.subheading}>
              Amboseli Safari Club is located within Amboseli National Park in Kajiado County,
              southern Kenya, approximately 240 kilometers southeast of Nairobi.
            </p>
          </div>

          <div
            className={`${styles.grid} ${styles.gridFitSmall}`}
            style={{ marginBottom: 'var(--space-12)' }}
          >
            <Card>
              <h3 className={styles.tipTitle}>Address</h3>
              <p className={styles.cardDescription}>
                Amboseli National Park
                <br />
                Kajiado County
                <br />
                Kenya
              </p>
            </Card>

            <Card>
              <h3 className={styles.tipTitle}>Coordinates</h3>
              <p className={styles.cardDescription}>
                2.6526° S
                <br />
                37.2606° E
                <br />
                Elevation: 1,200m
              </p>
            </Card>

            <Card>
              <h3 className={styles.tipTitle}>Nearest Airstrip</h3>
              <p className={styles.cardDescription}>
                Amboseli Airstrip
                <br />
                10 minutes from lodge
                <br />
                Pickup included
              </p>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className={styles.mapPlaceholder}>
            <Icon name="map" className={styles.mapIcon} />
            <h3 className={styles.mapTitle}>Interactive Map</h3>
            <p className={styles.mapText}>
              View our location on Google Maps:
              <br />
              <Link
                href="https://maps.google.com/?q=-2.6526,37.2606"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                Open in Google Maps
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Getting There Section */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.container}>
          <div className={`${styles.textCenter} ${styles.marginBottom16}`}>
            <h2 className={styles.heading2}>Getting Here</h2>
            <p className={styles.subheading}>
              Multiple convenient options to reach Amboseli Safari Club from Nairobi and other
              destinations.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.gridFit}`}>
            {travelOptions.map((option, index) => (
              <Card key={index} className={styles.card}>
                <Icon name={option.icon as any} className={styles.icon} />
                <h3 className={styles.cardTitle}>{option.title}</h3>
                <p className={styles.cardDescription}>{option.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {option.options.map((opt, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 'var(--space-4)',
                        backgroundColor: 'var(--color-neutral-cream)',
                        borderRadius: 'var(--radius-lg)',
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: 'var(--font-size-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--color-text-primary)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {opt.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: 'var(--font-size-sm)',
                          lineHeight: 'var(--line-height-relaxed)',
                          color: 'var(--color-text-secondary)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        {opt.details}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-primary-terracotta)',
                          margin: 0,
                        }}
                      >
                        {opt.providers}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.textCenter} ${styles.marginBottom16}`}>
            <h2 className={styles.heading2}>Nearby Attractions</h2>
            <p className={styles.subheading}>
              Discover the natural wonders and cultural experiences surrounding Amboseli Safari
              Club.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.gridFill}`}>
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className={styles.attractionCard}>
                <div className={styles.attractionHeader}>
                  <h3 className={styles.attractionTitle}>{attraction.name}</h3>
                  <Badge variant="terracotta">{attraction.distance}</Badge>
                </div>
                <p className={styles.attractionDescription}>{attraction.description}</p>
                <div className={styles.highlightContainer}>
                  {attraction.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="neutral">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={styles.containerLg}>
          <div className={`${styles.textCenter} ${styles.marginBottom12}`}>
            <h2 className={styles.heading2}>Travel Tips</h2>
            <p className={styles.subheading}>
              Essential information to help you prepare for your Amboseli adventure.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.gridFitSmall}`}>
            {travelTips.map((category, index) => (
              <Card key={index} className={styles.tipCard}>
                <h3 className={styles.tipTitle}>{category.title}</h3>
                <ul className={styles.tipList}>
                  {category.tips.map((tip, idx) => (
                    <li key={idx} className={styles.tipListItem}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.ctaSection} ${styles.sectionCream}`}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Need Help Planning Your Journey?</h2>
          <p className={styles.ctaText}>
            Our team can arrange all your travel logistics including flights, transfers, and
            multi-destination itineraries. Get in touch to start planning.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" variant="primary">
              Contact Us
            </Link>
            <Link href="/faq" variant="secondary">
              View FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

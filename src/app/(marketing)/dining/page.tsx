import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/organisms/Hero';
import Link from '@/components/atoms/Link';
import RestaurantCard from '@/components/molecules/RestaurantCard/RestaurantCard';
import MenuCard from '@/components/molecules/MenuCard/MenuCard';
import ExperienceCard from '@/components/molecules/ExperienceCard/ExperienceCard';
import { restaurants, menuHighlights, diningExperiences, dietaryOptions } from '@/data/dining';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dining Experience',
  description:
    'Savor exquisite cuisine at Amboseli Safari Club. From authentic Kenyan dishes to international favorites, our culinary team creates memorable dining experiences with locally sourced ingredients.',
};

export default function DiningPage() {
  return (
    <main className={styles.main}>
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
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Our Dining Venues</h2>
            <p className={styles.subtitle}>
              From fine dining to casual terrace meals, each venue offers a unique atmosphere and
              exceptional cuisine.
            </p>
          </div>

          <div className={styles.restaurantsGrid}>
            {restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights Section */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Menu Highlights</h2>
            <p className={styles.subtitle}>
              A selection of our most popular dishes, crafted with fresh, locally sourced
              ingredients.
            </p>
          </div>

          <div className={styles.menuGrid}>
            {menuHighlights.map((menu, index) => (
              <MenuCard key={index} menu={menu} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Dining Experiences Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>Special Dining Experiences</h2>
            <p className={styles.subtitle}>
              Elevate your safari with unique dining experiences that create lasting memories.
            </p>
          </div>

          <div className={styles.experiencesGrid}>
            {diningExperiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience as any} />
            ))}
          </div>
        </div>
      </section>

      {/* Dietary Information Section */}
      <section className={styles.dietarySection}>
        <div className={styles.dietaryContainer}>
          <div className={styles.dietaryCard}>
            <h2 className={styles.dietaryHeading}>Dietary Accommodations</h2>
            <p className={styles.dietaryDescription}>
              We cater to all dietary requirements including vegetarian, vegan, gluten-free,
              dairy-free, and other special dietary needs. Please inform us of any allergies or
              preferences when booking.
            </p>
            <div className={styles.dietaryOptions}>
              {dietaryOptions.map((diet, index) => (
                <div key={index} className={styles.dietaryBadge}>
                  {diet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaHeading}>Reserve Your Culinary Journey</h2>
          <p className={styles.ctaDescription}>
            Book your stay and experience exceptional dining in the heart of the African wilderness.
            Special dining experiences can be arranged upon request.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Make a Reservation
            </Link>
            <Link href="/accommodations" className={styles.ctaSecondary}>
              View Accommodations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

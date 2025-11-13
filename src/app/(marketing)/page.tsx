import Image from 'next/image';
import Link from 'next/link';
import { SafariChapter } from '@/components/sections/SafariChapter';
import styles from './homepage.module.css';

export default function HomePage() {
  return (
    <main className={styles.safariJourney}>
      {/* CHAPTER 0: PRE-DAWN HERO */}
      <SafariChapter
        id="pre-dawn"
        chapterNumber={0}
        title="Pre-Dawn"
        timeOfDay="pre-dawn"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2400&q=80',
            alt: 'Mount Kilimanjaro at dawn',
            speed: 0.3,
            priority: true,
          },
          {
            src: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=2400&q=80',
            alt: 'Elephant silhouette',
            speed: 1.0,
            opacity: 0.7,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/logos/mainLOGOAmboseli.svg"
              alt="Amboseli Safari Club"
              width={320}
              height={120}
              priority
              className={styles.logo}
            />
          </div>

          <h1 className={styles.heroTitle}>Welcome to the Wild</h1>
          <p className={styles.heroSubtitle}>Opening December 2025</p>
          <p className={styles.heroDescription}>
            Experience a day in the life of an Amboseli safari. From dawn to dusk,
            discover luxury, wildlife, and unforgettable moments beneath Mount Kilimanjaro.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Begin Your Safari
            </Link>
            <Link href="/accommodations" className={styles.ctaSecondary}>
              Book Your Stay
            </Link>
          </div>

          <div className={styles.scrollHint}>
            <span className={styles.scrollText}>Scroll to explore your journey</span>
            <span className={styles.scrollArrow}>↓</span>
          </div>
        </div>
      </SafariChapter>

      {/* CHAPTER 1: SUNRISE - JOURNEY BEGINS */}
      <SafariChapter
        id="sunrise"
        chapterNumber={1}
        title="Sunrise"
        timeOfDay="dawn"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=2400&q=80',
            alt: 'African sunrise over savannah',
            speed: 0.3,
          },
          {
            src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2400&q=80',
            alt: 'Safari jeep',
            speed: 0.8,
            opacity: 0.6,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 1: Dawn</span>
          <h2 className={styles.chapterTitle}>Your Safari Begins</h2>
          <p className={styles.chapterText}>
            As the first golden rays paint the sky, your adventure awakens. The air is crisp,
            filled with the calls of early birds. Your guide awaits, ready to take you into
            the heart of the wild.
          </p>
          <p className={styles.chapterQuote}>
            "The African dawn is not just a time—it is a feeling, a promise of wonder."
          </p>
        </div>
      </SafariChapter>

      {/* CHAPTER 2: MORNING DRIVE - WILDLIFE ENCOUNTER */}
      <SafariChapter
        id="morning-drive"
        chapterNumber={2}
        title="Morning Drive"
        timeOfDay="morning"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1534188753412-5de454a62e35?w=2400&q=80',
            alt: 'Savannah landscape',
            speed: 0.3,
          },
          {
            src: 'https://images.unsplash.com/photo-1547970810-dc1e684458f7?w=2400&q=80',
            alt: 'Acacia trees',
            speed: 0.6,
            opacity: 0.8,
          },
          {
            src: 'https://images.unsplash.com/photo-1535338788835-0a44918a8e4c?w=2400&q=80',
            alt: 'Elephant herd',
            speed: 1.0,
            opacity: 0.9,
          },
        ]}
        minHeight="120vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 2: Morning</span>
          <h2 className={styles.chapterTitle}>Into the Wild</h2>
          <p className={styles.chapterText}>
            The game drive reveals nature's theater. Elephant herds march in majestic procession,
            lions rest in the morning shade, and Kilimanjaro stands sentinel over it all.
          </p>

          <div className={styles.wildlifeGrid}>
            <div className={styles.wildlifeCard}>
              <div className={styles.wildlifeIcon}>🐘</div>
              <h3>Elephant Herds</h3>
              <p>Amboseli's iconic giants</p>
            </div>
            <div className={styles.wildlifeCard}>
              <div className={styles.wildlifeIcon}>🦁</div>
              <h3>Big Cats</h3>
              <p>Lions, cheetahs, leopards</p>
            </div>
            <div className={styles.wildlifeCard}>
              <div className={styles.wildlifeIcon}>🦒</div>
              <h3>Giraffes & Zebras</h3>
              <p>The plains come alive</p>
            </div>
          </div>

          <Link href="/experiences" className={styles.chapterCTA}>
            Explore Wildlife Experiences →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 3: BUSH BREAKFAST */}
      <SafariChapter
        id="bush-breakfast"
        chapterNumber={3}
        title="Bush Breakfast"
        timeOfDay="morning"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=2400&q=80',
            alt: 'Bush breakfast setup',
            speed: 0.4,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 3: Mid-Morning</span>
          <h2 className={styles.chapterTitle}>Breakfast in the Savannah</h2>
          <p className={styles.chapterText}>
            Under the shade of an ancient acacia, a table is set. Fresh fruit, warm pastries,
            and Kenyan coffee await. Here, luxury meets wilderness in perfect harmony.
          </p>
          <p className={styles.chapterQuote}>
            "Dine where the wild things roam, beneath an endless African sky."
          </p>
          <Link href="/dining" className={styles.chapterCTA}>
            Discover Our Cuisine →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 4: ACCOMMODATIONS PREVIEW */}
      <SafariChapter
        id="accommodations"
        chapterNumber={4}
        title="Accommodations"
        timeOfDay="midday"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=80',
            alt: 'Safari lodge',
            speed: 0.3,
          },
          {
            src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2400&q=80',
            alt: 'Luxury room',
            speed: 0.7,
            opacity: 0.85,
          },
        ]}
        minHeight="110vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 4: Midday</span>
          <h2 className={styles.chapterTitle}>Your Oasis in the Wild</h2>
          <p className={styles.chapterText}>
            Return to comfort. Each room frames Kilimanjaro like a masterpiece, blending
            elegant design with the raw beauty of the bush. This is where adventure meets serenity.
          </p>

          <div className={styles.roomPreview}>
            <div className={styles.roomFeature}>
              <span className={styles.featureIcon}>🏔️</span>
              <p>Kilimanjaro Views</p>
            </div>
            <div className={styles.roomFeature}>
              <span className={styles.featureIcon}>🛏️</span>
              <p>Luxury Suites</p>
            </div>
            <div className={styles.roomFeature}>
              <span className={styles.featureIcon}>🌿</span>
              <p>Eco-Luxury Design</p>
            </div>
          </div>

          <Link href="/accommodations" className={styles.chapterCTA}>
            View All Rooms →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 5: DINING EXPERIENCE */}
      <SafariChapter
        id="dining"
        chapterNumber={5}
        title="Dining"
        timeOfDay="afternoon"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=80',
            alt: 'Dining with view',
            speed: 0.3,
          },
          {
            src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=2400&q=80',
            alt: 'Fine dining',
            speed: 0.8,
            opacity: 0.7,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 5: Afternoon</span>
          <h2 className={styles.chapterTitle}>Flavors of the Savannah</h2>
          <p className={styles.chapterText}>
            Savor sundowners on the deck as the day softens. Our chefs blend local ingredients
            with international flair, creating dishes that tell the story of Kenya.
          </p>
          <p className={styles.chapterQuote}>
            "Every meal is a celebration of place, of moment, of connection."
          </p>
          <Link href="/dining" className={styles.chapterCTA}>
            Explore Our Menu →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 6: SAFARI EXPERIENCES */}
      <SafariChapter
        id="experiences"
        chapterNumber={6}
        title="Safari Experiences"
        timeOfDay="golden-hour"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=2400&q=80',
            alt: 'Golden hour safari',
            speed: 0.3,
          },
          {
            src: 'https://images.unsplash.com/photo-1591634616938-1dfa7ee2e617?w=2400&q=80',
            alt: 'Safari jeep at sunset',
            speed: 0.9,
          },
        ]}
        minHeight="120vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 6: Golden Hour</span>
          <h2 className={styles.chapterTitle}>The Magic Hour</h2>
          <p className={styles.chapterText}>
            As afternoon yields to evening, the savannah transforms. The golden hour bathes
            everything in warm light—this is when the magic truly happens.
          </p>

          <div className={styles.experienceGrid}>
            <div className={styles.experienceCard}>
              <h3>Game Drives</h3>
              <p>Dawn & dusk expeditions</p>
            </div>
            <div className={styles.experienceCard}>
              <h3>Walking Safaris</h3>
              <p>Guided bush walks</p>
            </div>
            <div className={styles.experienceCard}>
              <h3>Cultural Visits</h3>
              <p>Meet the Maasai</p>
            </div>
            <div className={styles.experienceCard}>
              <h3>Photography</h3>
              <p>Capture the moment</p>
            </div>
          </div>

          <Link href="/experiences" className={styles.chapterCTA}>
            Plan Your Safari →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 7: WELLNESS MOMENT */}
      <SafariChapter
        id="wellness"
        chapterNumber={7}
        title="Wellness"
        timeOfDay="golden-hour"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=2400&q=80',
            alt: 'Yoga at sunset',
            speed: 0.4,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 7: Evening</span>
          <h2 className={styles.chapterTitle}>Restore in Nature</h2>
          <p className={styles.chapterText}>
            Find balance. Stretch toward the setting sun in an outdoor yoga session,
            or indulge in treatments inspired by Maasai healing traditions.
          </p>
          <p className={styles.chapterQuote}>
            "Wellness is not a destination. It is a journey back to yourself."
          </p>
          <Link href="/wellness" className={styles.chapterCTA}>
            Explore Wellness →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 8: GUEST STORIES */}
      <SafariChapter
        id="testimonials"
        chapterNumber={8}
        title="Guest Stories"
        timeOfDay="sunset"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=2400&q=80',
            alt: 'Campfire at sunset',
            speed: 0.4,
          },
        ]}
        minHeight="110vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 8: Sunset</span>
          <h2 className={styles.chapterTitle}>Voices from the Journey</h2>
          <p className={styles.chapterText}>
            Every safari writes its own story. Here are some of the moments our guests
            have shared with us.
          </p>

          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Watching elephants cross beneath Kilimanjaro at sunrise—
                I will never forget that moment."
              </p>
              <p className={styles.testimonialAuthor}>— Sarah & James, UK</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "The perfect blend of adventure and luxury. Every detail was thoughtful."
              </p>
              <p className={styles.testimonialAuthor}>— Michael Chen, Singapore</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "Our guides were incredible—knowledgeable, passionate, and patient with our cameras!"
              </p>
              <p className={styles.testimonialAuthor}>— Emma Rodriguez, Spain</p>
            </div>
          </div>
        </div>
      </SafariChapter>

      {/* CHAPTER 9: LOCATION & ACCESS */}
      <SafariChapter
        id="location"
        chapterNumber={9}
        title="Location"
        timeOfDay="dusk"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=2400&q=80',
            alt: 'Aerial view of landscape',
            speed: 0.3,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 9: Dusk</span>
          <h2 className={styles.chapterTitle}>Getting Here</h2>
          <p className={styles.chapterText}>
            Located in the heart of Amboseli National Park, just 240km from Nairobi.
            Accessible by road or charter flight to our private airstrip.
          </p>

          <div className={styles.locationInfo}>
            <div className={styles.locationItem}>
              <span className={styles.locationIcon}>✈️</span>
              <h3>By Air</h3>
              <p>1-hour charter flight from Nairobi</p>
            </div>
            <div className={styles.locationItem}>
              <span className={styles.locationIcon}>🚗</span>
              <h3>By Road</h3>
              <p>4-hour scenic drive</p>
            </div>
            <div className={styles.locationItem}>
              <span className={styles.locationIcon}>🌍</span>
              <h3>Location</h3>
              <p>Amboseli National Park, Kenya</p>
            </div>
          </div>

          <Link href="/location" className={styles.chapterCTA}>
            View Full Map & Travel Info →
          </Link>
        </div>
      </SafariChapter>

      {/* CHAPTER 10: SAFARI JOURNAL */}
      <SafariChapter
        id="blog"
        chapterNumber={10}
        title="Safari Journal"
        timeOfDay="twilight"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=2400&q=80',
            alt: 'Twilight savannah',
            speed: 0.3,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 10: Twilight</span>
          <h2 className={styles.chapterTitle}>Stories from the Bush</h2>
          <p className={styles.chapterText}>
            Conservation updates, wildlife sightings, and safari tips from our team.
          </p>

          <div className={styles.blogGrid}>
            <div className={styles.blogCard}>
              <h3>Elephant Conservation in Amboseli</h3>
              <p>How we're protecting the herds</p>
            </div>
            <div className={styles.blogCard}>
              <h3>Best Time to Visit</h3>
              <p>Seasonal guide for wildlife viewing</p>
            </div>
            <div className={styles.blogCard}>
              <h3>Photography Tips</h3>
              <p>Capturing Kilimanjaro's magic</p>
            </div>
          </div>

          <div className={styles.newsletterBox}>
            <h3>Join Our Safari Community</h3>
            <p>Get monthly updates, wildlife stories, and exclusive offers</p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </SafariChapter>

      {/* CHAPTER 11: PLAN YOUR SAFARI - FINAL CTA */}
      <SafariChapter
        id="contact"
        chapterNumber={11}
        title="Plan Your Safari"
        timeOfDay="night"
        backgroundLayers={[
          {
            src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2400&q=80',
            alt: 'Starry night',
            speed: 0.3,
          },
        ]}
        minHeight="100vh"
      >
        <div className={styles.chapterContent}>
          <span className={styles.chapterLabel}>Chapter 11: Night</span>
          <h2 className={styles.chapterTitle}>Your Journey Awaits</h2>
          <p className={styles.chapterText}>
            From dawn to dusk, you've seen what awaits. Now it's time to make it real.
            Let us craft your perfect Amboseli experience.
          </p>

          <div className={styles.finalCTA}>
            <h3>Opening December 2025</h3>
            <p>Early bookings now available</p>

            <div className={styles.contactOptions}>
              <Link href="/contact" className={styles.ctaPrimary}>
                Start Planning Your Safari
              </Link>
              <a href="tel:+254700000000" className={styles.ctaSecondary}>
                📞 Call Us
              </a>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondary}
              >
                💬 WhatsApp
              </a>
            </div>

            <div className={styles.trustBadges}>
              <span>🏆 Luxury Safari Award 2024</span>
              <span>🌿 Eco-Certified Lodge</span>
              <span>⭐ 5-Star Rated</span>
            </div>
          </div>
        </div>
      </SafariChapter>
    </main>
  );
}

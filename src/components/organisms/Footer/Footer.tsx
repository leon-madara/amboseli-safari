import Image from 'next/image';
import Link from '@/components/atoms/Link';
import SocialLinks from '@/components/molecules/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logos/mainLOGOAmboseli.svg"
              alt="Amboseli Safari Club"
              width={200}
              height={67}
              className={styles.logo}
            />
          </Link>
          <p className={styles.tagline}>
            Experience the ultimate luxury safari with breathtaking Mount Kilimanjaro views and unforgettable wildlife encounters.
          </p>
          <div className={styles.openingDate}>
            <p className={styles.openingLabel}>Opening December 2025</p>
          </div>
        </div>

        {/* Explore Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Explore</h4>
          <nav className={styles.linkList}>
            <Link href="/accommodations" className={styles.footerLink}>Accommodations</Link>
            <Link href="/experiences" className={styles.footerLink}>Experiences</Link>
            <Link href="/dining" className={styles.footerLink}>Dining</Link>
            <Link href="/wellness" className={styles.footerLink}>Wellness</Link>
            <Link href="/location" className={styles.footerLink}>Location</Link>
          </nav>
        </div>

        {/* About Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>About</h4>
          <nav className={styles.linkList}>
            <Link href="/about" className={styles.footerLink}>Our Story</Link>
            <Link href="/faq" className={styles.footerLink}>FAQ</Link>
            <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
          </nav>
        </div>

        {/* Legal Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Legal</h4>
          <nav className={styles.linkList}>
            <Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms-conditions" className={styles.footerLink}>Terms & Conditions</Link>
            <Link href="/cancellation-policy" className={styles.footerLink}>Cancellation Policy</Link>
          </nav>
        </div>

        {/* Connect Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Connect</h4>
          <div className={styles.socialSection}>
            <p className={styles.socialText}>Follow our journey</p>
            <SocialLinks
              facebook="#"
              instagram="#"
              twitter="#"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Amboseli Safari Club. All rights reserved.
          </p>
          <p className={styles.location}>
            Amboseli National Park, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Amboseli Safari Club.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      <div className={styles.content}>
        <p>
          This Privacy Policy describes how Amboseli Safari Club ("we", "us", or "our") collects,
          uses, and discloses your personal information when you visit our website, use our
          services, or otherwise communicate with us.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information that you provide directly to us, such as when you make
          a booking, contact us with inquiries, or subscribe to our newsletter. This information may
          include:
        </p>
        <ul>
          <li>Name and contact information (email, phone number, address)</li>
          <li>Booking details (dates of stay, room preferences, special requests)</li>
          <li>Payment information (credit card details, billing address)</li>
          <li>Passport or other identification details for booking confirmation</li>
          <li>Dietary requirements and health information relevant to your stay</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Process and manage your bookings and payments</li>
          <li>Communicate with you about your stay and our services</li>
          <li>Personalize your experience at our lodge</li>
          <li>Send you marketing communications, if you have opted in</li>
          <li>Comply with legal and regulatory requirements</li>
          <li>Improve our website and services</li>
        </ul>

        <h2>3. Information Sharing and Disclosure</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share your
          information with:
        </p>
        <ul>
          <li>
            Service providers who perform services on our behalf, such as payment processors and
            email service providers
          </li>
          <li>
            Government authorities or law enforcement officials if required by law or to protect
            our legal rights
          </li>
          <li>
            Third parties in connection with a corporate transaction, such as a merger or sale of
            assets
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information from unauthorized
          access, use, or disclosure. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </p>

        <h2>5. Your Rights and Choices</h2>
        <p>
          You may have certain rights regarding your personal information, subject to local law.
          These may include the right to:
        </p>
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>Object to or restrict our processing of your information</li>
          <li>Withdraw your consent for marketing communications</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the contact information provided below.
        </p>

        <h2>6. Cookies and Tracking Technologies</h2>
        <p>
          Our website may use cookies and similar tracking technologies to enhance your browsing
          experience and analyze website traffic. You can control cookies through your browser
          settings.
        </p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@amboselisafariclub.com
          <br />
          Phone: +254 123 456 789
        </p>
      </div>
    </main>
  );
}

import { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Amboseli Safari Club.',
};

export default function TermsConditionsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      <div className={styles.content}>
        <p>
          These Terms and Conditions ("Terms") govern your use of the Amboseli Safari Club website
          and services. By accessing our website or making a booking, you agree to be bound by
          these Terms.
        </p>

        <h2>1. Bookings and Payments</h2>
        <ul>
          <li>
            A deposit of 50% of the total booking cost is required to confirm a reservation.
          </li>
          <li>
            The remaining balance is due 30 days prior to your arrival date.
          </li>
          <li>
            Payments can be made by credit card or bank transfer. All prices are quoted in USD
            unless otherwise stated.
          </li>
          <li>
            Rates are subject to change without notice, but confirmed bookings will be honored at
            the quoted rate.
          </li>
        </ul>

        <h2>2. Cancellations and Refunds</h2>
        <p>
          Please refer to our separate Cancellation Policy page for detailed information on
          cancellation terms and fees.
        </p>

        <h2>3. Check-in and Check-out</h2>
        <ul>
          <li>Check-in time is from 2:00 PM on the day of arrival.</li>
          <li>Check-out time is by 10:00 AM on the day of departure.</li>
          <li>
            Early check-in or late check-out may be available upon request and is subject to
            availability and additional charges.
          </li>
        </ul>

        <h2>4. Guest Responsibility</h2>
        <ul>
          <li>
            Guests are responsible for any damage caused to the lodge property or its contents.
          </li>
          <li>
            Guests must comply with all lodge rules and regulations, as well as the rules of
            Amboseli National Park.
          </li>
          <li>
            Amboseli Safari Club is not responsible for any loss, theft, or damage to guests'
            personal belongings.
          </li>
        </ul>

        <h2>5. Liability</h2>
        <p>
          Participation in safari activities and other experiences is at the guest's own risk.
          Amboseli Safari Club, its employees, and its agents shall not be liable for any injury,
          death, loss, or damage to person or property arising from any act or omission of the
          company or its employees.
        </p>

        <h2>6. Travel Insurance</h2>
        <p>
          Comprehensive travel and medical insurance is mandatory for all guests. This insurance
          should cover trip cancellation, medical expenses, personal baggage, and other potential
          risks.
        </p>

        <h2>7. Health and Safety</h2>
        <p>
          Guests are responsible for ensuring they have the necessary vaccinations and medications
          for travel to Kenya. Please consult your doctor for advice. Guests must follow all
          safety instructions provided by our guides and staff.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of Kenya. Any disputes arising from
          these Terms shall be subject to the exclusive jurisdiction of the Kenyan courts.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time. Changes will be
          effective upon posting to our website.
        </p>
      </div>
    </main>
  );
}

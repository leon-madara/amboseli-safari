import { Metadata } from 'next';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'Cancellation Policy for Amboseli Safari Club.',
};

export default function CancellationPolicyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cancellation Policy</h1>
      <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      <div className={styles.content}>
        <p>
          This policy outlines the terms for cancellations and refunds for bookings at Amboseli
          Safari Club. We recommend all guests purchase comprehensive travel insurance to cover
          unforeseen circumstances.
        </p>

        <h2>1. Standard Cancellation Policy</h2>
        <p>
          Cancellations must be made in writing and will be effective from the date of receipt.
          The following cancellation fees apply:
        </p>
        <ul>
          <li>
            <strong>More than 60 days prior to arrival:</strong> 25% of the total booking cost
            (the deposit) is forfeited.
          </li>
          <li>
            <strong>Between 60 and 31 days prior to arrival:</strong> 50% of the total booking
            cost is forfeited.
          </li>
          <li>
            <strong>30 days or less prior to arrival:</strong> 100% of the total booking cost is
            forfeited.
          </li>
          <li>
            <strong>No-shows or early departures:</strong> 100% of the total booking cost is
            forfeited.
          </li>
        </ul>

        <h2>2. Group Bookings</h2>
        <p>
          For bookings of 4 or more rooms, different cancellation terms may apply. Please refer to
          your group booking contract for specific details.
        </p>

        <h2>3. Postponements</h2>
        <p>
          In certain circumstances, we may allow a postponement of your booking instead of a
          cancellation. This is at the discretion of management and subject to availability.
          Postponed bookings are non-refundable if cancelled at a later date.
        </p>

        <h2>4. Force Majeure</h2>
        <p>
          Amboseli Safari Club cannot be held liable for cancellations due to events beyond our
          control, such as natural disasters, acts of war, terrorism, government regulations, or
          other force majeure events. In such cases, we will offer to postpone your booking to a
          later date.
        </p>

        <h2>5. How to Cancel</h2>
        <p>
          All cancellations must be sent in writing to our reservations team at
          reservations@amboselisafariclub.com. Please include your booking reference number in your
          communication.
        </p>
      </div>
    </main>
  );
}

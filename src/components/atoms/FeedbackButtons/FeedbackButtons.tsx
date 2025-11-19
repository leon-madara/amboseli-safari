'use client';

import { useState } from 'react';
import styles from './FeedbackButtons.module.css';

interface FeedbackButtonsProps {
  questionId: string;
}

export default function FeedbackButtons({ questionId }: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const handleFeedback = (value: 'yes' | 'no') => {
    setFeedback(value);
    // In a real implementation, you would send this to an analytics service
    // For now, we'll just log it
    console.log(`Feedback for ${questionId}: ${value}`);
  };

  if (feedback) {
    return (
      <div className={styles.feedbackContainer}>
        <div className={styles.thankYouMessage}>
          <span className={styles.thankYouIcon} aria-hidden="true">
            ✓
          </span>
          <span className={styles.thankYouText}>
            Thank you for your feedback! We appreciate your input.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackContainer}>
      <p className={styles.feedbackQuestion}>Was this helpful?</p>
      <div className={styles.buttonsGroup}>
        <button
          onClick={() => handleFeedback('yes')}
          className={styles.feedbackButton}
          aria-label="Yes, this was helpful"
        >
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 9V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1C8.53043 1 9.03914 1.21071 9.41421 1.58579C9.78929 1.96086 10 2.46957 10 3V7H15C15.3284 7.00026 15.6534 7.06924 15.9528 7.20227C16.2521 7.33529 16.5188 7.52938 16.7348 7.77244C16.9508 8.01551 17.1111 8.30183 17.2052 8.61193C17.2994 8.92204 17.3253 9.24902 17.281 9.571L16.181 17.571C16.1096 18.1037 15.8518 18.5932 15.4554 18.9513C15.059 19.3095 14.5497 19.5108 14.019 19.519H6M6 9H2V19H6V9Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Yes</span>
        </button>
        <button
          onClick={() => handleFeedback('no')}
          className={styles.feedbackButton}
          aria-label="No, this was not helpful"
        >
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14 11V17C14 17.5304 13.7893 18.0391 13.4142 18.4142C13.0391 18.7893 12.5304 19 12 19C11.4696 19 10.9609 18.7893 10.5858 18.4142C10.2107 18.0391 10 17.5304 10 17V13H5C4.67163 12.9997 4.34658 12.9308 4.04724 12.7977C3.7479 12.6647 3.48119 12.4706 3.26522 12.2276C3.04924 11.9845 2.88893 11.6982 2.79477 11.3881C2.70061 11.078 2.67466 10.751 2.719 10.429L3.819 2.429C3.89039 1.89627 4.14816 1.40681 4.54458 1.04867C4.94099 0.690535 5.45029 0.489249 5.981 0.481003H14M14 11H18V1H14V11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>No</span>
        </button>
      </div>
    </div>
  );
}

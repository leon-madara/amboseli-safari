'use client';

import styles from './PopularQuestions.module.css';

interface PopularQuestion {
  id: string;
  question: string;
  categoryId: string;
  icon: string;
}

interface PopularQuestionsProps {
  questions: PopularQuestion[];
}

export default function PopularQuestions({ questions }: PopularQuestionsProps) {
  const scrollToQuestion = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.popularContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.titleIcon} aria-hidden="true">
            ⭐
          </span>
          Popular Questions
        </h3>
        <p className={styles.subtitle}>Quick answers to our most frequently asked questions</p>
      </div>

      <div className={styles.questionsGrid}>
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => scrollToQuestion(question.categoryId)}
            className={styles.questionCard}
            aria-label={question.question}
          >
            <span className={styles.questionIcon} aria-hidden="true">
              {question.icon}
            </span>
            <span className={styles.questionText}>{question.question}</span>
            <svg
              className={styles.arrow}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

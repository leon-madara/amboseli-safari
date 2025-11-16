'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TimelineStep } from '@/data/locationData';
import styles from './JourneyTimeline.module.css';

export interface JourneyTimelineProps {
  steps: TimelineStep[];
  orientation?: 'vertical' | 'horizontal';
}

export function JourneyTimeline({
  steps,
  orientation = 'vertical',
}: JourneyTimelineProps) {
  return (
    <div className={`${styles.timeline} ${styles[orientation]}`}>
      {steps.map((step, index) => (
        <TimelineStepItem
          key={step.id}
          step={step}
          index={index}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}

interface TimelineStepItemProps {
  step: TimelineStep;
  index: number;
  isLast: boolean;
}

function TimelineStepItem({ step, index, isLast }: TimelineStepItemProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={styles.timelineStep}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Step indicator */}
      <div className={styles.stepIndicator}>
        <div className={styles.stepNumber} aria-label={`Step ${step.stepNumber}`}>
          {step.stepNumber}
        </div>
        {!isLast && <div className={styles.stepLine} />}
      </div>

      {/* Step content */}
      <div className={styles.stepContent}>
        <div className={styles.stepHeader}>
          <span className={styles.stepIcon} aria-hidden="true">{step.icon}</span>
          <h4 className={styles.stepTitle}>{step.title}</h4>
          {step.duration && (
            <span className={styles.stepDuration}>{step.duration}</span>
          )}
        </div>
        <p className={styles.stepDescription}>{step.description}</p>
        {step.tip && (
          <div className={styles.stepTip}>
            <span className={styles.tipIcon} aria-hidden="true">💡</span>
            <span className={styles.tipText}>{step.tip}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import { ParallaxImage } from '@/components/atoms/ParallaxImage';
import { CHAPTER_IMAGES } from '@/data/images';
import { BLOG_POSTS, BlogPost } from '@/data/blogPosts';
import {
  CONSERVATION_STATS,
  MIGRATION_DATA,
  ConservationStat,
} from '@/data/conservationStats';
import styles from './JournalChapter.module.css';

interface JournalChapterProps {
  id: string;
}

/**
 * Chapter 11: Safari Journal
 *
 * Showcases blog content, conservation efforts, and community engagement.
 * Features:
 * - Blog post cards with featured articles
 * - Conservation metrics with animated counters
 * - Elephant migration tracker visualization
 * - Newsletter signup integration
 * - Twilight atmosphere
 *
 * Requirements: 13.1-13.6
 */
export default function JournalChapter({ id }: JournalChapterProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section
      ref={ref}
      id={id}
      className={styles.journalChapter}
      data-chapter="journal"
      data-time-of-day="twilight"
    >
      {/* Background layer with parallax */}
      <ParallaxImage
        src={CHAPTER_IMAGES.journal.twilight}
        alt="Twilight over the savannah"
        speed={0.3}
        className={styles.backgroundImage}
        priority={false}
      />

      {/* Atmospheric overlay for twilight effect */}
      <div className={styles.atmosphericOverlay} />

      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Section header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Safari Journal
          </motion.h2>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stories, insights, and conservation updates from the heart of Amboseli
          </motion.p>
        </div>

        {/* Blog Posts Section */}
        <div className={styles.blogSection}>
          <h3 className={styles.sectionHeading}>Latest Stories</h3>
          <BlogPostCards
            posts={featuredPosts}
            inView={inView}
          />
        </div>

        {/* Conservation Metrics Section */}
        <div className={styles.conservationSection}>
          <h3 className={styles.sectionHeading}>Conservation Impact</h3>
          <ConservationMetrics
            stats={CONSERVATION_STATS}
            inView={inView}
          />
        </div>

        {/* Migration Tracker Section */}
        <div className={styles.migrationSection}>
          <h3 className={styles.sectionHeading}>Elephant Migration Tracker</h3>
          <MigrationTracker
            data={MIGRATION_DATA}
            inView={inView}
          />
        </div>

        {/* Newsletter Signup Section */}
        <div className={styles.newsletterSection}>
          <NewsletterSignup inView={inView} />
        </div>
      </div>
    </section>
  );
}

/**
 * Blog Post Cards Component
 * Displays featured blog posts in a grid
 */
interface BlogPostCardsProps {
  posts: BlogPost[];
  inView: boolean;
}

function BlogPostCards({ posts, inView }: BlogPostCardsProps) {
  return (
    <div className={styles.blogGrid}>
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          className={styles.blogCard}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
        >
          <div className={styles.blogCardImage}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.blogImage}
            />
            <div className={styles.blogCardCategory}>{post.category}</div>
          </div>
          <div className={styles.blogCardContent}>
            <div className={styles.blogCardMeta}>
              <span className={styles.blogCardDate}>{post.date}</span>
              <span className={styles.blogCardReadTime}>{post.readTime}</span>
            </div>
            <h4 className={styles.blogCardTitle}>{post.title}</h4>
            <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
            <div className={styles.blogCardFooter}>
              <div className={styles.blogCardAuthor}>
                <span className={styles.authorIcon}>✍️</span>
                <span className={styles.authorName}>{post.author}</span>
              </div>
              <Link href={`/journal/${post.slug}`} variant="primary" className={styles.readMoreLink}>
                Read More →
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/**
 * Conservation Metrics Component
 * Displays conservation statistics with animated counters
 */
interface ConservationMetricsProps {
  stats: ConservationStat[];
  inView: boolean;
}

function ConservationMetrics({ stats, inView }: ConservationMetricsProps) {
  return (
    <div className={styles.metricsGrid}>
      {stats.map((stat, index) => (
        <MetricCard
          key={stat.id}
          stat={stat}
          inView={inView}
          delay={index * 0.1 + 0.2}
        />
      ))}
    </div>
  );
}

/**
 * Individual Metric Card with animated counter
 */
interface MetricCardProps {
  stat: ConservationStat;
  inView: boolean;
  delay: number;
}

function MetricCard({ stat, inView, delay }: MetricCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <motion.div
      className={styles.metricCard}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay }}
      style={{ borderTopColor: stat.color || '#D4AF37' }}
    >
      <div className={styles.metricIcon}>{stat.icon}</div>
      <div className={styles.metricValue}>
        {count.toLocaleString()}
        <span className={styles.metricUnit}>{stat.unit}</span>
      </div>
      <div className={styles.metricLabel}>{stat.label}</div>
      <p className={styles.metricDescription}>{stat.description}</p>
    </motion.div>
  );
}

/**
 * Migration Tracker Component
 * Visualizes elephant migration patterns
 */
interface MigrationTrackerProps {
  data: typeof MIGRATION_DATA;
  inView: boolean;
}

function MigrationTracker({ data, inView }: MigrationTrackerProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setSelectedMonth((prev) => (prev + 1) % data.months.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, data.months.length]);

  const currentMonth = data.months[selectedMonth];

  return (
    <motion.div
      className={styles.migrationTracker}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className={styles.trackerVisualization}>
        <div className={styles.trackerMap}>
          <div className={styles.trackerOverlay}>
            <div className={styles.trackerTitle}>Annual Migration Pattern</div>
            <div className={styles.trackerSubtitle}>Amboseli Elephant Population</div>
          </div>

          {/* Visualization placeholder - could be replaced with actual chart */}
          <div className={styles.trackerChart}>
            {data.months.map((month, index) => (
              <div
                key={month.month}
                className={`${styles.trackerBar} ${
                  index === selectedMonth ? styles.trackerBarActive : ''
                }`}
                style={{
                  height: `${(month.elephantCount / Math.max(...data.months.map(m => m.elephantCount))) * 100}%`,
                }}
              >
                <div className={styles.trackerBarLabel}>{month.month.substring(0, 3)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.trackerInfo}>
          <div className={styles.trackerCurrentMonth}>
            <div className={styles.trackerMonthName}>{currentMonth.month}</div>
            <div className={styles.trackerMonthStats}>
              <div className={styles.trackerStat}>
                <span className={styles.trackerStatIcon}>🐘</span>
                <span className={styles.trackerStatValue}>{currentMonth.elephantCount}</span>
                <span className={styles.trackerStatLabel}>Elephants</span>
              </div>
              <div className={styles.trackerStat}>
                <span className={styles.trackerStatIcon}>📍</span>
                <span className={styles.trackerStatValue}>{currentMonth.location}</span>
                <span className={styles.trackerStatLabel}>Primary Location</span>
              </div>
            </div>
          </div>

          {/* Month selector dots */}
          <div className={styles.trackerDots}>
            {data.months.map((_, index) => (
              <button
                key={index}
                className={`${styles.trackerDot} ${
                  index === selectedMonth ? styles.trackerDotActive : ''
                }`}
                onClick={() => setSelectedMonth(index)}
                aria-label={`View ${data.months[index].month}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.trackerDescription}>
        <p>{data.description}</p>
      </div>
    </motion.div>
  );
}

/**
 * Newsletter Signup Component
 * Email collection for safari updates
 */
interface NewsletterSignupProps {
  inView: boolean;
}

function NewsletterSignup({ inView }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus('success');
    setEmail('');

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <motion.div
      className={styles.newsletterContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className={styles.newsletterContent}>
        <div className={styles.newsletterIcon}>📬</div>
        <h3 className={styles.newsletterTitle}>Stay Connected</h3>
        <p className={styles.newsletterDescription}>
          Subscribe to receive safari updates, conservation news, and exclusive offers directly to your inbox.
        </p>

        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <div className={styles.newsletterInputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={styles.newsletterInput}
              required
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              className={styles.newsletterButton}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && (
            <motion.div
              className={styles.newsletterSuccess}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you for subscribing! Check your inbox for a confirmation email.
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              className={styles.newsletterError}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Something went wrong. Please try again.
            </motion.div>
          )}
        </form>

        <p className={styles.newsletterPrivacy}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </motion.div>
  );
}

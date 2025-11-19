'use client';

import { useRef, useState } from 'react';
import { BaseChapterProps } from '@/types/chapter';
import { SAFARI_PACKAGES, CONTACT_METHODS } from '@/data/safariPackages';
import styles from './PlanSafariChapter.module.css';

interface PlanSafariChapterProps extends BaseChapterProps {}

/**
 * Plan Safari Chapter - Reserve Your Stay
 *
 * Simplified static version displaying:
 * - Safari package options with pricing
 * - Contact form for inquiries
 * - Direct contact methods
 * - Call-to-action buttons
 */
export default function PlanSafariChapter({ id, className = '' }: PlanSafariChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    dates: '',
    package: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${styles.planSafariChapter} ${className}`}
      data-chapter="plan-safari"
      data-time-of-day="night"
      aria-labelledby="plan-safari-heading"
    >
      {/* Background with night atmosphere */}
      <div className={styles.backgroundContainer} aria-hidden="true">
        <div className={styles.atmosphericOverlay} />
      </div>

      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Section header */}
        <div className={styles.header}>
          <div className={styles.journeyComplete}>
            <div className={styles.completionIcon}>✨</div>
            <div className={styles.completionText}>Journey Complete</div>
            <div className={styles.completionSubtext}>
              You&apos;ve experienced a full day at Amboseli Safari Club
            </div>
          </div>

          <h2 id="plan-safari-heading" className={styles.sectionTitle}>
            Plan Your Safari Adventure
          </h2>
          <p className={styles.sectionSubtitle}>
            Choose your perfect safari package and let us create an unforgettable experience
          </p>
        </div>

        {/* Safari Packages Section */}
        <div className={styles.packagesSection}>
          <h3 className={styles.sectionHeading}>Safari Packages</h3>
          <div className={styles.packagesGrid}>
            {SAFARI_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${pkg.popular ? styles.packageCardPopular : ''}`}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}

                <div className={styles.packageHeader}>
                  <h4 className={styles.packageName}>{pkg.name}</h4>
                  <div className={styles.packageDuration}>{pkg.duration}</div>
                  <div className={styles.packagePrice}>{pkg.priceRange}</div>
                </div>

                <div className={styles.packageHighlights}>
                  <div className={styles.highlightsTitle}>Highlights</div>
                  <ul className={styles.highlightsList}>
                    {pkg.highlights.map((highlight, idx) => (
                      <li key={idx} className={styles.highlightItem}>
                        <span className={styles.highlightIcon}>✓</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.packageIncludes}>
                  <div className={styles.includesTitle}>What&apos;s Included</div>
                  <ul className={styles.includesList}>
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className={styles.includeItem}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.packageBestFor}>
                  <div className={styles.bestForTitle}>Best For</div>
                  <div className={styles.bestForTags}>
                    {pkg.bestFor.map((tag, idx) => (
                      <span key={idx} className={styles.bestForTag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <button className={styles.packageButton}>Select Package</button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className={styles.contactFormSection}>
          <h3 className={styles.sectionHeading}>Get in Touch</h3>
          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.formInput}
                    disabled={status === 'loading'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="guests" className={styles.formLabel}>Number of Guests *</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className={styles.formSelect}
                    required
                    disabled={status === 'loading'}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6+">6+ Guests</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="dates" className={styles.formLabel}>Preferred Dates</label>
                  <input
                    type="date"
                    id="dates"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    className={styles.formInput}
                    disabled={status === 'loading'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="package" className={styles.formLabel}>Interested Package</label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className={styles.formSelect}
                    disabled={status === 'loading'}
                  >
                    <option value="">Select a package...</option>
                    {SAFARI_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows={5}
                  placeholder="Tell us about your dream safari..."
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                className={styles.formSubmitButton}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Sent!' : 'Send Inquiry'}
              </button>

              {status === 'success' && (
                <div className={styles.formSuccess}>
                  Thank you! We&apos;ll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Contact Methods Section */}
        <div className={styles.contactMethodsSection}>
          <h3 className={styles.sectionHeading}>Reach Us Directly</h3>
          <div className={styles.contactMethodsGrid}>
            {CONTACT_METHODS.map((method) => (
              <a
                key={method.id}
                href={method.link}
                className={styles.contactMethod}
                target={method.type === 'email' ? undefined : '_blank'}
                rel={method.type === 'email' ? undefined : 'noopener noreferrer'}
                aria-label={method.label}
              >
                <div className={styles.contactMethodIcon}>{method.icon}</div>
                <div className={styles.contactMethodContent}>
                  <div className={styles.contactMethodType}>{method.type.toUpperCase()}</div>
                  <div className={styles.contactMethodValue}>{method.value}</div>
                  <div className={styles.contactMethodLabel}>{method.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className={styles.footerCTA}>
          <div className={styles.footerCTAContent}>
            <h4 className={styles.footerCTATitle}>Ready for Your Safari Adventure?</h4>
            <p className={styles.footerCTAText}>
              Our team is standing by to help you plan the trip of a lifetime.
            </p>
            <div className={styles.footerCTAButtons}>
              <button className={styles.primaryCTAButton}>Book Now</button>
              <button className={styles.secondaryCTAButton}>Download Brochure</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

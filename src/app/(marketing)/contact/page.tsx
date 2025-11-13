import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import ContactForm from '@/components/organisms/ContactForm';
import SocialLinks from '@/components/molecules/SocialLinks';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Amboseli Safari Club. Contact us for reservations, inquiries, or to learn more about our luxury safari experiences.',
};

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: 'Phone',
    value: '+254 123 456 789',
    link: 'tel:+254123456789',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: 'Email',
    value: 'info@amboselisafariclub.com',
    link: 'mailto:info@amboselisafariclub.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Location',
    value: 'Amboseli National Park, Kajiado County, Kenya',
    link: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Business Hours',
    value: 'Open 24/7 for Guests',
    link: null,
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Get in Touch"
        subtitle="We're Here to Help"
        description="Have questions about your safari adventure? Our team is ready to assist you with reservations, inquiries, and special requests"
        backgroundImage="/images/property/lobby-reception.jpg"
        backgroundImageAlt="Amboseli Safari Club reception area"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* Contact Information Section */}
      <section
        style={{
          padding: 'var(--space-section-lg) var(--space-container-padding)',
          backgroundColor: 'var(--color-neutral-cream)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width-xl)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'var(--heading-h2-size)',
                fontWeight: 'var(--heading-h2-weight)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Contact Information
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--body-large-size)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                maxWidth: '700px',
                margin: '0 auto',
              }}
            >
              Reach out to us through any of the following channels. We look forward to hearing
              from you.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-8)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  transition: 'var(--transition-all)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto var(--space-6)',
                    color: 'var(--color-primary-terracotta)',
                  }}
                >
                  {info.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'var(--font-size-base)',
                      lineHeight: 'var(--line-height-relaxed)',
                      color: 'var(--color-primary-terracotta)',
                      textDecoration: 'none',
                      transition: 'var(--transition-color)',
                    }}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: 'var(--font-size-base)',
                      lineHeight: 'var(--line-height-relaxed)',
                      color: 'var(--color-text-secondary)',
                      margin: 0,
                    }}
                  >
                    {info.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        style={{
          padding: 'var(--space-section-xl) var(--space-container-padding)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'var(--heading-h2-size)',
                fontWeight: 'var(--heading-h2-weight)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Send Us a Message
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--body-large-size)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              padding: 'var(--space-12)',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info Section */}
      <section
        style={{
          padding: 'var(--space-section-lg) var(--space-container-padding)',
          backgroundColor: 'var(--color-neutral-cream)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--heading-h2-size)',
              fontWeight: 'var(--heading-h2-weight)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Connect With Us
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--body-large-size)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-8)',
            }}
          >
            Follow us on social media for the latest updates, safari tips, and breathtaking photos
            from Amboseli.
          </p>

          <div style={{ marginBottom: 'var(--space-10)' }}>
            <SocialLinks
              facebook="https://facebook.com/amboselisafariclub"
              instagram="https://instagram.com/amboselisafariclub"
              twitter="https://twitter.com/amboselisafari"
              linkedin="https://linkedin.com/company/amboseli-safari-club"
            />
          </div>

          <div
            style={{
              marginTop: 'var(--space-12)',
              padding: 'var(--space-8)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              borderLeft: '4px solid var(--color-primary-terracotta)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Planning Your Visit?
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              Check out our{' '}
              <a
                href="/faq"
                style={{
                  color: 'var(--color-primary-terracotta)',
                  textDecoration: 'underline',
                }}
              >
                FAQ page
              </a>{' '}
              for answers to common questions, or browse our{' '}
              <a
                href="/accommodations"
                style={{
                  color: 'var(--color-primary-terracotta)',
                  textDecoration: 'underline',
                }}
              >
                accommodations
              </a>{' '}
              and{' '}
              <a
                href="/experiences"
                style={{
                  color: 'var(--color-primary-terracotta)',
                  textDecoration: 'underline',
                }}
              >
                experiences
              </a>{' '}
              to learn more about what we offer.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

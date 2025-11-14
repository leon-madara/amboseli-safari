import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import ContactForm from '@/components/organisms/ContactForm';
import SocialLinks from '@/components/molecules/SocialLinks';
import { PROPERTY_IMAGES } from '@/data/images';

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
        backgroundImage={PROPERTY_IMAGES.lobbyReception}
        backgroundImageAlt="Amboseli Safari Club reception area"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* Quick Stats Section */}
      <section
        style={{
          padding: 'var(--space-section-md) var(--space-container-padding)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width-lg)', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-8)',
              textAlign: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-primary-terracotta)',
                  fontFamily: 'var(--font-family-display)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                &lt; 24hrs
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-family-body)',
                }}
              >
                Average Response Time
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-primary-terracotta)',
                  fontFamily: 'var(--font-family-display)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                24/7
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-family-body)',
                }}
              >
                Available for Guests
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-primary-terracotta)',
                  fontFamily: 'var(--font-family-display)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-family-body)',
                }}
              >
                Guest Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section
        style={{
          padding: 'var(--space-section-lg) var(--space-container-padding)',
          backgroundColor: 'var(--color-neutral-cream)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width-xl)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <div
              style={{
                display: 'inline-block',
                padding: 'var(--space-2) var(--space-4)',
                backgroundColor: 'var(--color-primary-sand)',
                color: 'var(--color-primary-terracotta-dark)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-body)',
              }}
            >
              Multiple Ways to Connect
            </div>
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
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: info.link ? 'pointer' : 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  borderTop: '3px solid var(--color-primary-terracotta)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  const icon = e.currentTarget.querySelector('[data-icon]') as HTMLElement;
                  if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  const icon = e.currentTarget.querySelector('[data-icon]') as HTMLElement;
                  if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                <div
                  data-icon
                  style={{
                    width: '72px',
                    height: '72px',
                    margin: '0 auto var(--space-6)',
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-neutral-cream)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-primary-terracotta)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                      fontWeight: 'var(--font-weight-medium)',
                      transition: 'var(--transition-color)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary-terracotta-dark)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary-terracotta)';
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
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success-dark)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-body)',
              }}
            >
              <span style={{ fontSize: '1.2em' }}>✓</span>
              Quick Response Guaranteed
            </div>
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
              Fill out the form below and we&apos;ll get back to you within 24 hours. Our dedicated
              team is here to help plan your perfect safari experience.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-neutral-cream)',
              padding: 'var(--space-12)',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <ContactForm />
          </div>

          {/* Additional Contact Options */}
          <div
            style={{
              marginTop: 'var(--space-12)',
              padding: 'var(--space-8)',
              backgroundColor: 'var(--color-primary-sand-light)',
              borderRadius: 'var(--radius-xl)',
              borderLeft: '4px solid var(--color-primary-terracotta)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-6)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1', minWidth: '250px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Prefer to Talk?
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}
              >
                Our safari experts are available to discuss your travel plans and answer any
                questions you may have.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <a
                href="tel:+254123456789"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  backgroundColor: 'var(--color-primary-terracotta)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  transition: 'var(--transition-all)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-terracotta-dark)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-terracotta)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <span style={{ fontSize: '1.2em' }}>📞</span>
                Call Us Now
              </a>
              <a
                href="mailto:info@amboselisafariclub.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-primary-terracotta)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  transition: 'var(--transition-all)',
                  border: '2px solid var(--color-primary-terracotta)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-terracotta)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  e.currentTarget.style.color = 'var(--color-primary-terracotta)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <span style={{ fontSize: '1.2em' }}>✉️</span>
                Email Us
              </a>
            </div>
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
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-4)',
              backgroundColor: 'var(--color-accent-amber-light)',
              color: 'var(--color-accent-amber-dark)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-4)',
              fontFamily: 'var(--font-family-body)',
            }}
          >
            Stay Connected
          </div>
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
              maxWidth: '650px',
              margin: '0 auto var(--space-8)',
            }}
          >
            Follow us on social media for the latest updates, safari tips, and breathtaking photos
            from Amboseli.
          </p>

          <div
            style={{
              marginBottom: 'var(--space-12)',
              padding: 'var(--space-8)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <SocialLinks
              facebook="https://facebook.com/amboselisafariclub"
              instagram="https://instagram.com/amboselisafariclub"
              twitter="https://twitter.com/amboselisafari"
              linkedin="https://linkedin.com/company/amboseli-safari-club"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                padding: 'var(--space-8)',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-xl)',
                borderTop: '3px solid var(--color-accent-gold)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>📚</div>
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
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  FAQ page
                </a>{' '}
                for answers to common questions.
              </p>
            </div>

            <div
              style={{
                padding: 'var(--space-8)',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-xl)',
                borderTop: '3px solid var(--color-secondary-sage)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>🏕️</div>
              <h3
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Explore Our Offerings
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
                Browse our{' '}
                <a
                  href="/accommodations"
                  style={{
                    color: 'var(--color-primary-terracotta)',
                    textDecoration: 'underline',
                    fontWeight: 'var(--font-weight-medium)',
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
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  experiences
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

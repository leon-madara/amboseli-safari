import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import { PROPERTY_IMAGES } from '@/data/images';
import FAQSearchAndContent from '@/components/organisms/FAQSearchAndContent';
import PrintButton from '@/components/atoms/PrintButton';
import ExportButton from '@/components/atoms/ExportButton';
import { FAQ } from '@/types/faq';
import '@/styles/print.css';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Amboseli Safari Club, including booking, accommodations, safari experiences, and travel information.',
};

const faqs: FAQ[] = [
  // Booking & Reservations
  {
    id: 'booking-1',
    question: 'How do I make a reservation?',
    answer:
      'You can make a reservation by contacting us directly via phone at +254 123 456 789, email at info@amboselisafariclub.com, or by filling out our contact form. Our team will respond within 24 hours to confirm availability and assist with your booking.',
    category: 'Booking & Reservations',
  },
  {
    id: 'booking-2',
    question: 'What is your cancellation policy?',
    answer:
      'Cancellations made 30+ days before arrival receive a full refund minus a 10% processing fee. Cancellations 15-29 days before arrival receive a 50% refund. Cancellations less than 14 days before arrival are non-refundable. Please see our full cancellation policy page for more details.',
    category: 'Booking & Reservations',
  },
  {
    id: 'booking-3',
    question: 'Do you require a deposit?',
    answer:
      'Yes, we require a 30% deposit to confirm your reservation. The remaining balance is due 30 days before your arrival date. We accept payment via bank transfer, credit card, or mobile money.',
    category: 'Booking & Reservations',
  },
  {
    id: 'booking-4',
    question: 'What is the minimum stay requirement?',
    answer:
      'We recommend a minimum stay of 2 nights to fully experience Amboseli National Park and our safari offerings. However, we can accommodate single-night stays based on availability.',
    category: 'Booking & Reservations',
  },

  // Accommodations
  {
    id: 'accommodation-1',
    question: 'What types of rooms do you offer?',
    answer:
      'We offer three accommodation types: Premium Rooms (45m², sleeps 2), Deluxe Suites (65m², sleeps 2 with separate living area), and Family Suites (85m², sleeps 4). All rooms feature en-suite bathrooms, private verandas, and stunning views of Mount Kilimanjaro.',
    category: 'Accommodations',
  },
  {
    id: 'accommodation-2',
    question: 'Are rooms equipped with air conditioning?',
    answer:
      'Yes, all our rooms feature climate control air conditioning. The natural ventilation and design of our accommodations also help maintain comfortable temperatures year-round.',
    category: 'Accommodations',
  },
  {
    id: 'accommodation-3',
    question: 'Do you have Wi-Fi?',
    answer:
      'Yes, complimentary Wi-Fi is available in all rooms and public areas. However, please note that connectivity can occasionally be affected by weather conditions in this remote location.',
    category: 'Accommodations',
  },
  {
    id: 'accommodation-4',
    question: 'Are your accommodations suitable for families with children?',
    answer:
      'Absolutely! Our Family Suites are specifically designed for families, featuring interconnecting rooms and family-friendly amenities. We provide cribs, high chairs, and can arrange child-friendly safari experiences. Children under 12 stay at a discounted rate.',
    category: 'Accommodations',
  },

  // Safari Experiences
  {
    id: 'safari-1',
    question: 'What safari experiences do you offer?',
    answer:
      'We offer morning and sunset game drives, walking safaris, cultural village visits, bird watching tours, and specialized photography safaris. All experiences are led by experienced guides and can be customized to your interests.',
    category: 'Safari Experiences',
  },
  {
    id: 'safari-2',
    question: 'When is the best time to visit Amboseli?',
    answer:
      'Amboseli can be visited year-round. The dry seasons (June-October and January-February) offer the best wildlife viewing as animals gather around water sources. The wet seasons (March-May and November-December) feature lush landscapes and excellent bird watching, plus fewer crowds.',
    category: 'Safari Experiences',
  },
  {
    id: 'safari-3',
    question: 'Will I see elephants and other wildlife?',
    answer:
      "Amboseli is famous for its large elephant herds, and sightings are virtually guaranteed. You'll also commonly see zebras, wildebeest, giraffes, buffalo, and various antelope species. Lions, cheetahs, and hyenas are regularly spotted. Our guides know the best locations for wildlife viewing.",
    category: 'Safari Experiences',
  },
  {
    id: 'safari-4',
    question: 'Are safari drives included in the room rate?',
    answer:
      'Safari experiences are offered separately from accommodation rates, allowing you to customize your itinerary. We offer various packages that combine accommodation with safari activities at discounted rates.',
    category: 'Safari Experiences',
  },

  // Dining & Amenities
  {
    id: 'dining-1',
    question: 'What dining options are available?',
    answer:
      'Our restaurant serves breakfast, lunch, and dinner featuring both international and authentic Kenyan cuisine. We use locally sourced ingredients and can accommodate dietary restrictions including vegetarian, vegan, gluten-free, and allergy-specific meals with advance notice.',
    category: 'Dining & Amenities',
  },
  {
    id: 'dining-2',
    question: 'Is the restaurant included in the room rate?',
    answer:
      'Breakfast is included with all room bookings. Lunch and dinner can be added to create full-board or half-board packages, or ordered à la carte. We recommend booking meal packages in advance for the best rates.',
    category: 'Dining & Amenities',
  },
  {
    id: 'dining-3',
    question: 'Do you have a bar or lounge area?',
    answer:
      'Yes, we have a fully stocked bar and lounge area where you can enjoy sundowners while watching the sunset over Mount Kilimanjaro. We serve premium spirits, local beers, fine wines, and creative cocktails.',
    category: 'Dining & Amenities',
  },

  // Travel & Location
  {
    id: 'location-1',
    question: 'How do I get to Amboseli Safari Club?',
    answer:
      'We are located approximately 240km southeast of Nairobi (4-5 hour drive). Options include: private road transfer, scheduled shuttle service, or domestic flight to Amboseli airstrip (45-minute flight from Nairobi). We can arrange all transfers upon request.',
    category: 'Travel & Location',
  },
  {
    id: 'location-2',
    question: 'Do I need any vaccinations or medications?',
    answer:
      'While no vaccinations are mandatory for Kenya, we recommend consulting your doctor about: Yellow Fever (required if traveling from endemic countries), Hepatitis A & B, Typhoid, and routine vaccinations. Malaria prophylaxis is recommended as Amboseli is in a malaria zone.',
    category: 'Travel & Location',
  },
  {
    id: 'location-3',
    question: 'Do I need a visa to visit Kenya?',
    answer:
      'Most international visitors require a visa to enter Kenya. You can apply for an eVisa online at evisa.go.ke before your trip. The process typically takes 2-7 business days. Some nationalities can obtain a visa on arrival, but we recommend applying in advance.',
    category: 'Travel & Location',
  },
  {
    id: 'location-4',
    question: 'What should I pack for my safari?',
    answer:
      'Essentials include: lightweight, neutral-colored clothing, a warm jacket for early morning drives, comfortable walking shoes, sun protection (hat, sunscreen, sunglasses), binoculars, camera with zoom lens, and insect repellent. We provide a detailed packing list upon booking confirmation.',
    category: 'Travel & Location',
  },

  // General
  {
    id: 'general-1',
    question: 'Is Amboseli Safari Club eco-friendly?',
    answer:
      'Yes, sustainability is core to our operations. We use solar power, implement water conservation practices, support local communities through employment and partnerships, minimize single-use plastics, and contribute to wildlife conservation efforts in Amboseli National Park.',
    category: 'General',
  },
  {
    id: 'general-2',
    question: 'What currency do you accept?',
    answer:
      'We accept Kenyan Shillings (KES), US Dollars, Euros, and British Pounds. Major credit cards (Visa, Mastercard, American Express) are also accepted. We recommend carrying some local currency for tips and small purchases.',
    category: 'General',
  },
];

// Category configuration with icons and descriptions
const categoryConfig: Record<string, { icon: string; description: string }> = {
  'Booking & Reservations': {
    icon: '📅',
    description: 'Everything about making your reservation and our policies',
  },
  'Accommodations': {
    icon: '🏕️',
    description: 'Details about our rooms, suites, and amenities',
  },
  'Safari Experiences': {
    icon: '🦁',
    description: 'Wildlife viewing, game drives, and adventure activities',
  },
  'Dining & Amenities': {
    icon: '🍽️',
    description: 'Culinary experiences and property facilities',
  },
  'Travel & Location': {
    icon: '✈️',
    description: 'Getting here, visas, health, and packing tips',
  },
  'General': {
    icon: '💡',
    description: 'Sustainability, currency, and other important information',
  },
};

export default function FAQPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Frequently Asked Questions"
        subtitle="Everything You Need to Know"
        description="Find answers to common questions about planning your luxury safari adventure at Amboseli Safari Club"
        backgroundImage={PROPERTY_IMAGES.exteriorSunset}
        backgroundImageAlt="Amboseli Safari Club at sunset"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* FAQ Content Section */}
      <section
        style={{
          padding: 'var(--space-section-xl) var(--space-container-padding)',
          background: 'var(--color-bg-primary)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width-lg)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}>
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
              Browse our frequently asked questions organized by topic. Can&apos;t find what you&apos;re
              looking for? Feel free to{' '}
              <a
                href="/contact"
                style={{
                  color: 'var(--color-primary-terracotta)',
                  textDecoration: 'underline',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                contact us
              </a>
              .
            </p>
          </div>

          {/* FAQ Search and Content */}
          <FAQSearchAndContent faqs={faqs} categoryConfig={categoryConfig} />
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          position: 'relative',
          padding: 'var(--space-section-xl) var(--space-container-padding)',
          background: `linear-gradient(
            135deg,
            var(--color-neutral-cream) 0%,
            var(--color-primary-sand-light) 100%
          )`,
          borderTop: '3px solid var(--color-accent-gold)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23C86F4D' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          {/* Safari-themed decoration */}
          <div
            style={{
              fontSize: 'var(--font-size-6xl)',
              marginBottom: 'var(--space-6)',
              filter: 'grayscale(10%)',
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            🦒🦁🐘
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--heading-h2-size)',
              fontWeight: 'var(--heading-h2-weight)',
              color: 'var(--color-secondary-deep-green)',
              marginBottom: 'var(--space-6)',
              letterSpacing: 'var(--letter-spacing-tight)',
            }}
          >
            Still Have Questions?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--body-large-size)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-12)',
              maxWidth: '700px',
              margin: '0 auto var(--space-12)',
            }}
          >
            Our safari experts are here to help you plan the perfect adventure. Whether you need
            assistance with bookings, itineraries, or special requests, we&apos;re just a message away.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-12)',
            }}
          >
            {/* Enhanced primary button */}
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-3)',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-inverse)',
                background: `linear-gradient(
                  135deg,
                  var(--color-primary-terracotta),
                  var(--color-primary-terracotta-dark)
                )`,
                textDecoration: 'none',
                padding: 'var(--space-5) var(--space-10)',
                borderRadius: 'var(--radius-xl)',
                transition: 'all var(--duration-medium) var(--ease-out)',
                boxShadow: 'var(--shadow-terracotta)',
                minWidth: '220px',
              }}
            >
              <span aria-hidden="true">💬</span>
              Contact Us
            </a>

            {/* Secondary button */}
            <a
              href="/accommodations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-3)',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-secondary-deep-green)',
                background: 'var(--color-bg-secondary)',
                textDecoration: 'none',
                padding: 'var(--space-5) var(--space-10)',
                border: '2px solid var(--color-secondary-deep-green)',
                borderRadius: 'var(--radius-xl)',
                transition: 'var(--transition-all)',
                minWidth: '220px',
              }}
            >
              <span aria-hidden="true">🏕️</span>
              View Accommodations
            </a>
          </div>

          {/* Contact methods */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-12)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              paddingTop: 'var(--space-10)',
              borderTop: '1px solid var(--color-border-light)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  marginBottom: 'var(--space-2)',
                }}
                aria-hidden="true"
              >
                📞
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Call Us
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                +254 123 456 789
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  marginBottom: 'var(--space-2)',
                }}
                aria-hidden="true"
              >
                📧
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Email Us
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                info@amboselisafariclub.com
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  marginBottom: 'var(--space-2)',
                }}
                aria-hidden="true"
              >
                💬
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                WhatsApp
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Available 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <ExportButton faqs={faqs} />
      <PrintButton />
    </main>
  );
}

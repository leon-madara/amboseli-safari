import { Metadata } from 'next';
import Hero from '@/components/organisms/Hero';
import AccordionGroup from '@/components/organisms/AccordionGroup';
import { FAQ } from '@/types/faq';

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
      'Amboseli is famous for its large elephant herds, and sightings are virtually guaranteed. You'll also commonly see zebras, wildebeest, giraffes, buffalo, and various antelope species. Lions, cheetahs, and hyenas are regularly spotted. Our guides know the best locations for wildlife viewing.',
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

// Group FAQs by category
const faqsByCategory = faqs.reduce((acc, faq) => {
  const category = faq.category || 'General';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(faq);
  return acc;
}, {} as Record<string, FAQ[]>);

const categories = Object.keys(faqsByCategory);

export default function FAQPage() {
  return (
    <main>
      {/* Page Hero */}
      <Hero
        title="Frequently Asked Questions"
        subtitle="Everything You Need to Know"
        description="Find answers to common questions about planning your luxury safari adventure at Amboseli Safari Club"
        backgroundImage="/images/property/exterior-sunset.jpg"
        backgroundImageAlt="Amboseli Safari Club at sunset"
        height="medium"
        overlay="medium"
        priority={true}
      />

      {/* FAQ Content Section */}
      <section
        style={{
          padding: 'var(--space-section-xl) var(--space-container-padding)',
        }}
      >
        <div style={{ maxWidth: 'var(--container-max-width-lg)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
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
              Browse our frequently asked questions organized by topic. Can't find what you're
              looking for? Feel free to{' '}
              <a
                href="/contact"
                style={{
                  color: 'var(--color-primary-terracotta)',
                  textDecoration: 'underline',
                }}
              >
                contact us
              </a>
              .
            </p>
          </div>

          {/* FAQs organized by category */}
          {categories.map((category, index) => (
            <div
              key={category}
              style={{
                marginBottom: index < categories.length - 1 ? 'var(--space-16)' : 0,
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontSize: 'var(--heading-h3-size)',
                  fontWeight: 'var(--heading-h3-weight)',
                  color: 'var(--color-primary-terracotta)',
                  marginBottom: 'var(--space-8)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '2px solid var(--color-primary-terracotta)',
                }}
              >
                {category}
              </h2>
              <AccordionGroup
                items={faqsByCategory[category].map((faq) => ({
                  title: faq.question,
                  content: faq.answer,
                }))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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
              marginBottom: 'var(--space-6)',
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
              marginBottom: 'var(--space-10)',
            }}
          >
            Our team is here to help you plan the perfect safari experience. Get in touch with us
            and we'll answer any questions you may have.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-inverse)',
                backgroundColor: 'var(--color-primary-terracotta)',
                textDecoration: 'none',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-button)',
                transition: 'var(--transition-all)',
                boxShadow: 'var(--shadow-button)',
                minWidth: '200px',
              }}
            >
              Contact Us
            </a>
            <a
              href="/accommodations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-primary-terracotta)',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                padding: 'var(--space-4) var(--space-8)',
                border: '2px solid var(--color-primary-terracotta)',
                borderRadius: 'var(--radius-button)',
                transition: 'var(--transition-all)',
                minWidth: '200px',
              }}
            >
              View Accommodations
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

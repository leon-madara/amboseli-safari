/**
 * Safari Packages Data
 * For Chapter 12: Plan Your Safari
 */

export interface SafariPackage {
  id: string;
  name: string;
  duration: string; // "3 Days / 2 Nights"
  priceRange: string; // "From $800 per person"
  highlights: string[];
  popular?: boolean;
  description: string;
  includes: string[];
  notIncludes?: string[];
  bestFor: string[];
  availability: 'year-round' | 'seasonal' | 'limited';
}

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'classic-safari',
    name: 'Classic Safari Experience',
    duration: '3 Days / 2 Nights',
    priceRange: 'From $800 per person',
    popular: true,
    description: 'Our most popular package offers the perfect introduction to Amboseli. Experience morning and evening game drives, bush breakfast, and stunning Kilimanjaro views.',
    highlights: [
      '4 game drives with expert guides',
      'Bush breakfast under acacia trees',
      'Sundowner cocktails with Kilimanjaro views',
      'Full board accommodation',
      'Airport transfers included',
    ],
    includes: [
      'Luxury accommodation for 2 nights',
      'All meals and beverages',
      '4 game drives',
      'Bush breakfast',
      'Sundowner experience',
      'Airport transfers',
      'Park fees',
    ],
    notIncludes: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Gratuities',
    ],
    bestFor: ['First-time safari goers', 'Couples', 'Wildlife enthusiasts'],
    availability: 'year-round',
  },
  {
    id: 'luxury-safari',
    name: 'Luxury Safari & Spa Retreat',
    duration: '5 Days / 4 Nights',
    priceRange: 'From $1,600 per person',
    description: 'Indulge in the ultimate safari luxury with premium accommodations, private game drives, spa treatments, and exclusive experiences.',
    highlights: [
      'Private game drives',
      'Spa treatments included',
      'Private bush dinners',
      'Hot air balloon safari',
      'Photography workshop',
    ],
    includes: [
      'Premium suite accommodation',
      'All meals and premium beverages',
      'Private game drives',
      '3 spa treatments',
      'Hot air balloon safari',
      'Private bush dinner',
      'Photography workshop',
      'Airport transfers (private)',
      'Park fees',
      'Laundry service',
    ],
    bestFor: ['Honeymooners', 'Luxury travelers', 'Special celebrations'],
    availability: 'year-round',
  },
  {
    id: 'family-safari',
    name: 'Family Safari Adventure',
    duration: '4 Days / 3 Nights',
    priceRange: 'From $700 per person',
    description: 'Specially designed for families with children. Includes kid-friendly activities, flexible scheduling, and educational wildlife experiences.',
    highlights: [
      'Family-friendly game drives',
      'Junior ranger program',
      'Wildlife tracking workshop',
      'Family interconnecting rooms',
      'Kids eat free under 12',
    ],
    includes: [
      'Family accommodation (interconnecting rooms)',
      'All meals (kids menu available)',
      '5 game drives',
      'Junior ranger program',
      'Wildlife tracking session',
      'Cultural village visit',
      'Airport transfers',
      'Park fees',
      'Kids under 12 eat free',
    ],
    bestFor: ['Families with children', 'Multi-generational travel', 'Educational trips'],
    availability: 'year-round',
  },
  {
    id: 'photography-safari',
    name: 'Wildlife Photography Safari',
    duration: '6 Days / 5 Nights',
    priceRange: 'From $1,400 per person',
    description: 'For serious photographers. Extended game drives at golden hours, specialized guides, and professional photography instruction.',
    highlights: [
      'Extended morning & evening drives',
      'Professional photography guide',
      'Specialized photo vehicle',
      'Post-processing workshops',
      'Small group (max 4)',
    ],
    includes: [
      'Luxury accommodation',
      'All meals',
      '8 extended game drives',
      'Professional photography guidance',
      'Post-processing workshops',
      'Specialized photo vehicle',
      'Airport transfers',
      'Park fees',
    ],
    bestFor: ['Photographers', 'Wildlife enthusiasts', 'Solo travelers'],
    availability: 'year-round',
  },
  {
    id: 'weekend-escape',
    name: 'Weekend Safari Escape',
    duration: '2 Days / 1 Night',
    priceRange: 'From $550 per person',
    description: 'Perfect for a quick getaway from Nairobi. Experience the highlights of Amboseli in a compact weekend package.',
    highlights: [
      '2 game drives',
      'Bush breakfast',
      'Quick getaway from Nairobi',
      'Perfect for weekenders',
    ],
    includes: [
      'Standard accommodation',
      'All meals',
      '2 game drives',
      'Bush breakfast',
      'Park fees',
    ],
    bestFor: ['Weekend travelers', 'Nairobi residents', 'Quick escapes'],
    availability: 'year-round',
  },
];

export interface ContactMethod {
  id: string;
  type: 'whatsapp' | 'phone' | 'email';
  value: string;
  label: string;
  icon: string; // emoji
  displayValue?: string; // Formatted for display
  link: string; // Clickable link (tel:, mailto:, https://)
  primary?: boolean;
}

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'whatsapp',
    type: 'whatsapp',
    value: '+254 712 345 678',
    label: 'Chat on WhatsApp',
    icon: '💬',
    displayValue: '+254 712 345 678',
    link: 'https://wa.me/254712345678',
    primary: true,
  },
  {
    id: 'phone',
    type: 'phone',
    value: '+254 712 345 678',
    label: 'Call Us',
    icon: '📞',
    displayValue: '+254 712 345 678',
    link: 'tel:+254712345678',
  },
  {
    id: 'email',
    type: 'email',
    value: 'reservations@amboselisafariclub.com',
    label: 'Email Us',
    icon: '📧',
    displayValue: 'reservations@amboselisafariclub.com',
    link: 'mailto:reservations@amboselisafariclub.com',
  },
];

export function getPackageById(id: string): SafariPackage | undefined {
  return SAFARI_PACKAGES.find((pkg) => pkg.id === id);
}

export function getPopularPackages(): SafariPackage[] {
  return SAFARI_PACKAGES.filter((pkg) => pkg.popular);
}

export function getPackagesByDuration(minDays: number, maxDays: number): SafariPackage[] {
  return SAFARI_PACKAGES.filter((pkg) => {
    const days = parseInt(pkg.duration.split(' ')[0]);
    return days >= minDays && days <= maxDays;
  });
}

export function getPrimaryContactMethod(): ContactMethod {
  return CONTACT_METHODS.find((method) => method.primary) || CONTACT_METHODS[0];
}

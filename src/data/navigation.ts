export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Accommodations',
    href: '/accommodations',
    children: [
      { label: 'Rooms & Suites', href: '/accommodations/rooms' },
      { label: 'View Gallery', href: '/accommodations/gallery' },
    ]
  },
  {
    label: 'Safari Experiences',
    href: '/experiences',
    children: [
      { label: 'Game Drives', href: '/experiences/game-drives' },
      { label: 'Bush Walks', href: '/experiences/bush-walks' },
      { label: 'Cultural Visits', href: '/experiences/cultural-visits' },
    ]
  },
  {
    label: 'Dining & Bar',
    href: '/dining'
  },
  {
    label: 'Wellness & Spa',
    href: '/wellness'
  },
  {
    label: 'Location & Access',
    href: '/location'
  },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about/story' },
      { label: 'Conservation', href: '/about/conservation' },
    ]
  },
  {
    label: 'Contact & Booking',
    href: '/contact'
  },
];

export const footerNavigation = {
  quickLinks: [
    { label: 'Accommodations', href: '/accommodations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Dining', href: '/dining' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
  ],
};

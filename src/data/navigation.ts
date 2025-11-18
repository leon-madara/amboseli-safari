export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

// Pill Navigation Items - Main Page Sections
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'accommodations', label: 'Accommodations', href: '/accommodations' },
  { id: 'experiences', label: 'Experiences', href: '/experiences' },
  { id: 'dining', label: 'Dining', href: '/dining' },
  { id: 'wellness', label: 'Wellness', href: '/wellness' },
  { id: 'location', label: 'Location', href: '/location' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'faq', label: 'FAQ', href: '/faq' },
];

// Logo Configuration
export const LOGO_CONFIG = {
  src: '/images/logos/mainLOGOAmboseli.svg',
  alt: 'Amboseli Safari Club',
  width: 120,
  height: 40,
};

// Navigation Color Theme Constants
export const NAV_COLORS = {
  // Pill background
  pillBg: 'rgba(250, 247, 242, 0.7)', // cream with opacity
  pillBgHover: 'rgba(250, 247, 242, 0.85)',
  
  // Text colors
  textDefault: '#3A3633', // charcoal
  textHover: '#C86F4D', // terracotta
  textActive: '#FAF7F2', // cream (inverse)
  
  // Active state
  activeBg: '#3A3633', // charcoal
  activeBorder: '#4A9FFF', // blue accent
  
  // Borders
  border: 'rgba(232, 213, 196, 0.3)', // sand with opacity
};

// CTA Button Configuration (Book Now)
export const CTA_BUTTON_CONFIG = {
  label: 'Book Now',
  href: '/contact',
  
  // Primary Style (Recommended)
  primary: {
    background: '#C86F4D', // terracotta
    backgroundHover: '#A35A3D', // terracotta-dark
    text: '#FAF7F2', // cream
    border: 'transparent',
    shadow: '0 4px 12px rgba(200, 111, 77, 0.25)',
    shadowHover: '0 6px 16px rgba(200, 111, 77, 0.35)',
  },
  
  // Alternative Style (Gold Accent)
  alternative: {
    background: '#D4AF37', // gold
    backgroundHover: '#B89520', // gold-dark
    text: '#3A3633', // charcoal
    border: 'transparent',
    shadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
    shadowHover: '0 6px 16px rgba(212, 175, 55, 0.35)',
  },
  
  // Sizing
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
};

// Legacy navigation (kept for backward compatibility)
export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/accommodations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Dining', href: '/dining' },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Location', href: '/location' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
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

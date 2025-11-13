/**
 * Guest Testimonials Data
 * For Chapter 9: Guest Stories
 */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  country: string;
  rating: number; // 1-5 stars
  text: string;
  date: string; // ISO date
  avatar?: string;
  tripType: 'Family' | 'Couple' | 'Solo' | 'Group';
}

export const GUEST_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah & James Mitchell',
    location: 'London',
    country: 'United Kingdom',
    rating: 5,
    text: 'Our honeymoon at Amboseli Safari Club exceeded all expectations. Waking up to Mount Kilimanjaro every morning was breathtaking, and the wildlife encounters were absolutely magical. The staff made us feel like family, and the bush breakfast under the acacia trees was unforgettable.',
    date: '2025-09-15',
    avatar: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&q=80',
    tripType: 'Couple',
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    location: 'San Francisco',
    country: 'USA',
    rating: 5,
    text: 'As a solo traveler and wildlife photographer, Amboseli Safari Club was paradise. The guides knew exactly where to find the elephants, and their knowledge of animal behavior was incredible. I captured shots I\'ll treasure forever. The accommodations were luxurious yet authentic - perfect balance.',
    date: '2025-08-22',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    tripType: 'Solo',
  },
  {
    id: 'testimonial-3',
    name: 'The Anderson Family',
    location: 'Sydney',
    country: 'Australia',
    rating: 5,
    text: 'Taking our three kids on safari was the best decision we ever made. The staff at Amboseli Safari Club went above and beyond to make sure our children were engaged and safe. They even arranged a special wildlife tracking session just for the kids. Our family will never forget this experience.',
    date: '2025-07-10',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&q=80',
    tripType: 'Family',
  },
  {
    id: 'testimonial-4',
    name: 'Priya Sharma',
    location: 'Mumbai',
    country: 'India',
    rating: 5,
    text: 'The attention to detail at this lodge is extraordinary. From the moment we arrived, everything was perfect - the room with Kilimanjaro views, the sundowner cocktails on the deck, the gourmet dinners under the stars. And the game drives? We saw four of the Big Five in one morning. Absolutely spectacular!',
    date: '2025-06-18',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    tripType: 'Couple',
  },
  {
    id: 'testimonial-5',
    name: 'Marcus & Friends',
    location: 'Toronto',
    country: 'Canada',
    rating: 5,
    text: 'Our group of six friends came for a birthday celebration, and Amboseli Safari Club delivered beyond our wildest dreams. The private game drives, the bush dinners, the spa treatments - every element was world-class. We\'re already planning our return trip next year.',
    date: '2025-05-25',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    tripType: 'Group',
  },
  {
    id: 'testimonial-6',
    name: 'Emma Thompson',
    location: 'Stockholm',
    country: 'Sweden',
    rating: 5,
    text: 'As someone who values sustainability, I was impressed by the lodge\'s conservation efforts. They truly care about protecting the wildlife and supporting the local community. The experience was luxurious without compromising the environment. Plus, seeing baby elephants playing was the highlight of my life!',
    date: '2025-04-30',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    tripType: 'Solo',
  },
  {
    id: 'testimonial-7',
    name: 'Robert & Lisa Wagner',
    location: 'Berlin',
    country: 'Germany',
    rating: 5,
    text: 'We\'ve been on safaris in Tanzania and Botswana, but Amboseli Safari Club stands apart. The combination of Kilimanjaro as a backdrop, the incredible elephant population, and the intimate lodge atmosphere creates something truly special. The photography opportunities are unmatched.',
    date: '2025-03-12',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80',
    tripType: 'Couple',
  },
];

export function getTestimonialById(id: string): Testimonial | undefined {
  return GUEST_TESTIMONIALS.find((t) => t.id === id);
}

export function getTestimonialsByRating(minRating: number): Testimonial[] {
  return GUEST_TESTIMONIALS.filter((t) => t.rating >= minRating);
}

export function getRecentTestimonials(count: number = 5): Testimonial[] {
  return GUEST_TESTIMONIALS
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

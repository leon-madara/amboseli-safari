/**
 * Guest Photos Data
 * For Chapter 9: Guest Stories - Photo Wall
 */

import { GUEST_PHOTOS as GUEST_PHOTO_URLS } from './images';

export interface GuestPhoto {
  id: string;
  image: string; // URL
  caption: string;
  location: string;
  guestName: string;
  date: string; // ISO date
  tripType?: 'Family' | 'Couple' | 'Solo' | 'Group';
}

export const GUEST_PHOTOS_DATA: GuestPhoto[] = [
  {
    id: 'photo-1',
    image: GUEST_PHOTO_URLS[0].url,
    caption: 'The majestic Kilimanjaro greeted us every morning - a view we\'ll never forget',
    location: 'Amboseli Safari Club',
    guestName: 'Sarah M.',
    date: '2025-09-15',
    tripType: 'Couple',
  },
  {
    id: 'photo-2',
    image: GUEST_PHOTO_URLS[1].url,
    caption: 'Got up close with an elephant herd - absolutely breathtaking experience!',
    location: 'Morning Game Drive',
    guestName: 'Michael C.',
    date: '2025-08-22',
    tripType: 'Solo',
  },
  {
    id: 'photo-3',
    image: GUEST_PHOTO_URLS[2].url,
    caption: 'The king of the savannah - spotted this magnificent lion on our first drive',
    location: 'Amboseli National Park',
    guestName: 'Anderson Family',
    date: '2025-07-10',
    tripType: 'Family',
  },
  {
    id: 'photo-4',
    image: GUEST_PHOTO_URLS[3].url,
    caption: 'Giraffes against the African sunset - nature\'s perfect composition',
    location: 'Sunset Game Drive',
    guestName: 'Priya S.',
    date: '2025-06-18',
    tripType: 'Couple',
  },
  {
    id: 'photo-5',
    image: GUEST_PHOTO_URLS[4].url,
    caption: 'Zebra crossing - watched this beautiful herd for almost an hour',
    location: 'Central Plains',
    guestName: 'Marcus & Friends',
    date: '2025-05-25',
    tripType: 'Group',
  },
  {
    id: 'photo-6',
    image: GUEST_PHOTO_URLS[5].url,
    caption: 'Cheetah hunting - our guide knew exactly where to find wildlife',
    location: 'Southern Amboseli',
    guestName: 'Emma T.',
    date: '2025-04-30',
    tripType: 'Solo',
  },
  {
    id: 'photo-7',
    image: GUEST_PHOTO_URLS[6].url,
    caption: 'Sundowner under the acacia tree - the perfect end to our first day',
    location: 'Bush Dining Setup',
    guestName: 'Robert & Lisa W.',
    date: '2025-03-12',
    tripType: 'Couple',
  },
  {
    id: 'photo-8',
    image: GUEST_PHOTO_URLS[7].url,
    caption: 'The vast Amboseli landscape - endless horizons and wildlife everywhere',
    location: 'Observation Hill',
    guestName: 'Jennifer L.',
    date: '2025-02-20',
    tripType: 'Solo',
  },
  {
    id: 'photo-9',
    image: GUEST_PHOTO_URLS[8].url,
    caption: 'Ancient baobab trees - these giants have witnessed centuries of safari stories',
    location: 'Baobab Grove',
    guestName: 'The Patel Family',
    date: '2025-01-15',
    tripType: 'Family',
  },
  {
    id: 'photo-10',
    image: GUEST_PHOTO_URLS[9].url,
    caption: 'Golden hour game drive - when the light makes everything magical',
    location: 'Western Corridor',
    guestName: 'David & Anna K.',
    date: '2024-12-10',
    tripType: 'Couple',
  },
  {
    id: 'photo-11',
    image: GUEST_PHOTO_URLS[10].url,
    caption: 'Campfire stories under a billion stars - the perfect safari evening',
    location: 'Amboseli Safari Club',
    guestName: 'Tom & Friends',
    date: '2024-11-22',
    tripType: 'Group',
  },
  {
    id: 'photo-12',
    image: GUEST_PHOTO_URLS[11].url,
    caption: 'Elephant at dawn - this gentle giant walked right past our jeep',
    location: 'Early Morning Drive',
    guestName: 'Sophie M.',
    date: '2024-10-05',
    tripType: 'Solo',
  },
];

export interface VideoTestimonial {
  id: string;
  thumbnail: string; // URL
  videoUrl: string; // YouTube embed or video URL
  guestName: string;
  duration: string; // "2:30"
  title: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'video-1',
    thumbnail: 'https://images.unsplash.com/photo-1535338788835-0a44918a8e4c?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/placeholder', // Replace with actual video
    guestName: 'Sarah & James',
    duration: '2:15',
    title: 'Our Honeymoon Safari Experience',
  },
  {
    id: 'video-2',
    thumbnail: 'https://images.unsplash.com/photo-1551318181-655e4f0ce32d?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/placeholder', // Replace with actual video
    guestName: 'Michael Chen',
    duration: '3:20',
    title: 'Wildlife Photography Tips',
  },
  {
    id: 'video-3',
    thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80',
    videoUrl: 'https://www.youtube.com/embed/placeholder', // Replace with actual video
    guestName: 'Anderson Family',
    duration: '2:45',
    title: 'Family Safari Adventure',
  },
];

export function getPhotosByGuestName(name: string): GuestPhoto[] {
  return GUEST_PHOTOS_DATA.filter((photo) =>
    photo.guestName.toLowerCase().includes(name.toLowerCase())
  );
}

export function getRecentPhotos(count: number = 12): GuestPhoto[] {
  return GUEST_PHOTOS_DATA
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

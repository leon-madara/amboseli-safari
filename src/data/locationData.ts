/**
 * Location and Access Data
 * For Chapter 10: Location & Access
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

// Amboseli Safari Club approximate location
export const LODGE_COORDINATES: Coordinates = {
  lat: -2.6527,
  lng: 37.2606,
};

export interface CityDistance {
  id: string;
  city: string;
  country?: string;
  distance: string; // "230" (without km for display flexibility)
  driveTime: string; // "3.5 hours"
  travelTime?: string; // legacy field
  transportType: 'Drive' | 'Flight' | 'Both';
  description?: string;
  icon: string; // emoji
}

export const CITY_DISTANCES: CityDistance[] = [
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    distance: '240',
    driveTime: '4 hours',
    travelTime: '4 hours',
    transportType: 'Both',
    description: 'Kenya\'s capital city and main international gateway',
    icon: '🏙️',
  },
  {
    id: 'mombasa',
    city: 'Mombasa',
    country: 'Kenya',
    distance: '450',
    driveTime: '6 hours',
    travelTime: '6 hours',
    transportType: 'Both',
    description: 'Coastal city with international airport',
    icon: '🌊',
  },
  {
    id: 'arusha',
    city: 'Arusha',
    country: 'Tanzania',
    distance: '200',
    driveTime: '3.5 hours',
    travelTime: '3.5 hours',
    transportType: 'Drive',
    description: 'Gateway to Tanzanian national parks',
    icon: '🚗',
  },
  {
    id: 'kilimanjaro-airport',
    city: 'Kilimanjaro Int\'l Airport',
    country: 'Tanzania',
    distance: '165',
    driveTime: '2.5 hours',
    travelTime: '2.5 hours',
    transportType: 'Drive',
    description: 'Nearest international airport in Tanzania',
    icon: '✈️',
  },
];

export interface TransferOption {
  id: string;
  type: 'Private Car' | 'Shared Shuttle' | 'Flight' | 'Self-Drive';
  name: string; // Display name
  from?: string;
  duration: string;
  price?: string; // legacy field
  priceRange: string; // "From $150"
  description: string;
  includes: string[];
  maxPassengers?: number;
  availability?: string;
  recommended?: boolean;
  icon: string; // emoji
}

export const TRANSFER_OPTIONS: TransferOption[] = [
  {
    id: 'private-car',
    type: 'Private Car',
    name: 'Private Car Transfer',
    from: 'Nairobi (JKIA or hotels)',
    duration: '4 hours',
    price: 'From $180 per vehicle',
    priceRange: 'From $180',
    description: 'Most comfortable option with flexibility and privacy. Perfect for families or groups.',
    includes: [
      'Professional driver',
      'Air-conditioned 4x4 vehicle',
      'Bottled water',
      'En-route stops as needed',
      'Meet and greet at airport',
    ],
    maxPassengers: 6,
    availability: '24/7',
    recommended: true,
    icon: '🚙',
  },
  {
    id: 'shared-shuttle',
    type: 'Shared Shuttle',
    name: 'Shared Shuttle',
    from: 'Nairobi (scheduled pickups)',
    duration: '4.5 hours',
    price: 'From $60 per person',
    priceRange: 'From $60',
    description: 'Budget-friendly option with scheduled departures. Meet other travelers.',
    includes: [
      'Shared comfortable vehicle',
      'Professional driver',
      'Bottled water',
      'Fixed schedule departures',
    ],
    maxPassengers: 12,
    availability: 'Daily at 8:00 AM and 2:00 PM',
    icon: '🚌',
  },
  {
    id: 'flight-transfer',
    type: 'Flight',
    name: 'Charter Flight',
    from: 'Nairobi (Wilson Airport)',
    duration: '45 minutes',
    price: 'From $220 per person',
    priceRange: 'From $220',
    description: 'Fastest option with spectacular aerial views of Kilimanjaro. Subject to weather.',
    includes: [
      'Charter flight',
      'Aerial views of Kilimanjaro',
      'Luggage allowance: 15kg',
      'Ground transfer from airstrip',
    ],
    maxPassengers: 10,
    availability: 'Weather dependent, advance booking required',
    icon: '✈️',
  },
  {
    id: 'self-drive',
    type: 'Self-Drive',
    name: 'Self-Drive',
    from: 'Nairobi or other locations',
    duration: '4+ hours',
    price: 'Car rental from $80 per day',
    priceRange: 'From $80/day',
    description: 'Drive yourself with GPS navigation. 4x4 vehicle recommended for park access.',
    includes: [
      'GPS navigation provided',
      'Route guidance',
      'Emergency contact support',
      'Parking available at lodge',
    ],
    availability: '24/7 (advance booking for rentals)',
    icon: '🗺️',
  },
];

export interface AirportInfo {
  name: string;
  code: string;
  distance: string;
  type: 'international' | 'domestic' | 'regional';
  description: string;
}

export const NEAREST_AIRPORTS: AirportInfo[] = [
  {
    name: 'Jomo Kenyatta International Airport',
    code: 'NBO',
    distance: '240 km',
    type: 'international',
    description: 'Main international gateway to Kenya, largest airport in East Africa',
  },
  {
    name: 'Amboseli Airport',
    code: 'ASV',
    distance: '10 km',
    type: 'domestic',
    description: 'Small airstrip for charter flights, closest to the lodge',
  },
  {
    name: 'Wilson Airport',
    code: 'WIL',
    distance: '235 km',
    type: 'domestic',
    description: 'Nairobi\'s domestic and charter flight hub',
  },
];

export function getRecommendedTransfer(): TransferOption | undefined {
  return TRANSFER_OPTIONS.find((option) => option.recommended);
}

export function getTransfersByPriceRange(maxPrice: number): TransferOption[] {
  return TRANSFER_OPTIONS.filter((option) => {
    const priceStr = option.price || option.priceRange;
    if (!priceStr) return false;
    const price = parseInt(priceStr.replace(/[^0-9]/g, ''));
    return price <= maxPrice;
  });
}

export function getNearestCity(): CityDistance {
  // Return Nairobi as the primary gateway
  return CITY_DISTANCES[0];
}

// Alias for consistent naming across components
export const NEARBY_AIRPORTS = NEAREST_AIRPORTS;

// ============================================================
// ENHANCED JOURNEY PLANNING DATA
// ============================================================

export interface RouteWaypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  estimatedTime?: string;
  description?: string;
}

export interface JourneyRoute {
  id: string;
  name: string;
  startLocation: string;
  waypoints: RouteWaypoint[];
  totalDistance: string;
  totalDuration: string;
  recommended?: boolean;
  transportType: 'Drive' | 'Flight' | 'Both';
  icon: string;
}

export const JOURNEY_ROUTES: JourneyRoute[] = [
  {
    id: 'nairobi-route',
    name: 'From Nairobi',
    startLocation: 'Nairobi (JKIA or City)',
    icon: '🏙️',
    waypoints: [
      {
        id: 'wp1',
        name: 'Nairobi',
        lat: -1.2921,
        lng: 36.8219,
        order: 1,
        estimatedTime: '0 min',
        description: 'Start your journey from Kenya\'s vibrant capital',
      },
      {
        id: 'wp2',
        name: 'Athi River',
        lat: -1.4519,
        lng: 36.9780,
        order: 2,
        estimatedTime: '45 min',
        description: 'Industrial town, first major stop',
      },
      {
        id: 'wp3',
        name: 'Emali Junction',
        lat: -2.0150,
        lng: 37.4528,
        order: 3,
        estimatedTime: '1.5 hours',
        description: 'Popular rest stop with restaurants and fuel',
      },
      {
        id: 'wp4',
        name: 'Kimana Gate',
        lat: -2.6450,
        lng: 37.2528,
        order: 4,
        estimatedTime: '2.5 hours',
        description: 'Main entrance to Amboseli National Park',
      },
      {
        id: 'wp5',
        name: 'Amboseli Safari Club',
        lat: -2.6527,
        lng: 37.2606,
        order: 5,
        estimatedTime: '3.5 hours',
        description: 'Your luxury safari destination',
      },
    ],
    totalDistance: '240 km',
    totalDuration: '4 hours',
    recommended: true,
    transportType: 'Both',
  },
  {
    id: 'mombasa-route',
    name: 'From Mombasa',
    startLocation: 'Mombasa',
    icon: '🌊',
    waypoints: [
      {
        id: 'mwp1',
        name: 'Mombasa',
        lat: -4.0435,
        lng: 39.6682,
        order: 1,
        estimatedTime: '0 min',
        description: 'Coastal city with beautiful beaches',
      },
      {
        id: 'mwp2',
        name: 'Voi',
        lat: -3.3961,
        lng: 38.5567,
        order: 2,
        estimatedTime: '2 hours',
        description: 'Gateway to Tsavo National Parks',
      },
      {
        id: 'mwp3',
        name: 'Emali',
        lat: -2.0150,
        lng: 37.4528,
        order: 3,
        estimatedTime: '4 hours',
        description: 'Rest stop and junction',
      },
      {
        id: 'mwp4',
        name: 'Amboseli Safari Club',
        lat: -2.6527,
        lng: 37.2606,
        order: 4,
        estimatedTime: '6 hours',
        description: 'Arrival at your destination',
      },
    ],
    totalDistance: '450 km',
    totalDuration: '6 hours',
    transportType: 'Both',
  },
  {
    id: 'arusha-route',
    name: 'From Arusha',
    startLocation: 'Arusha, Tanzania',
    icon: '🚗',
    waypoints: [
      {
        id: 'awp1',
        name: 'Arusha',
        lat: -3.3869,
        lng: 36.6830,
        order: 1,
        estimatedTime: '0 min',
        description: 'Tanzania\'s safari capital',
      },
      {
        id: 'awp2',
        name: 'Namanga Border',
        lat: -2.5500,
        lng: 36.7833,
        order: 2,
        estimatedTime: '1.5 hours',
        description: 'Kenya-Tanzania border crossing',
      },
      {
        id: 'awp3',
        name: 'Amboseli Safari Club',
        lat: -2.6527,
        lng: 37.2606,
        order: 3,
        estimatedTime: '3.5 hours',
        description: 'Welcome to Kenya\'s premier safari lodge',
      },
    ],
    totalDistance: '200 km',
    totalDuration: '3.5 hours',
    transportType: 'Drive',
  },
  {
    id: 'flight-route',
    name: 'By Air',
    startLocation: 'Wilson Airport, Nairobi',
    icon: '✈️',
    waypoints: [
      {
        id: 'fwp1',
        name: 'Wilson Airport',
        lat: -1.3217,
        lng: 36.8148,
        order: 1,
        estimatedTime: '0 min',
        description: 'Charter flight departure',
      },
      {
        id: 'fwp2',
        name: 'Amboseli Airstrip',
        lat: -2.6450,
        lng: 37.2528,
        order: 2,
        estimatedTime: '45 min',
        description: 'Land with views of Kilimanjaro',
      },
      {
        id: 'fwp3',
        name: 'Amboseli Safari Club',
        lat: -2.6527,
        lng: 37.2606,
        order: 3,
        estimatedTime: '1 hour',
        description: 'Short transfer to the lodge',
      },
    ],
    totalDistance: '230 km',
    totalDuration: '1 hour',
    transportType: 'Flight',
  },
];

export interface TimelineStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  duration?: string;
  tip?: string;
}

export const JOURNEY_TIMELINE_STEPS: { [routeId: string]: TimelineStep[] } = {
  'nairobi-route': [
    {
      id: 'step1',
      stepNumber: 1,
      title: 'Depart Nairobi',
      description: 'Pick up from your hotel or JKIA. Our driver will meet you with a welcome sign.',
      icon: '🚙',
      duration: '0 min',
      tip: 'Morning departures (8-9 AM) are recommended to avoid Nairobi traffic.',
    },
    {
      id: 'step2',
      stepNumber: 2,
      title: 'Mombasa Highway',
      description: 'Smooth drive on Kenya\'s well-maintained highway, passing through the outskirts of Nairobi.',
      icon: '🛣️',
      duration: '45 min',
      tip: 'Keep your camera ready - giraffes sometimes graze near the roadside!',
    },
    {
      id: 'step3',
      stepNumber: 3,
      title: 'Emali Rest Stop',
      description: 'Stop for refreshments, restrooms, and fuel at this popular junction.',
      icon: '☕',
      duration: '1.5 hours',
      tip: 'Last major fuel station before Amboseli - fill up your tank here.',
    },
    {
      id: 'step4',
      stepNumber: 4,
      title: 'Kimana Gate Entry',
      description: 'Enter Amboseli National Park and begin your game drive to the lodge.',
      icon: '🦒',
      duration: '2.5 hours',
      tip: 'Park entry fees: $60/adult, $35/child. Have your passport ready for registration.',
    },
    {
      id: 'step5',
      stepNumber: 5,
      title: 'Arrive at Lodge',
      description: 'Welcome to Amboseli Safari Club! Check in and enjoy a refreshing drink.',
      icon: '🏨',
      duration: '3.5 hours',
      tip: 'Check-in time is 2:00 PM. Early arrivals can enjoy lunch while rooms are prepared.',
    },
  ],
  'mombasa-route': [
    {
      id: 'mstep1',
      stepNumber: 1,
      title: 'Depart Mombasa',
      description: 'Leave the coastal paradise and head inland towards Amboseli.',
      icon: '🌊',
      duration: '0 min',
    },
    {
      id: 'mstep2',
      stepNumber: 2,
      title: 'Tsavo Region',
      description: 'Pass through the Tsavo conservation area with potential wildlife sightings.',
      icon: '🐘',
      duration: '2 hours',
      tip: 'Tsavo is famous for its red elephants - you might spot some!',
    },
    {
      id: 'mstep3',
      stepNumber: 3,
      title: 'Emali Junction',
      description: 'Stop for lunch and fuel at this major highway junction.',
      icon: '🍽️',
      duration: '4 hours',
    },
    {
      id: 'mstep4',
      stepNumber: 4,
      title: 'Arrive at Amboseli',
      description: 'Enter the park and complete your journey with a scenic game drive.',
      icon: '🏨',
      duration: '6 hours',
    },
  ],
  'arusha-route': [
    {
      id: 'astep1',
      stepNumber: 1,
      title: 'Depart Arusha',
      description: 'Begin your cross-border journey from Tanzania to Kenya.',
      icon: '🚗',
      duration: '0 min',
    },
    {
      id: 'astep2',
      stepNumber: 2,
      title: 'Namanga Border',
      description: 'Complete immigration formalities at the Kenya-Tanzania border.',
      icon: '🛂',
      duration: '1.5 hours',
      tip: 'Have your passport and visa ready. East African visa holders can use the fast lane.',
    },
    {
      id: 'astep3',
      stepNumber: 3,
      title: 'Arrive at Lodge',
      description: 'Short scenic drive to Amboseli Safari Club with Kilimanjaro views.',
      icon: '🏔️',
      duration: '3.5 hours',
    },
  ],
  'flight-route': [
    {
      id: 'fstep1',
      stepNumber: 1,
      title: 'Wilson Airport Departure',
      description: 'Check in at Nairobi\'s domestic flight hub for charter flights.',
      icon: '✈️',
      duration: '0 min',
      tip: 'Arrive 30 minutes before departure. Luggage limit: 15kg per person.',
    },
    {
      id: 'fstep2',
      stepNumber: 2,
      title: 'Scenic Flight',
      description: 'Enjoy breathtaking aerial views of Mount Kilimanjaro and the Great Rift Valley.',
      icon: '🏔️',
      duration: '15 min',
      tip: 'Window seats offer the best views - request one when booking!',
    },
    {
      id: 'fstep3',
      stepNumber: 3,
      title: 'Land at Amboseli Airstrip',
      description: 'Touch down at the park airstrip, often with elephants nearby!',
      icon: '🛬',
      duration: '45 min',
    },
    {
      id: 'fstep4',
      stepNumber: 4,
      title: 'Transfer to Lodge',
      description: 'Short 15-minute game drive to Amboseli Safari Club.',
      icon: '🚙',
      duration: '1 hour',
    },
  ],
};

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  category: 'road' | 'scenery' | 'wildlife' | 'landmarks';
}

export const JOURNEY_GALLERY: GalleryImage[] = [
  {
    id: 'gallery1',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
    alt: 'Modern highway with Mount Kilimanjaro in background',
    caption: 'Spectacular mountain views along the journey',
    category: 'scenery',
  },
  {
    id: 'gallery2',
    url: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6',
    alt: 'Elephants crossing the road',
    caption: 'Wildlife encounters are common near the park',
    category: 'wildlife',
  },
  {
    id: 'gallery3',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e',
    alt: 'Well-maintained tarmac road through savannah',
    caption: 'Smooth highways for comfortable driving',
    category: 'road',
  },
  {
    id: 'gallery4',
    url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53',
    alt: 'Mount Kilimanjaro snow-capped peak',
    caption: 'Africa\'s highest peak dominates the horizon',
    category: 'landmarks',
  },
  {
    id: 'gallery5',
    url: 'https://images.unsplash.com/photo-1534188753412-5fd2c57e8212',
    alt: 'Safari vehicle on dusty park road',
    caption: 'Game drives begin as you enter Amboseli',
    category: 'road',
  },
  {
    id: 'gallery6',
    url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44',
    alt: 'Giraffes near the roadside',
    caption: 'Keep your camera ready for roadside encounters',
    category: 'wildlife',
  },
];

export interface InfoCardData {
  id: string;
  icon: string;
  title: string;
  content: string;
  type: 'road-conditions' | 'park-fees' | 'what-to-bring' | 'best-times' | 'safety';
}

export const INFO_CARDS: InfoCardData[] = [
  {
    id: 'road-conditions',
    icon: '🛣️',
    title: 'Road Conditions',
    content: 'Well-maintained tarmac highway from Nairobi to Emali. Last 80km to park gate is good gravel road. Inside the park, roads are unpaved but passable by 2WD in dry season, 4x4 recommended during rains.',
    type: 'road-conditions',
  },
  {
    id: 'park-fees',
    icon: '🎫',
    title: 'Park Entry Fees',
    content: 'Amboseli National Park charges $60 per adult and $35 per child (5-17 years) for non-residents. Fees are valid for 24 hours and can be paid by card, USD, or Kenya Shillings. Vehicle fee is KES 300 (~$2).',
    type: 'park-fees',
  },
  {
    id: 'what-to-bring',
    icon: '🎒',
    title: 'What to Bring',
    content: 'Valid passport (if crossing from Tanzania), sunscreen, hat, sunglasses, bottled water, snacks, camera with charged batteries, light jacket for early morning/evening, and any prescription medications.',
    type: 'what-to-bring',
  },
  {
    id: 'best-times',
    icon: '⏰',
    title: 'Best Travel Times',
    content: 'Depart early morning (6-8 AM) to avoid Nairobi traffic and arrive before sunset. Avoid Friday evenings due to heavy traffic. During rainy season (April-May, November), roads inside the park can be muddy.',
    type: 'best-times',
  },
  {
    id: 'safety-tips',
    icon: '🛡️',
    title: 'Safety & Tips',
    content: 'Fill up fuel in Nairobi or Emali before entering the park. Drive carefully near Kimana Gate where elephants cross. Keep windows up when elephants are nearby. Emergency contact: +254 700 000 000 (24/7 support).',
    type: 'safety',
  },
  {
    id: 'border-crossing',
    icon: '🛂',
    title: 'Border Requirements',
    content: 'If traveling from Tanzania, ensure you have a valid East African Tourist Visa ($100) or Kenya eVisa. Yellow fever certificate required if coming from endemic areas. Vehicle insurance must cover Kenya.',
    type: 'safety',
  },
];

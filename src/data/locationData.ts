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

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
  distance: string; // "230 km"
  travelTime: string; // "3.5 hours"
  transportType: 'Drive' | 'Flight' | 'Both';
  description: string;
  icon: string; // emoji
}

export const CITY_DISTANCES: CityDistance[] = [
  {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    distance: '240 km',
    travelTime: '4 hours',
    transportType: 'Both',
    description: 'Kenya\'s capital city and main international gateway',
    icon: '✈️',
  },
  {
    id: 'mombasa',
    city: 'Mombasa',
    country: 'Kenya',
    distance: '450 km',
    travelTime: '6 hours',
    transportType: 'Both',
    description: 'Coastal city with international airport',
    icon: '🌊',
  },
  {
    id: 'arusha',
    city: 'Arusha',
    country: 'Tanzania',
    distance: '200 km',
    travelTime: '3.5 hours',
    transportType: 'Drive',
    description: 'Gateway to Tanzanian national parks',
    icon: '🚗',
  },
  {
    id: 'kilimanjaro-airport',
    city: 'Kilimanjaro International Airport',
    country: 'Tanzania',
    distance: '165 km',
    travelTime: '2.5 hours',
    transportType: 'Drive',
    description: 'Nearest international airport in Tanzania',
    icon: '✈️',
  },
];

export interface TransferOption {
  id: string;
  type: 'Private Car' | 'Shared Shuttle' | 'Flight' | 'Self-Drive';
  from: string;
  duration: string;
  price: string; // "From $150"
  description: string;
  includes: string[];
  maxPassengers?: number;
  availability: string;
  recommended?: boolean;
}

export const TRANSFER_OPTIONS: TransferOption[] = [
  {
    id: 'private-car',
    type: 'Private Car',
    from: 'Nairobi (JKIA or hotels)',
    duration: '4 hours',
    price: 'From $180 per vehicle',
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
  },
  {
    id: 'shared-shuttle',
    type: 'Shared Shuttle',
    from: 'Nairobi (scheduled pickups)',
    duration: '4.5 hours',
    price: 'From $60 per person',
    description: 'Budget-friendly option with scheduled departures. Meet other travelers.',
    includes: [
      'Shared comfortable vehicle',
      'Professional driver',
      'Bottled water',
      'Fixed schedule departures',
    ],
    maxPassengers: 12,
    availability: 'Daily at 8:00 AM and 2:00 PM',
  },
  {
    id: 'flight-transfer',
    type: 'Flight',
    from: 'Nairobi (Wilson Airport)',
    duration: '45 minutes',
    price: 'From $220 per person',
    description: 'Fastest option with spectacular aerial views of Kilimanjaro. Subject to weather.',
    includes: [
      'Charter flight',
      'Aerial views of Kilimanjaro',
      'Luggage allowance: 15kg',
      'Ground transfer from airstrip',
    ],
    maxPassengers: 10,
    availability: 'Weather dependent, advance booking required',
  },
  {
    id: 'self-drive',
    type: 'Self-Drive',
    from: 'Nairobi or other locations',
    duration: '4+ hours',
    price: 'Car rental from $80 per day',
    description: 'Drive yourself with GPS navigation. 4x4 vehicle recommended for park access.',
    includes: [
      'GPS navigation provided',
      'Route guidance',
      'Emergency contact support',
      'Parking available at lodge',
    ],
    availability: '24/7 (advance booking for rentals)',
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
    const price = parseInt(option.price.replace(/[^0-9]/g, ''));
    return price <= maxPrice;
  });
}

export function getNearestCity(): CityDistance {
  // Return Nairobi as the primary gateway
  return CITY_DISTANCES[0];
}

/**
 * Room data structure for the Accommodations Stacking Cards feature
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

export interface RoomData {
  id: string;
  name: string;
  tagline: string;
  price: number;
  size: number;
  capacity: number;
  features: string[];
  imageUrl: string;
  imageAlt: string;
}

/**
 * Validates a room data object to ensure it meets all requirements
 * @param room - The room data object to validate
 * @returns true if valid, false otherwise
 */
export function validateRoomData(room: RoomData): boolean {
  // Check all required properties exist
  if (!room.id || typeof room.id !== 'string') return false;
  if (!room.name || typeof room.name !== 'string') return false;
  if (!room.tagline || typeof room.tagline !== 'string') return false;
  if (!room.imageUrl || typeof room.imageUrl !== 'string') return false;
  if (!room.imageAlt || typeof room.imageAlt !== 'string') return false;
  
  // Check numeric properties are valid
  if (typeof room.price !== 'number' || room.price <= 0) return false;
  if (typeof room.size !== 'number' || room.size <= 0) return false;
  if (typeof room.capacity !== 'number' || room.capacity <= 0) return false;
  
  // Check features array exists and has 4-6 items (Requirement 1.4)
  if (!Array.isArray(room.features)) return false;
  if (room.features.length < 4 || room.features.length > 6) return false;
  
  return true;
}

/**
 * Four luxury room definitions for the Accommodations chapter
 * Organized in ascending price order (Requirement 1.5)
 * All images are from Unsplash with minimum 1200x800 dimensions (Requirement 1.3)
 */
export const accommodationRooms: RoomData[] = [
  {
    id: 'premium-room',
    name: 'Premium Room',
    tagline: 'Intimate luxury with panoramic savannah views',
    price: 220,
    size: 45,
    capacity: 2,
    features: [
      'King-size bed',
      'Private veranda',
      'Rainfall shower',
      'Kilimanjaro views',
      'Wi-Fi access',
      'Minibar'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&h=800&fit=crop',
    imageAlt: 'Luxury safari room with king bed and mountain views'
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    tagline: 'Spacious elegance with separate living area',
    price: 280,
    size: 65,
    capacity: 2,
    features: [
      'King-size bed',
      'Living room',
      'Bathtub & shower',
      'Private deck',
      'Butler service',
      'Premium minibar'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop',
    imageAlt: 'Deluxe suite with separate living area and private deck'
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    tagline: 'Generous space for the entire family',
    price: 380,
    size: 85,
    capacity: 4,
    features: [
      'Two bedrooms',
      'Connecting door',
      'Family bathroom',
      'Large veranda',
      'Game viewing',
      'Kids amenities'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&h=800&fit=crop',
    imageAlt: 'Family suite with two bedrooms and large veranda'
  },
  {
    id: 'presidential-villa',
    name: 'Presidential Villa',
    tagline: 'Ultimate luxury with private pool and chef',
    price: 650,
    size: 150,
    capacity: 6,
    features: [
      'Three bedrooms',
      'Private pool',
      'Personal chef',
      'Outdoor dining',
      'Spa bathroom',
      'Concierge service'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop',
    imageAlt: 'Presidential villa with private pool and outdoor dining area'
  }
];

// Validate all rooms on module load
const invalidRooms = accommodationRooms.filter(room => !validateRoomData(room));
if (invalidRooms.length > 0) {
  console.warn('Invalid room data detected:', invalidRooms.map(r => r.id));
}

/**
 * Wildlife Data Configuration
 * Featured animals at Amboseli Safari Club
 */

export interface WildlifeAnimal {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  funFact: string;
  conservationStatus: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered';
  bestTimeToSee: string;
}

/**
 * The Magnificent Five of Amboseli
 * Curated wildlife experiences
 */
export const WILDLIFE_ANIMALS: WildlifeAnimal[] = [
  {
    id: 'elephant',
    name: 'African Elephant',
    scientificName: 'Loxodonta africana',
    image: '/images/wildlife/elephant.jpg',
    description: 'Amboseli is famous for its large elephant herds, often seen against the backdrop of Mount Kilimanjaro.',
    funFact: 'Elephants can communicate using infrasound, which travels through the ground and can be detected by other elephants up to 10 miles away.',
    conservationStatus: 'Endangered',
    bestTimeToSee: 'Early morning and late afternoon',
  },
  {
    id: 'lion',
    name: 'African Lion',
    scientificName: 'Panthera leo',
    image: '/images/wildlife/lion.jpg',
    description: 'The majestic lions of Amboseli roam the savanna, often resting in the shade during the heat of the day.',
    funFact: 'A lion\'s roar can be heard from up to 5 miles away, making it one of the loudest calls in the animal kingdom.',
    conservationStatus: 'Vulnerable',
    bestTimeToSee: 'Dawn and dusk',
  },
  {
    id: 'giraffe',
    name: 'Masai Giraffe',
    scientificName: 'Giraffa tippelskirchi',
    image: '/images/wildlife/giraffe.jpg',
    description: 'The tallest mammals on Earth, Masai giraffes gracefully browse on acacia trees across the savanna.',
    funFact: 'Despite their long necks, giraffes have the same number of neck vertebrae as humans - just seven!',
    conservationStatus: 'Endangered',
    bestTimeToSee: 'Throughout the day',
  },
  {
    id: 'zebra',
    name: 'Plains Zebra',
    scientificName: 'Equus quagga',
    image: '/images/wildlife/zebra.jpg',
    description: 'Large herds of zebras migrate across Amboseli, their distinctive stripes creating stunning patterns on the plains.',
    funFact: 'Each zebra has a unique stripe pattern, like a fingerprint, which helps them recognize each other.',
    conservationStatus: 'Near Threatened',
    bestTimeToSee: 'Morning and evening',
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    image: '/images/wildlife/lion.jpg', // Using lion image as placeholder
    description: 'The fastest land animal, cheetahs can be spotted hunting in the open grasslands of Amboseli.',
    funFact: 'Cheetahs can accelerate from 0 to 60 mph in just 3 seconds, faster than most sports cars!',
    conservationStatus: 'Vulnerable',
    bestTimeToSee: 'Early morning',
  },
];

/**
 * Get wildlife animal by ID
 */
export function getWildlifeById(id: string): WildlifeAnimal | undefined {
  return WILDLIFE_ANIMALS.find((animal) => animal.id === id);
}

/**
 * Get all wildlife animals
 */
export function getAllWildlife(): WildlifeAnimal[] {
  return WILDLIFE_ANIMALS;
}

/**
 * Get wildlife by conservation status
 */
export function getWildlifeByStatus(status: WildlifeAnimal['conservationStatus']): WildlifeAnimal[] {
  return WILDLIFE_ANIMALS.filter((animal) => animal.conservationStatus === status);
}

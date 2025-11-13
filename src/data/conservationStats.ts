/**
 * Conservation Statistics Data
 * For Chapter 11: Safari Journal
 */

export interface ConservationStat {
  id: string;
  label: string; // "Acres Protected"
  value: number; // 5000
  unit: string; // "acres"
  icon: string; // emoji or icon name
  description: string;
  color?: string; // Accent color for the stat
}

export const CONSERVATION_STATS: ConservationStat[] = [
  {
    id: 'stat-1',
    label: 'Acres Protected',
    value: 5000,
    unit: 'acres',
    icon: '🌿',
    description: 'Of pristine wildlife habitat under conservation',
    color: '#7D9B8F', // sage green
  },
  {
    id: 'stat-2',
    label: 'Species Supported',
    value: 250,
    unit: 'species',
    icon: '🦁',
    description: 'Different animal and plant species thrive in our conservancy',
    color: '#D4AF37', // gold
  },
  {
    id: 'stat-3',
    label: 'Trees Planted',
    value: 1500,
    unit: 'trees',
    icon: '🌳',
    description: 'Native trees planted this year for habitat restoration',
    color: '#3D5F4F', // deep green
  },
  {
    id: 'stat-4',
    label: 'Water Sources',
    value: 12,
    unit: 'waterholes',
    icon: '💧',
    description: 'Clean water sources maintained for wildlife',
    color: '#3498db', // water blue
  },
  {
    id: 'stat-5',
    label: 'Community Support',
    value: 95,
    unit: '% local',
    icon: '🤝',
    description: 'Of our staff comes from local Maasai communities',
    color: '#E6A04E', // amber
  },
  {
    id: 'stat-6',
    label: 'Carbon Neutral',
    value: 100,
    unit: '%',
    icon: '♻️',
    description: 'Fully carbon-neutral operations since 2023',
    color: '#A8B89D', // grass green
  },
];

export interface MigrationData {
  species: string;
  currentLocation: string;
  expectedArrival: string; // Human-readable date
  mapPreview?: string; // URL to migration map
  status: 'arriving' | 'present' | 'departing' | 'away';
  description: string;
  bestViewingMonths: string[];
}

export const CURRENT_MIGRATION: MigrationData = {
  species: 'African Elephants',
  currentLocation: 'Northern Amboseli Plains',
  expectedArrival: 'Currently Present - Peak Season',
  status: 'present',
  description: 'The elephant herds are currently in the region, with over 1,400 elephants roaming the plains. This is the best time to observe large family groups with calves.',
  bestViewingMonths: ['November', 'December', 'January', 'February'],
};

export const UPCOMING_MIGRATIONS: MigrationData[] = [
  {
    species: 'Zebra Migration',
    currentLocation: 'Southern Serengeti',
    expectedArrival: 'March 2026',
    status: 'arriving',
    description: 'Large zebra herds will pass through Amboseli during the green season.',
    bestViewingMonths: ['March', 'April', 'May'],
  },
  {
    species: 'Wildebeest Passage',
    currentLocation: 'Masai Mara',
    expectedArrival: 'July 2026',
    status: 'away',
    description: 'Seasonal wildebeest movements bring additional wildlife to the region.',
    bestViewingMonths: ['July', 'August'],
  },
];

export function getConservationStatByLabel(label: string): ConservationStat | undefined {
  return CONSERVATION_STATS.find(
    (stat) => stat.label.toLowerCase() === label.toLowerCase()
  );
}

export function getTotalImpactValue(): number {
  return CONSERVATION_STATS.reduce((total, stat) => {
    // Only sum up numeric values (exclude percentages for this calculation)
    if (!stat.unit.includes('%')) {
      return total + stat.value;
    }
    return total;
  }, 0);
}

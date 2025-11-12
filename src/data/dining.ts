export interface DiningOption {
  id: string;
  name: string;
  description: string;
  type: 'restaurant' | 'bar' | 'special';
  image: string;
  openingHours?: string;
  cuisine?: string;
}

export const diningOptions: DiningOption[] = [
  // TODO: Add dining data
];

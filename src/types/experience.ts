export interface ExperienceType {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  included: string[];
  schedule: string[];
  price?: number;
}

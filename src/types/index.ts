export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  capacity: number;
  amenities: string[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

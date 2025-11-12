export interface RoomType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  capacity: {
    adults: number;
    children: number;
  };
  size: number;
  amenities: string[];
  features: string[];
}

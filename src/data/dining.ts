export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  dietary?: string[];
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  title: string;
  description: string;
  features: string[];
  image?: string;
  category?: 'fine-dining' | 'casual' | 'bar';
  capacity?: number;
  menuItems?: MenuItem[];
  menuCategories?: MenuCategory[];
}

export interface DiningExperience {
  title: string;
  description: string;
  time: string;
}

export interface MenuHighlight {
  category: string;
  items: string[];
}

export const restaurants: Restaurant[] = [
  {
    title: 'Kilimanjaro Restaurant',
    description:
      'Our signature fine dining restaurant offering panoramic views of Mount Kilimanjaro. Enjoy a sophisticated menu that celebrates both international cuisine and authentic Kenyan flavors.',
    features: [
      'Indoor and outdoor seating',
      'Views of Mount Kilimanjaro',
      'Breakfast, lunch, and dinner service',
      'A la carte and set menu options',
      'Wine cellar with premium selections',
      'Private dining available',
    ],
    image: '/images/dining/kilimanjaro-restaurant.jpg',
    category: 'fine-dining',
    capacity: 60,
    menuCategories: [
      {
        name: 'Appetizers',
        items: [
          { name: 'Kenyan Samosas', price: 12, description: 'Spiced lamb and vegetable samosas with tamarind chutney', dietary: ['halal'] },
          { name: 'Caprese Salad', price: 14, description: 'Fresh mozzarella, heirloom tomatoes, basil, balsamic reduction', dietary: ['vegetarian', 'gluten-free'] },
          { name: 'Grilled Prawns', price: 18, description: 'Jumbo prawns with garlic butter and lemon', dietary: ['gluten-free'] },
        ],
      },
      {
        name: 'Main Courses',
        items: [
          { name: 'Nyama Choma', price: 32, description: 'Traditional grilled meat platter with ugali and kachumbari', dietary: ['gluten-free'] },
          { name: 'Grilled Beef Fillet', price: 42, description: 'Prime beef with truffle mash and red wine jus', dietary: ['gluten-free'] },
          { name: 'Pan-Seared Sea Bass', price: 38, description: 'Wild-caught sea bass with saffron risotto and asparagus' },
          { name: 'Wild Mushroom Risotto', price: 28, description: 'Creamy arborio rice with seasonal mushrooms and parmesan', dietary: ['vegetarian'] },
        ],
      },
      {
        name: 'Desserts',
        items: [
          { name: 'Chocolate Lava Cake', price: 12, description: 'Warm chocolate cake with vanilla ice cream', dietary: ['vegetarian'] },
          { name: 'Tropical Fruit Pavlova', price: 10, description: 'Meringue with passion fruit, mango, and coconut cream', dietary: ['vegetarian', 'gluten-free'] },
        ],
      },
    ],
  },
  {
    title: 'Savannah Terrace',
    description:
      'An al fresco dining experience under the African sky. Perfect for sundowners and casual meals while watching wildlife roam the plains.',
    features: [
      'Open-air terrace setting',
      'Sunset cocktails and appetizers',
      'Casual dining atmosphere',
      'BBQ and grilled specialties',
      'Live cooking stations',
      'Wildlife viewing opportunities',
    ],
    image: '/images/dining/savannah-terrace.jpg',
    category: 'casual',
    capacity: 40,
    menuItems: [
      { name: 'BBQ Platter', price: 28 },
      { name: 'Grilled Chicken Skewers', price: 22 },
      { name: 'Vegetable Kebabs', price: 18 },
      { name: 'Sunset Burger', price: 20 },
    ],
  },
  {
    title: 'The Safari Bar',
    description:
      'Unwind with expertly crafted cocktails and premium spirits in our stylish bar. The perfect spot to share stories of your safari adventures.',
    features: [
      'Premium spirits and wines',
      'Signature safari cocktails',
      'Local and imported beers',
      'Light bites and appetizers',
      'Cozy lounge seating',
      'Open until late',
    ],
    image: '/images/dining/safari-bar.jpg',
    category: 'bar',
    capacity: 30,
    menuItems: [
      { name: 'Kilimanjaro Sunset', price: 15 },
      { name: 'Safari Mule', price: 14 },
      { name: 'Tusker Beer', price: 8 },
      { name: 'Premium Whisky Selection', price: 18 },
    ],
  },
];

export const diningExperiences: DiningExperience[] = [
  {
    title: 'Bush Breakfast',
    description:
      'Start your day with a memorable breakfast in the wild. Enjoy a gourmet meal surrounded by the sights and sounds of the African bush.',
    time: 'Early Morning',
  },
  {
    title: 'Sundowner Experience',
    description:
      'Watch the sun set over the savannah while enjoying cocktails and canapés at a scenic location within the reserve.',
    time: 'Evening',
  },
  {
    title: 'Private Bush Dinner',
    description:
      'An intimate dining experience under the stars. Our team creates a magical setting complete with lanterns, fine cuisine, and personalized service.',
    time: 'By Arrangement',
  },
  {
    title: "Chef's Table",
    description:
      'Join our executive chef for an exclusive culinary journey. Learn about ingredients, techniques, and the stories behind our signature dishes.',
    time: 'By Reservation',
  },
];

export const menuHighlights: MenuHighlight[] = [
  {
    category: 'Kenyan Specialties',
    items: [
      'Nyama Choma - Traditional grilled meat',
      'Ugali with Sukuma Wiki - Maize meal with collard greens',
      'Swahili Coconut Fish Curry',
      'Pilau Rice with Braised Goat',
    ],
  },
  {
    category: 'International Favorites',
    items: [
      'Grilled Prime Beef Fillet',
      'Pan-Seared Sea Bass',
      'Wild Mushroom Risotto',
      'Mediterranean Grilled Vegetables',
    ],
  },
  {
    category: 'Breakfast Selections',
    items: [
      'Full English Breakfast',
      'Tropical Fruit Platter',
      'Fresh Pastries and Breads',
      'Made-to-Order Omelettes',
    ],
  },
];

export const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'];

/**
 * Blog Posts Data
 * For Chapter 11: Safari Journal
 */

import { BLOG_IMAGES } from './images';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string; // URL
  date: string; // ISO date
  category: 'Wildlife' | 'Conservation' | 'Guest Stories' | 'Safari Tips' | 'Culture';
  readTime: string; // "5 min read"
  author: string;
  slug: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Great Elephant Migration: What to Expect in December 2025',
    excerpt: 'As the rains approach, witness one of nature\'s most spectacular events - the annual elephant migration through Amboseli. Learn the best times and locations to observe these gentle giants.',
    image: BLOG_IMAGES.conservation,
    date: '2025-10-15',
    category: 'Wildlife',
    readTime: '6 min read',
    author: 'Dr. James Mwangi',
    slug: 'elephant-migration-december-2025',
  },
  {
    id: 'blog-2',
    title: 'Conservation Success: How We Protect 5000 Acres of Wildlife Habitat',
    excerpt: 'Discover the innovative conservation strategies that have helped us protect endangered species and restore critical ecosystems in the Amboseli region.',
    image: BLOG_IMAGES.conservation,
    date: '2025-10-01',
    category: 'Conservation',
    readTime: '8 min read',
    author: 'Sarah Kimani',
    slug: 'conservation-success-5000-acres',
  },
  {
    id: 'blog-3',
    title: 'A Day in the Life: Meet the Maasai Guides of Amboseli',
    excerpt: 'Our expert guides share their deep connection with the land and wildlife. Learn about Maasai culture, traditional tracking methods, and what makes them the best in the business.',
    image: BLOG_IMAGES.culture,
    date: '2025-09-20',
    category: 'Culture',
    readTime: '7 min read',
    author: 'Ole Sankale',
    slug: 'meet-maasai-guides-amboseli',
  },
  {
    id: 'blog-4',
    title: 'Photography Tips: Capturing the Perfect Kilimanjaro Sunrise',
    excerpt: 'Professional wildlife photographer shares insider tips for photographing Mount Kilimanjaro at dawn, including camera settings, composition techniques, and the best vantage points.',
    image: BLOG_IMAGES.safariTips,
    date: '2025-09-05',
    category: 'Safari Tips',
    readTime: '5 min read',
    author: 'Michael Chen',
    slug: 'photography-tips-kilimanjaro-sunrise',
  },
  {
    id: 'blog-5',
    title: 'Guest Story: A Family\'s First Safari Experience',
    excerpt: 'The Anderson family from Australia shares their heartwarming journey discovering Africa\'s wildlife with their three children. From elephant encounters to starlit dinners, relive their adventure.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=1200&q=80',
    date: '2025-08-15',
    category: 'Guest Stories',
    readTime: '4 min read',
    author: 'The Anderson Family',
    slug: 'family-first-safari-experience',
  },
  {
    id: 'blog-6',
    title: 'Best Time to Visit Amboseli: A Month-by-Month Guide',
    excerpt: 'Plan your perfect safari with our comprehensive guide to Amboseli\'s seasons, wildlife patterns, and weather conditions throughout the year.',
    image: BLOG_IMAGES.safariTips,
    date: '2025-08-01',
    category: 'Safari Tips',
    readTime: '10 min read',
    author: 'Dr. James Mwangi',
    slug: 'best-time-visit-amboseli-guide',
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category);
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return BLOG_POSTS
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  // Return the 3 most recent posts as featured
  return getRecentBlogPosts(3);
}

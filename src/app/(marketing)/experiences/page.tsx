import { Metadata } from 'next';
import { ExperiencesPageClient } from './ExperiencesPageClient';
import { experiences } from '@/data/experiences';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amboselisafariclub.com';

export const metadata: Metadata = {
  title: 'Safari Experiences | Amboseli Safari Club',
  description:
    'Discover curated safari adventures, wildlife encounters, and unique experiences at Amboseli Safari Club. From sunrise game drives to hot air balloon safaris, explore the best of Amboseli National Park.',
  keywords: [
    'safari experiences',
    'Amboseli safari',
    'game drives',
    'wildlife tours',
    'Kenya safari',
    'Mount Kilimanjaro',
    'Maasai culture',
    'hot air balloon safari',
    'walking safari',
    'photography safari',
  ],
  authors: [{ name: 'Amboseli Safari Club' }],
  creator: 'Amboseli Safari Club',
  publisher: 'Amboseli Safari Club',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${siteUrl}/experiences`,
  },
  openGraph: {
    title: 'Safari Experiences | Amboseli Safari Club',
    description:
      'Discover curated safari adventures, wildlife encounters, and unique experiences at Amboseli Safari Club. From sunrise game drives to hot air balloon safaris, explore the best of Amboseli National Park.',
    url: `${siteUrl}/experiences`,
    siteName: 'Amboseli Safari Club',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/images/experiences/sunrise-game-drive.jpg`,
        width: 1200,
        height: 630,
        alt: 'Safari experiences at Amboseli Safari Club with Mount Kilimanjaro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safari Experiences | Amboseli Safari Club',
    description:
      'Discover curated safari adventures, wildlife encounters, and unique experiences at Amboseli Safari Club.',
    images: [`${siteUrl}/images/experiences/sunrise-game-drive.jpg`],
    creator: '@amboselisafari',
  },
};

export default function ExperiencesPage() {
  // Generate JSON-LD structured data for experiences
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Safari Experiences at Amboseli Safari Club',
    description:
      'Curated safari adventures and wildlife experiences at Amboseli National Park',
    url: `${siteUrl}/experiences`,
    numberOfItems: experiences.length,
    itemListElement: experiences.map((experience, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        '@id': `${siteUrl}/experiences/${experience.slug}`,
        name: experience.title,
        description: experience.shortDescription,
        image: `${siteUrl}${experience.image}`,
        url: `${siteUrl}/experiences/${experience.slug}`,
        offers: experience.price
          ? {
              '@type': 'Offer',
              price: experience.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: `${siteUrl}/experiences/${experience.slug}`,
            }
          : undefined,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
        provider: {
          '@type': 'Organization',
          name: 'Amboseli Safari Club',
          url: siteUrl,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ExperiencesPageClient experiences={experiences} />
    </>
  );
}

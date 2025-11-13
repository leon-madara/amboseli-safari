import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { SafariProgressProvider } from '@/providers/SafariProgressProvider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Amboseli Safari Club | Luxury Safari Lodge in Kenya',
    template: '%s | Amboseli Safari Club',
  },
  description:
    'Experience the ultimate safari at Amboseli Safari Club. Luxury accommodations, breathtaking Mount Kilimanjaro views, and unforgettable wildlife encounters. Opening December 2025.',
  keywords: [
    'Safari Kenya',
    'Amboseli',
    'Mount Kilimanjaro',
    'Luxury Safari Lodge',
    'Wildlife Safari',
    'Kenya Safari Hotel',
    'Amboseli National Park',
  ],
  authors: [{ name: 'Amboseli Safari Club' }],
  creator: 'Amboseli Safari Club',
  publisher: 'Amboseli Safari Club',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: 'Amboseli Safari Club | Luxury Safari Lodge in Kenya',
    description:
      'Experience the ultimate safari at Amboseli Safari Club. Opening December 2025.',
    url: '/',
    siteName: 'Amboseli Safari Club',
    images: [
      {
        url: '/images/hero/hero-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Amboseli Safari Club with Mount Kilimanjaro',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amboseli Safari Club | Luxury Safari Lodge in Kenya',
    description:
      'Experience the ultimate safari at Amboseli Safari Club. Opening December 2025.',
    images: ['/images/hero/hero-main.jpg'],
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          <SafariProgressProvider>
            {children}
          </SafariProgressProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

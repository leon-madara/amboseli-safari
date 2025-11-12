import { ReactNode } from 'react';
import Navigation from '@/components/organisms/Navigation';
import Footer from '@/components/organisms/Footer';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="marketing-layout">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

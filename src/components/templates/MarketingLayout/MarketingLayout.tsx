import { ReactNode } from 'react';
import Footer from '@/components/organisms/Footer';
import PillNavigation from '@/components/organisms/PillNavigation/PillNavigation';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="marketing-layout">
      <PillNavigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

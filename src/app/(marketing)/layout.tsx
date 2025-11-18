import { ReactNode } from 'react';
import Footer from '@/components/organisms/Footer/Footer';
import PillNavigation from '@/components/organisms/PillNavigation/PillNavigation';

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="marketing-layout">
      <PillNavigation />
      {children}
      <Footer />
    </div>
  );
}

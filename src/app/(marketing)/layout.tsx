import { ReactNode } from 'react';
import Navigation from '@/components/organisms/Navigation/Navigation';
import Footer from '@/components/organisms/Footer/Footer';

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="marketing-layout">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

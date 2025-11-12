import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function ContentLayout({
  children,
  sidebar,
}: ContentLayoutProps) {
  return (
    <div className="content-layout container">
      <div className="main-content">{children}</div>
      {sidebar && <aside className="sidebar">{sidebar}</aside>}
    </div>
  );
}

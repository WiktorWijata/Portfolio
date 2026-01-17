import type { ReactNode } from 'react';
import { Navigation } from './Navigation/Navigation';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

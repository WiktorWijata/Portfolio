import type { ReactNode } from 'react';
import { Navigation } from './Navigation/Navigation';
import Footer from './Footer';
import { useScrollToTop } from '../design-system/hooks';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const ScrollToTopButton = useScrollToTop();

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      {ScrollToTopButton}
    </>
  );
}

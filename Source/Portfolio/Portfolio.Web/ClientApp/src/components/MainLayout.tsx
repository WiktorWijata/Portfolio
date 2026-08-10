import type { ReactNode } from 'react';
import { Navigation } from './Navigation/Navigation';
import Footer from './Footer';
import { useScrollToTop } from '../design-system/hooks';
import { useFavicon } from '../hooks/useFavicon';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const ScrollToTopButton = useScrollToTop();
  useFavicon();

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

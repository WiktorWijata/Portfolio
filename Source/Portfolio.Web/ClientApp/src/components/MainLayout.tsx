import type { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
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

export default MainLayout;

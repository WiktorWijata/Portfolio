import type { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Cosmos, CosmosVariant, DynamicBackground } from '../design-system';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div 
      className="min-h-screen relative overflow-hidden" 
      style={{ background: 'linear-gradient(to bottom, #0a0015, #1a0a2e, #000000)' }}
    >
      <DynamicBackground>
        <Cosmos variant={CosmosVariant.STARS_WITH_COMETS} />
      </DynamicBackground>
      <div className="relative z-10">
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;

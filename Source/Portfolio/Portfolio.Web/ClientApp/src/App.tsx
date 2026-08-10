import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './design-system/themes';
import { MainLayout } from './components/MainLayout';
import './i18n/i18n';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import DidYouKnow from './components/DidYouKnow';
import Contact from './components/Contact';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <DidYouKnow />
            <Contact />
          </MainLayout>
        </ThemeProvider>
    </QueryClientProvider>
  );
}

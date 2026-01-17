import { ThemeProvider } from './design-system/themes';
import { MainLayout } from './components/MainLayout';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import DidYouKnow from './components/DidYouKnow';
import Contact from './components/Contact';

export function App() {
  return (
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
  );
}

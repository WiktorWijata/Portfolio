import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import DidYouKnow from './components/DidYouKnow';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffect from './components/BackgroundEffect';
import ScrollReveal from './components/ScrollReveal';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0015, #1a0a2e, #000000)' }}>
      <BackgroundEffect />
      <div className="relative z-10">
        <Navigation />
        <main className="pt-20">
          <Hero />
          <ScrollReveal delay={100}>
            <Skills />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Projects />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Experience />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Education />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <DidYouKnow />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

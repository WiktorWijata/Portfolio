import { Button, Container, Tile } from '../../design-system/components';
import { HeroCode, DeveloperDescription } from './components';
import { heroData } from '../../data';
import developerImage from '../../assets/developer.avif';

export default function Hero() {
  function handleProjectsClick() {
    const element = document.querySelector('#projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="w-full flex flex-col items-center gap-8 lg:gap-16 pt-12 lg:pt-16">
          <Button
            onClick={handleProjectsClick}
            className="px-8 lg:px-12"
          >
            {heroData.buttonText}
          </Button>
          
          <HeroCode 
            quote={heroData.motto}
            className="w-full lg:w-auto"
          />
          
          <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-6">
            <Tile 
              imageUrl={developerImage}
              imageAlt={heroData.image.alt}
              className="w-full min-h-[400px] lg:min-h-[550px] lg:w-[60%]"
            />
            
            <DeveloperDescription 
              title={heroData.developer.title}
              greeting={heroData.developer.greeting}
              paragraphs={heroData.developer.paragraphs}
              className="lg:w-[40%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
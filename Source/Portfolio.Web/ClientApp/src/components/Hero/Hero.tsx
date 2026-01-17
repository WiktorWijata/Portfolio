import { Button } from '../../design-system/components';
import { HeroCode, DeveloperImage, DeveloperDescription } from './components';
import { heroData } from '../../data';
import developerImage from '../../assets/developer.avif';

function Hero() {
  function handleProjectsClick() {
    const element = document.querySelector('#projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 lg:px-0">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 lg:gap-16 pt-12 lg:pt-16">
        <Button
          onClick={handleProjectsClick}
          className="px-8 lg:px-12"
        >
          {heroData.buttonText}
        </Button>
        
        <HeroCode 
          quote={heroData.motto}
          className="w-full lg:w-auto lg:max-w-full"
        />
        
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6">
          <DeveloperImage 
            imageUrl={developerImage}
            imageAlt={heroData.image.alt}
            className="lg:w-[60%]"
          />
          
          <DeveloperDescription 
            title={heroData.developer.title}
            greeting={heroData.developer.greeting}
            paragraphs={heroData.developer.paragraphs}
            className="lg:w-[40%]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

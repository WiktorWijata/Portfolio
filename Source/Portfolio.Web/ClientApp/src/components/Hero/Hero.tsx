import { Button, Container, Tile } from '../../design-system/components';
import { HeroCode, DeveloperDescription } from './components';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';
import developerImage from '../../assets/developer.avif';

export default function Hero() {
  const { content } = useContent();
  const { t } = useTranslation();

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
            {t('buttons.viewProjects')}
          </Button>
          
          <HeroCode 
            quote={content?.hero?.motto || ''}
            className="w-full lg:w-auto"
          />
          
          <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-6">
            <Tile className="w-full min-h-[400px] lg:min-h-[550px] lg:w-[60%] p-0 overflow-hidden">
              <img 
                src={developerImage} 
                alt={content?.hero?.aboutMe?.title || ''}
                className="w-full h-full object-cover"
              />
            </Tile>
            
            <DeveloperDescription 
              title={content?.hero?.aboutMe?.title || ''}
              greeting={content?.hero?.aboutMe?.greeting || ''}
              paragraphs={content?.hero?.aboutMe?.description || []}
              className="lg:w-[40%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
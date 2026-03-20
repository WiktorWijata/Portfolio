import { Button, ButtonVariant, Container } from '../../design-system/components';
import { DownloadIcon } from '../../design-system/assets/icons';
import { HeroCode, DeveloperDescription } from './components';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';
import avatar from '../../assets/avatar.png';

export default function Hero() {
  const { content } = useContent();
  const { t } = useTranslation();

  function handleProjectsClick() {
    const element = document.querySelector('#projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="w-full flex flex-col items-center gap-8 lg:gap-16 pt-12 lg:pt-16">
          <div className="flex flex-col items-center gap-4 w-fit">
            <Button
              variant={ButtonVariant.OUTLINED}
              href="/WIKTOR_WIJATA_NET_DEVELOPER.pdf"
              download
              className="w-full flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <DownloadIcon className="w-4 h-4" />
              {t('buttons.downloadCv')}
            </Button>
            <Button
              onClick={handleProjectsClick}
              className="w-full whitespace-nowrap"
            >
              {t('buttons.viewProjects')}
            </Button>
          </div>
          
          <HeroCode 
            quote={content?.hero?.motto || ''}
            className="w-full lg:w-auto"
          />
          
          
          <div className="w-full flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-12 lg:max-w-5xl lg:mx-auto">            
            <div className="w-full lg:w-[40%] flex items-center justify-center">                          
              <img 
                src={avatar} 
                alt={content?.hero?.aboutMe?.title || ''}
                className="w-full max-w-[320px] lg:max-w-none object-contain"
              />              
            </div>

            <DeveloperDescription 
              title={content?.hero?.aboutMe?.title || ''}
              greeting={content?.hero?.aboutMe?.greeting || ''}
              paragraphs={content?.hero?.aboutMe?.description || []}
              className="lg:w-[60%]"
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
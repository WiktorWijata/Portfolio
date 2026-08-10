import { SectionTitle, Carousel, CarouselItem, Container } from '../../design-system/components';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';
import { FactCard } from './components';

function DidYouKnow() {
  const { content } = useContent();
  const { t } = useTranslation();

  if (!content) {
    return null;
  }

  return (
    <section id="didyouknow" className="py-20">
      <Container>
        <SectionTitle>{t('navigation.didYouKnow')}</SectionTitle>

        <div className="w-full max-w-[1406px] mx-auto px-0 sm:px-4 lg:px-8">
          <Carousel padding="px-2 sm:px-4">
            {content.facts?.map((fact, index) => (
              <CarouselItem key={index}>
                <FactCard fact={fact} />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

export default DidYouKnow;

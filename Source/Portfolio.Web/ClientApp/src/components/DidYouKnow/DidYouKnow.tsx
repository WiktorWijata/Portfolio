import { SectionTitle, Carousel, CarouselItem, Container } from '../../design-system/components';
import { useScrollReveal } from '../../design-system/hooks';
import { facts } from '../../data/facts';
import { FactCard } from './components';

function DidYouKnow() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });

  return (
    <section id="didyouknow" ref={elementRef} className={`py-20 ${className}`}>
      <Container>
        <SectionTitle>Czy wiesz że...?</SectionTitle>

        <div className="w-full max-w-[1406px] mx-auto px-0 sm:px-4 lg:px-8">
          <Carousel 
            padding="px-2 sm:px-4" 
            minHeight="320px"
          >
            {facts.map((fact, index) => (
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

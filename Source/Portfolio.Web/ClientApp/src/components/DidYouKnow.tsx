import { SectionTitle, Tile, Text, TextAs, TextSize, TextWeight, TextVariant, Carousel, CarouselItem } from '../design-system/components';
import { useScrollReveal, fadeIn } from '../design-system/hooks';
import { facts } from '../data/facts';

function DidYouKnow() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });

  return (
    <section id="didyouknow" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto px-6">
        <SectionTitle>Czy wiesz że...?</SectionTitle>

        <Carousel className="w-[1406px] mx-auto" padding="px-20" minHeight="320px">
          {facts.map((fact, index) => (
            <CarouselItem key={index}>
              <Tile
                className="text-center flex flex-col justify-center items-center"
                style={{
                  minHeight: '320px',
                  padding: '3rem',
                  ...fadeIn({ duration: 0.6, delay: 0.2 })
                }}
              >
                <div className="text-6xl mb-6">{fact.icon}</div>
                <Text as={TextAs.H3} size={TextSize.LG} weight={TextWeight.BOLD} className="mb-4">
                  {fact.title}
                </Text>
                <Text variant={TextVariant.MUTED} size={TextSize.MD} className="leading-relaxed max-w-2xl">
                  {fact.description}
                </Text>
              </Tile>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default DidYouKnow;

import { useState } from 'react';
import { SectionTitle, Tile, IconButton } from '../design-system/components';
import { useScrollReveal } from '../design-system/hooks';
import { IconButtonSize } from '../design-system/tokens';

interface Fact {
  title: string;
  description: string;
  icon: string;
}

function DidYouKnow() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const facts: Fact[] = [
    {
      title: 'Pierwszy program w wieku 12 lat',
      description: 'Moja przygoda z programowaniem rozpoczęła się od prostej gry w Visual Basic. Od tamtej pory kod towarzyszył mi każdego dnia.',
      icon: '🚀'
    },
    {
      title: 'Ponad 100,000 linii kodu',
      description: 'W ciągu kariery napisałem ponad 100 tysięcy linii kodu w C# i TypeScript, rozwiązując problemy od prostych formularzy po złożone systemy enterprise.',
      icon: '💻'
    },
    {
      title: 'Nocny maraton debugowania',
      description: 'Najdłuższa sesja debugowania trwała 14 godzin. Problem? Literówka w nazwie zmiennej środowiskowej. Od tamtej pory zawsze sprawdzam konfigurację jako pierwsze.',
      icon: '🐛'
    },
    {
      title: 'Miłośnik automatyzacji',
      description: 'Jeśli coś robię więcej niż 3 razy, piszę do tego skrypt. Zaoszczędziłem już setki godzin dzięki automatyzacji powtarzalnych zadań.',
      icon: '⚡'
    },
    {
      title: 'Open source contributor',
      description: 'Regularnie contributuję do projektów open source. Uwielbiam dzielić się wiedzą i pomagać społeczności developerskiej.',
      icon: '🌟'
    },
    {
      title: 'Kawa to paliwo',
      description: 'Średnio 4 kawy dziennie. Najlepsza kawa to ta wypita podczas rozwiązywania trudnego problemu o 3 nad ranem.',
      icon: '☕'
    }
  ];

  const nextFact = () => {
    setCurrentIndex((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  const goToFact = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="didyouknow" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto px-6">
        <SectionTitle>Czy wiesz że...?</SectionTitle>

        <div className="w-[1406px] mx-auto relative">
          {/* Carousel container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {facts.map((fact, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-20"
                >
                  <Tile
                    className="text-center flex flex-col justify-center items-center"
                    style={{
                      minHeight: '320px',
                      padding: '3rem'
                    }}
                  >
                    <div className="text-6xl mb-6">{fact.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-200 mb-4">
                      {fact.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                      {fact.description}
                    </p>
                  </Tile>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <IconButton
            onClick={prevFact}
            size={IconButtonSize.MEDIUM}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </IconButton>

          <IconButton
            onClick={nextFact}
            size={IconButtonSize.MEDIUM}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </IconButton>

          {/* Dots navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToFact(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex 
                    ? 'rgba(168, 85, 247, 0.8)' 
                    : 'rgba(255, 248, 231, 0.2)',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DidYouKnow;

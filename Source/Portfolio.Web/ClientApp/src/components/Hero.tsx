import { Button, Tile, Icon, IconName, IconSize } from '../design-system/components';

function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Przycisk Projekty */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-16">
        <a href="#projects">
          <Button className="px-12">
            Projekty
          </Button>
        </a>
        
        {/* Cytat pod przyciskiem */}
        <blockquote className="text-gray-400 text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          – Nie da się? ...ludzie w kosmos latają.
        </blockquote>
        
        {/* Ramki z foto i opisem */}
        <div className="flex gap-6 mt-1">
          {/* Lewa ramka - FOTO */}
          <Tile 
            imageUrl="/src/assets/developer.png"
            imageAlt="Developer"
            className="w-[900px] min-h-[550px] flex items-center justify-center overflow-hidden p-0"/>
          
          {/* Prawa ramka - Opis */}
          <Tile className="w-[484px] min-h-[550px] flex items-start justify-center p-8">
            <div className="flex flex-col gap-8 mt-8">
              <h2 className="text-gray-300 text-5xl font-semibold flex items-center gap-4">
                <Icon name={IconName.CODE} size={IconSize.XL} color="#c084fc" className="drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                .NET Developer
              </h2>
              <p className="text-gray-400 text-2xl leading-relaxed font-semibold text-justify">
                Witaj, mam na imię Wiktor a to jest moja wizytówka.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Z 7-letnim doświadczeniem w branży IT specjalizuję się w tworzeniu wydajnych aplikacji backendowych w ekosystemie .NET. 
                Pasjonuję się czystym kodem, architekturą systemów oraz rozwiązywaniem złożonych problemów technicznych.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Moje doświadczenie obejmuje projektowanie RESTful API, optymalizację baz danych, 
                implementację wzorców projektowych oraz budowanie skalowalnych rozwiązań chmurowych. 
                Zawsze staram się pisać kod, który jest nie tylko funkcjonalny, ale także czytelny i łatwy w utrzymaniu.
              </p>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

export default Hero;

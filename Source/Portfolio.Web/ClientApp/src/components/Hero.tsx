import { Button, Icon, IconName, IconSize, Tile } from '../design-system/components';
import { useTheme } from '../design-system/themes';

function Hero() {
  const { currentTheme } = useTheme();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Przycisk Projekty */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-16">
        <Button
          onClick={() => {
            const element = document.querySelector('#projects');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-12"
        >
          Projekty
        </Button>
        
        {/* Cytat pod przyciskiem */}
        <blockquote className="text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: currentTheme.colors.text.muted }}>
          – Nie da się? ...ludzie w kosmos latają.
        </blockquote>
        
        {/* Ramki z foto i opisem */}
        <div className="flex gap-6 mt-1">
          {/* Lewa ramka - FOTO */}
          <Tile 
            className="w-[900px] min-h-[550px] flex items-center justify-center overflow-hidden p-0"
            imageUrl="/src/assets/developer.png"
          />
          
          {/* Prawa ramka - Opis */}
          <Tile className="w-[500px] min-h-[550px] flex items-start justify-center">
            <div className="flex flex-col gap-8 mt-8">
              <h2 className="text-5xl font-semibold flex items-center gap-4" style={{ color: currentTheme.colors.text.secondary }}>
                <Icon name={IconName.CODE} size={IconSize.XL} color={currentTheme.colors.primary.borderHover} />
                .NET Developer
              </h2>
              <p className="text-2xl leading-relaxed font-semibold text-justify" style={{ color: currentTheme.colors.text.muted }}>
                Witaj, mam na imię Wiktor a to jest moja wizytówka.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: currentTheme.colors.text.muted }}>
                Z 7-letnim doświadczeniem w branży IT specjalizuję się w tworzeniu wydajnych aplikacji backendowych w ekosystemie .NET. 
                Pasjonuję się czystym kodem, architekturą systemów oraz rozwiązywaniem złożonych problemów technicznych.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: currentTheme.colors.text.muted }}>
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

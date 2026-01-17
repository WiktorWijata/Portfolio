import { Button, Icon, IconName, IconSize, Tile, Text, TextSize, TextVariant, TextWeight, TextAs, Alignment } from '../design-system/components';
import { useTheme } from '../design-system/themes';

function Hero() {
  const { currentTheme } = useTheme();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
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
        
        <Text 
          as={TextAs.DIV} 
          size={TextSize.XL} 
          variant={TextVariant.MUTED}
          className="leading-relaxed"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          – Nie da się? ...ludzie w kosmos latają.
        </Text>
        
        <div className="flex gap-6 mt-1">
          <Tile 
            className="w-[900px] min-h-[550px] flex items-center justify-center overflow-hidden p-0"
            imageUrl="/src/assets/developer.png"
          />
          
          <Tile className="w-[500px] min-h-[550px] flex items-start justify-center">
            <div className="flex flex-col gap-8 mt-8">
              <Text 
                as={TextAs.H2} 
                size={TextSize.XL} 
                variant={TextVariant.SECONDARY} 
                weight={TextWeight.SEMIBOLD}
                className="flex items-center gap-4"
              >
                <Icon name={IconName.CODE} size={IconSize.XL} color={currentTheme.colors.primary.borderHover} />
                .NET Developer
              </Text>
              <Text 
                size={TextSize.LG} 
                variant={TextVariant.MUTED} 
                weight={TextWeight.SEMIBOLD}
                align={Alignment.JUSTIFY}
                className="leading-relaxed"
              >
                Witaj, mam na imię Wiktor a to jest moja wizytówka.
              </Text>
              <Text 
                variant={TextVariant.MUTED}
                className="leading-relaxed"
              >
                Z 7-letnim doświadczeniem w branży IT specjalizuję się w tworzeniu wydajnych aplikacji backendowych w ekosystemie .NET. 
                Pasjonuję się czystym kodem, architekturą systemów oraz rozwiązywaniem złożonych problemów technicznych.
              </Text>
              <Text 
                variant={TextVariant.MUTED}
                className="leading-relaxed"
              >
                Moje doświadczenie obejmuje projektowanie RESTful API, optymalizację baz danych, 
                implementację wzorców projektowych oraz budowanie skalowalnych rozwiązań chmurowych. 
                Zawsze staram się pisać kod, który jest nie tylko funkcjonalny, ale także czytelny i łatwy w utrzymaniu.
              </Text>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

export default Hero;

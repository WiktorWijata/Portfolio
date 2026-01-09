function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Przycisk Projekty */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-16">
        <a 
          href="#projects" 
          className="inline-flex items-center gap-2 px-12 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          style={{ 
            border: '1px solid rgba(168, 85, 247, 0.4)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            color: '#e9d5ff',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
          }}
        >
          Projekty
        </a>
        
        {/* Cytat pod przyciskiem */}
        <blockquote className="text-gray-400 text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          – Nie da się? ...ludzie w kosmos latają.
        </blockquote>
        
        {/* Ramki z foto i opisem */}
        <div className="flex gap-6 mt-1">
          {/* Lewa ramka - FOTO */}
          <div 
            className="w-[900px] min-h-[550px] flex items-center justify-center rounded backdrop-blur-sm overflow-hidden"
            style={{ 
              border: '1px solid rgba(255, 248, 231, 0.15)',
              backgroundColor: 'rgba(255, 248, 231, 0.03)'
            }}
          >
            <img 
              src="/src/assets/developer.png" 
              alt="Developer" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Prawa ramka - Opis */}
          <div 
            className="w-[484px] min-h-[550px] flex items-start justify-center p-8 rounded backdrop-blur-sm"
            style={{ 
              border: '1px solid rgba(255, 248, 231, 0.15)',
              backgroundColor: 'rgba(255, 248, 231, 0.03)'
            }}
          >
            <div className="flex flex-col gap-8 mt-8">
              <h2 className="text-gray-300 text-5xl font-semibold flex items-center gap-4">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

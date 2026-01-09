function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          O mnie
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-950 border-2 border-[#FFF8E7]/30 rounded-lg p-8 shadow-xl">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Jestem doświadczonym programistą backendowym z pasją do tworzenia wydajnych i skalowalnych 
              rozwiązań. Specjalizuję się w projektowaniu architektur systemowych, optymalizacji baz danych 
              oraz tworzeniu API.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Moja praca koncentruje się na:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-[#FFF8E7] text-xl">✓</span>
                Projektowaniu RESTful API
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FFF8E7] text-xl">✓</span>
                Optymalizacji wydajności
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FFF8E7] text-xl">✓</span>
                Architekturze mikroserwisów
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FFF8E7] text-xl">✓</span>
                Bezpieczeństwie aplikacji
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FFF8E7] text-xl">✓</span>
                Integracji systemów
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#FFF8E7] text-xl">✓</span>
                CI/CD i DevOps
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

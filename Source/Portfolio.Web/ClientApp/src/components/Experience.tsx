import { useState } from 'react';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

function Experience() {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const experiences: ExperienceItem[] = [
    {
      company: 'Nazwa Firmy 1',
      position: 'Senior .NET Developer',
      period: '2022 - Obecnie',
      description: [
        'Projektowanie i rozwój aplikacji webowych w technologii .NET',
        'Implementacja REST API oraz integracje z zewnętrznymi systemami',
        'Optymalizacja wydajności aplikacji i baz danych'
      ],
      technologies: ['C#', '.NET', 'React', 'PostgreSQL', 'Docker']
    },
    {
      company: 'Nazwa Firmy 2',
      position: '.NET Developer',
      period: '2020 - 2022',
      description: [
        'Rozwój aplikacji biznesowych w ekosystemie .NET',
        'Tworzenie interfejsów użytkownika w React',
        'Współpraca z zespołem w metodyce Agile/Scrum'
      ],
      technologies: ['C#', 'ASP.NET Core', 'JavaScript', 'MSSQL', 'Azure']
    },
    {
      company: 'Nazwa Firmy 3',
      position: 'Junior .NET Developer',
      period: '2018 - 2020',
      description: [
        'Utrzymanie i rozwój istniejących aplikacji .NET',
        'Wsparcie zespołu w codziennych zadaniach developerskich',
        'Pisanie testów jednostkowych i dokumentacji technicznej'
      ],
      technologies: ['C#', '.NET', 'WinForms', 'MSSQL']
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span
            style={{
              background: 'linear-gradient(to right, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Doświadczenie
          </span>
        </h2>

        <div className="w-[1406px] mx-auto relative px-0">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 w-0.5"
            style={{
              top: '-60px',
              height: 'calc(100% + 120px)',
              background: 'linear-gradient(to bottom, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
            }}
          ></div>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-12"
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-3 w-6 h-6 rounded-full border-4"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderColor: '#a855f7',
                    backgroundColor: '#1a0a2e',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
                  }}
                ></div>
                {/* Content card */}
                <div
                  className="p-6 rounded-lg backdrop-blur-sm transition-all duration-500 relative"
                  style={{
                    border: '1px solid rgba(255, 248, 231, 0.15)',
                    backgroundColor: 'rgba(255, 248, 231, 0.03)',
                    transformOrigin: 'left center'
                  }}
                >
                  <span
                    className="absolute top-4 right-4 text-gray-300 text-sm font-semibold px-2 py-1 rounded backdrop-blur-sm"
                    style={{
                      border: '1px solid rgba(255, 248, 231, 0.15)',
                      backgroundColor: 'rgba(255, 248, 231, 0.03)'
                    }}
                  >
                    {exp.period}
                  </span>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-200">{exp.position}</h3>
                  </div>
                  <p 
                    className="text-base text-purple-400 font-medium"
                    style={{
                      marginBottom: expandedCards[index] ? '16px' : '0',
                      transition: 'margin-bottom 0.5s ease-in-out'
                    }}
                  >
                    {exp.company}
                  </p>
                  <div 
                    style={{
                      maxHeight: expandedCards[index] ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.5s ease-in-out',
                      marginBottom: expandedCards[index] ? '16px' : '0'
                    }}
                  >
                    <ul className="space-y-2">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-gray-400 text-sm flex items-start">
                          <span className="text-purple-400 mr-2 mt-1">▹</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 items-center">
                    <div className="flex flex-wrap gap-2 flex-1">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded font-semibold text-gray-300 backdrop-blur-sm"
                          style={{
                            border: '1px solid rgba(255, 248, 231, 0.15)',
                            backgroundColor: 'rgba(255, 248, 231, 0.03)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {exp.description.length > 0 && (
                      <button
                        onClick={() => toggleCard(index)}
                        className="px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          border: '1px solid rgba(168, 85, 247, 0.4)',
                          backgroundColor: 'rgba(168, 85, 247, 0.1)',
                          color: '#e9d5ff',
                          backdropFilter: 'blur(10px)',
                          marginRight: '-8px'
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
                        {expandedCards[index] ? 'Pokaż mniej' : 'Pokaż więcej'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;

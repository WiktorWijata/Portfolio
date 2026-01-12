import { useState } from 'react';
import { SectionTitle, Tag, Button, Tile, Timeline, TimelineItem } from '../design-system';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

function Experience() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });
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
    <section id="experience" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto px-0">
        <SectionTitle>Doświadczenie</SectionTitle>

        <Timeline>
          {experiences.map((exp, index) => (
            <TimelineItem key={index} animationDelay={index * 0.2}>
              <Tile
                  className="transition-all duration-500 relative"
                  style={{
                    transformOrigin: 'left center'
                  }}
                >
                  <Tag variant="date">
                    {exp.period}
                  </Tag>
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
                        <Tag key={techIndex} variant="neutral">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                    {exp.description.length > 0 && (
                      <Button
                        onClick={() => toggleCard(index)}
                        variant="small"
                        className="-mr-2"
                      >
                        {expandedCards[index] ? 'Pokaż mniej' : 'Pokaż więcej'}
                      </Button>
                    )}
                  </div>
                </Tile>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}

export default Experience;

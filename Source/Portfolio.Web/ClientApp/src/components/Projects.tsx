import { useState } from 'react';
import { SectionTitle, Tile, Tag, IconButton, Button } from '../design-system';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  image?: string;
  githubLink?: string;
  liveLink?: string;
}

function Projects() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects: Project[] = [
    {
      title: 'System zarządzania e-commerce',
      description: 'Skalowalna platforma e-commerce obsługująca tysiące transakcji dziennie',
      image: '/src/assets/developer.avif',
      githubLink: 'https://github.com/example/ecommerce',
      liveLink: 'https://example-ecommerce.com',
      technologies: ['ASP.NET Core', 'SQL Server', 'Redis', 'Docker', 'Azure'],
      highlights: [
        'Architektura mikroserwisów',
        'Obsługa 10k+ użytkowników jednocześnie',
        'Integration z systemami płatności',
        'Real-time inventory management'
      ]
    },
    {
      title: 'API dla aplikacji IoT',
      description: 'Wydajne API do zbierania i przetwarzania danych z urządzeń IoT',
      image: '/src/assets/developer.avif',
      githubLink: 'https://github.com/example/iot-api',
      liveLink: 'https://example-iot.com',
      technologies: ['.NET 8', 'MongoDB', 'RabbitMQ', 'SignalR', 'Kubernetes'],
      highlights: [
        'Przetwarzanie 1M+ zdarzeń dziennie',
        'Real-time data streaming',
        'Event-driven architecture',
        'Horizontal scaling'
      ]
    },
    {
      title: 'System raportowania biznesowego',
      description: 'Kompleksowy system do generowania i analizy raportów biznesowych',
      image: '/src/assets/developer.avif',
      githubLink: 'https://github.com/example/reports',
      liveLink: 'https://example-reports.com',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Docker'],
      highlights: [
        'Automatyczne generowanie raportów',
        'Export do wielu formatów (PDF, Excel, CSV)',
        'Scheduled jobs i queue processing',
        'RESTful API z autentykacją JWT'
      ]
    },
    {
      title: 'Platforma do integracji systemów',
      description: 'Middleware łączący różne systemy enterprise poprzez API',
      image: '/src/assets/developer.avif',
      githubLink: 'https://github.com/example/integration',
      liveLink: 'https://example-integration.com',
      technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'AWS'],
      highlights: [
        'ETL pipelines',
        'Message broker integration',
        'Data transformation',
        'Monitoring i logging'
      ]
    },
    {
      title: 'Aplikacja mobilna do zarządzania zadaniami',
      description: 'Cross-platform aplikacja mobilna z synchronizacją w czasie rzeczywistym',
      image: '/src/assets/developer.avif',
      githubLink: 'https://github.com/example/mobile-tasks',
      liveLink: 'https://example-tasks.com',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Node.js'],
      highlights: [
        'Offline-first architecture',
        'Real-time collaboration',
        'Push notifications',
        'Biometric authentication'
      ]
    },
    {
      title: 'System CMS dla wydawnictwa',
      description: 'Zaawansowany system zarządzania treścią z workflow publikacji',
      image: '/src/assets/developer.avif',
      githubLink: 'https://github.com/example/cms',
      liveLink: 'https://example-cms.com',
      technologies: ['ASP.NET Core', 'Blazor', 'Entity Framework', 'Azure', 'SQL Server'],
      highlights: [
        'Multi-language support',
        'Advanced permissions system',
        'Version control dla treści',
        'SEO optimization tools'
      ]
    }
  ];

  return (
    <section id="projects" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-0">
        <SectionTitle>Projekty</SectionTitle>
        <div 
          className="grid grid-cols-3 gap-8 w-[1406px] mx-auto overflow-hidden transition-all duration-700 ease-in-out py-6"
          style={{
            maxHeight: showAllProjects ? '3000px' : '480px'
          }}
        >
          {projects.map((project, index) => (
            <Tile
              key={index}
              imageUrl={project.image}
              imageAlt={project.title}
              className={`flex flex-col relative transition-all duration-500 ${
                index >= 3 && !showAllProjects ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                animation: `fadeIn 0.4s ease-out ${index * 0.1}s both`
              }}
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-3">
                {project.title}
              </h3>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Tag key={techIndex} variant="neutral">
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-400 mb-4">
                {project.description}
              </p>
              
              <div className="absolute bottom-4 right-4 flex gap-3">
                {project.githubLink && (
                  <IconButton
                    href={project.githubLink}
                    size="small"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </IconButton>
                )}
                {project.liveLink && (
                  <IconButton
                    href={project.liveLink}
                    size="small"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </IconButton>
                )}
              </div>
            </Tile>
          ))}
        </div>
        
        {projects.length > 3 && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowAllProjects(!showAllProjects)}>
              {showAllProjects ? 'Pokaż mniej' : 'Pokaż więcej'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;

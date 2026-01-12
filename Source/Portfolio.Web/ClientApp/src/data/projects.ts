export interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  image?: string;
  githubLink?: string;
  liveLink?: string;
}

export const projects: Project[] = [
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

import type { ContentDto } from '../models';
import developerImage from '../../assets/developer.avif';

export const mockContentPL: ContentDto = {
  hero: {
    motto: 'Nie da się? Ludzie w kosmos latają.',
    aboutMe: {
      title: '.NET Developer',
      greeting: 'Witaj, mam na imię Wiktor a to jest moja wizytówka.',
      description: [
        'Z 7-letnim doświadczeniem w branży IT specjalizuję się w tworzeniu wydajnych aplikacji backendowych w ekosystemie .NET. Pasjonuję się czystym kodem, architekturą systemów oraz rozwiązywaniem złożonych problemów technicznych.',
        'Moje doświadczenie obejmuje projektowanie RESTful API, optymalizację baz danych, implementację wzorców projektowych oraz budowanie skalowalnych rozwiązań chmurowych. Zawsze staram się pisać kod, który jest nie tylko funkcjonalny, ale także czytelny i łatwy w utrzymaniu.'
      ]
    }
  },
  experiences: [
    {
      company: 'Nazwa Firmy 1',
      position: 'Senior .NET Developer',
      startDate: '2022-01-01',
      endDate: null,
      description: 'Projektowanie i rozwój aplikacji webowych w technologii .NET',
      achivements: [
        'Implementacja REST API oraz integracje z zewnętrznymi systemami',
        'Optymalizacja wydajności aplikacji i baz danych'
      ],
      technologies: ['C#', '.NET', 'React', 'PostgreSQL', 'Docker']
    },
    {
      company: 'Nazwa Firmy 2',
      position: '.NET Developer',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      description: 'Rozwój aplikacji biznesowych w ekosystemie .NET',
      achivements: [
        'Tworzenie interfejsów użytkownika w React',
        'Współpraca z zespołem w metodyce Agile/Scrum'
      ],
      technologies: ['C#', 'ASP.NET Core', 'JavaScript', 'MSSQL', 'Azure']
    },
    {
      company: 'Nazwa Firmy 3',
      position: 'Junior .NET Developer',
      startDate: '2018-01-01',
      endDate: '2020-01-01',
      description: 'Utrzymanie i rozwój istniejących aplikacji .NET',
      achivements: [
        'Wsparcie zespołu w codziennych zadaniach developerskich',
        'Pisanie testów jednostkowych i dokumentacji technicznej'
      ],
      technologies: ['C#', '.NET', 'WinForms', 'MSSQL']
    }
  ],
  educations: [
    {
      degree: 'Inżynier Informatyki',
      field: 'Informatyka',
      institution: 'Nazwa Uczelni 1',
      startDate: '2018-01-01',
      endDate: '2022-01-01',
      description: null
    },
    {
      degree: 'Technik Informatyk',
      field: 'Informatyka',
      institution: 'Nazwa Uczelni 2',
      startDate: '2014-01-01',
      endDate: '2018-01-01',
      description: null
    }
  ],
  projects: [
    {
      title: 'System zarządzania e-commerce',
      description: 'Skalowalna platforma e-commerce obsługująca tysiące transakcji dziennie',
      technologies: ['ASP.NET Core', 'SQL Server', 'Redis', 'Docker', 'Azure'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://example-ecommerce.com'
    },
    {
      title: 'API dla aplikacji IoT',
      description: 'Wydajne API do zbierania i przetwarzania danych z urządzeń IoT',
      technologies: ['.NET 8', 'MongoDB', 'RabbitMQ', 'SignalR', 'Kubernetes'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/iot-api',
      liveUrl: 'https://example-iot.com'
    },
    {
      title: 'System raportowania biznesowego',
      description: 'Kompleksowy system do generowania i analizy raportów biznesowych',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Docker'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/reports',
      liveUrl: 'https://example-reports.com'
    },
    {
      title: 'Platforma do integracji systemów',
      description: 'Middleware łączący różne systemy enterprise poprzez API',
      technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'AWS'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/integration',
      liveUrl: 'https://example-integration.com'
    },
    {
      title: 'Aplikacja mobilna do zarządzania zadaniami',
      description: 'Cross-platform aplikacja mobilna z synchronizacją w czasie rzeczywistym',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Node.js'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/mobile-tasks',
      liveUrl: 'https://example-tasks.com'
    },
    {
      title: 'System CMS dla wydawnictwa',
      description: 'Zaawansowany system zarządzania treścią z workflow publikacji',
      technologies: ['ASP.NET Core', 'Blazor', 'Entity Framework', 'Azure', 'SQL Server'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/cms',
      liveUrl: 'https://example-cms.com'
    }
  ],
  facts: [
    {
      title: 'Pierwszy program w wieku 12 lat',
      description: 'Moja przygoda z programowaniem rozpoczęła się od prostej gry w Visual Basic. Od tamtej pory kod towarzyszył mi każdego dnia.'
    },
    {
      title: 'Ponad 100,000 linii kodu',
      description: 'W ciągu kariery napisałem ponad 100 tysięcy linii kodu w C# i TypeScript, rozwiązując problemy od prostych formularzy po złożone systemy enterprise.'
    },
    {
      title: 'Nocny maraton debugowania',
      description: 'Najdłuższa sesja debugowania trwała 14 godzin. Problem? Literówka w nazwie zmiennej środowiskowej. Od tamtej pory zawsze sprawdzam konfigurację jako pierwsze.'
    },
    {
      title: 'Miłośnik automatyzacji',
      description: 'Jeśli coś robię więcej niż 3 razy, piszę do tego skrypt. Zaoszczędziłem już setki godzin dzięki automatyzacji powtarzalnych zadań.'
    },
    {
      title: 'Open source contributor',
      description: 'Regularnie contributuję do projektów open source. Uwielbiam dzielić się wiedzą i pomagać społeczności developerskiej.'
    },
    {
      title: 'Kawa to paliwo',
      description: 'Średnio 4 kawy dziennie. Najlepsza kawa to ta wypita podczas rozwiązywania trudnego problemu o 3 nad ranem.'
    }
  ],
  skillsCategories: [
    {
      name: 'Backend',
      skills: [
        { name: 'C#', icon: null },
        { name: '.NET', icon: null },
        { name: 'ASP.NET Core', icon: null },
        { name: 'Entity Framework', icon: null }
      ]
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'React', icon: null },
        { name: 'TypeScript', icon: null },
        { name: 'JavaScript', icon: null },
        { name: 'Tailwind CSS', icon: null }
      ]
    },
    {
      name: 'Database',
      skills: [
        { name: 'SQL Server', icon: null },
        { name: 'PostgreSQL', icon: null },
        { name: 'MongoDB', icon: null },
        { name: 'Redis', icon: null }
      ]
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Docker', icon: null },
        { name: 'Azure', icon: null },
        { name: 'Git', icon: null },
        { name: 'Kubernetes', icon: null }
      ]
    }
  ],
  contact: [
    { 
      type: 'github', 
      value: 'https://github.com/wiktorwijata',
      title: 'GitHub',
      isExternal: true
    },
    { 
      type: 'linkedin', 
      value: 'https://linkedin.com/in/wiktorwijata',
      title: 'LinkedIn',
      isExternal: true
    },
    { 
      type: 'email', 
      value: 'mailto:wiktor.wijata@example.com',
      title: 'Email',
      isExternal: false
    }
  ]
};

export const mockContentEN: ContentDto = {
  hero: {
    motto: 'Can\'t be done? People fly to space.',
    aboutMe: {
      title: '.NET Developer',
      greeting: 'Hello, my name is Wiktor and this is my portfolio.',
      description: [
        'With 7 years of experience in IT, I specialize in creating efficient backend applications in the .NET ecosystem. I am passionate about clean code, system architecture, and solving complex technical problems.',
        'My experience includes designing RESTful APIs, database optimization, implementing design patterns, and building scalable cloud solutions. I always strive to write code that is not only functional but also readable and easy to maintain.'
      ]
    }
  },
  experiences: [
    {
      company: 'Company Name 1',
      position: 'Senior .NET Developer',
      startDate: '2022-01-01',
      endDate: null,
      description: 'Designing and developing web applications in .NET technology',
      achivements: [
        'Implementation of REST API and integrations with external systems',
        'Optimization of application and database performance'
      ],
      technologies: ['C#', '.NET', 'React', 'PostgreSQL', 'Docker']
    },
    {
      company: 'Company Name 2',
      position: '.NET Developer',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      description: 'Development of business applications in the .NET ecosystem',
      achivements: [
        'Creating user interfaces in React',
        'Collaboration with the team using Agile/Scrum methodology'
      ],
      technologies: ['C#', 'ASP.NET Core', 'JavaScript', 'MSSQL', 'Azure']
    },
    {
      company: 'Company Name 3',
      position: 'Junior .NET Developer',
      startDate: '2018-01-01',
      endDate: '2020-01-01',
      description: 'Maintenance and development of existing .NET applications',
      achivements: [
        'Team support in daily development tasks',
        'Writing unit tests and technical documentation'
      ],
      technologies: ['C#', '.NET', 'WinForms', 'MSSQL']
    }
  ],
  educations: [
    {
      degree: 'Computer Science Engineer',
      field: 'Computer Science',
      institution: 'University Name 1',
      startDate: '2018-01-01',
      endDate: '2022-01-01',
      description: null
    },
    {
      degree: 'IT Technician',
      field: 'Computer Science',
      institution: 'University Name 2',
      startDate: '2014-01-01',
      endDate: '2018-01-01',
      description: null
    }
  ],
  projects: [
    {
      title: 'E-commerce management system',
      description: 'Scalable e-commerce platform handling thousands of transactions daily',
      technologies: ['ASP.NET Core', 'SQL Server', 'Redis', 'Docker', 'Azure'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/ecommerce',
      liveUrl: 'https://example-ecommerce.com'
    },
    {
      title: 'API for IoT applications',
      description: 'Efficient API for collecting and processing data from IoT devices',
      technologies: ['.NET 8', 'MongoDB', 'RabbitMQ', 'SignalR', 'Kubernetes'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/iot-api',
      liveUrl: 'https://example-iot.com'
    },
    {
      title: 'Business reporting system',
      description: 'Comprehensive system for generating and analyzing business reports',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'Docker'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/reports',
      liveUrl: 'https://example-reports.com'
    },
    {
      title: 'System integration platform',
      description: 'Middleware connecting various enterprise systems through APIs',
      technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'AWS'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/integration',
      liveUrl: 'https://example-integration.com'
    },
    {
      title: 'Mobile task management app',
      description: 'Cross-platform mobile app with real-time synchronization',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Node.js'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/mobile-tasks',
      liveUrl: 'https://example-tasks.com'
    },
    {
      title: 'CMS system for publishing',
      description: 'Advanced content management system with publication workflow',
      technologies: ['ASP.NET Core', 'Blazor', 'Entity Framework', 'Azure', 'SQL Server'],
      imageUrl: developerImage,
      codeUrl: 'https://github.com/example/cms',
      liveUrl: 'https://example-cms.com'
    }
  ],
  facts: [
    {
      title: 'First program at age 12',
      description: 'My programming journey started with a simple game in Visual Basic. Since then, code has been with me every day.'
    },
    {
      title: 'Over 100,000 lines of code',
      description: 'Throughout my career, I have written over 100 thousand lines of code in C# and TypeScript, solving problems from simple forms to complex enterprise systems.'
    },
    {
      title: 'Night debugging marathon',
      description: 'The longest debugging session lasted 14 hours. The problem? A typo in an environment variable name. Since then, I always check configuration first.'
    },
    {
      title: 'Automation enthusiast',
      description: 'If I do something more than 3 times, I write a script for it. I have saved hundreds of hours through automating repetitive tasks.'
    },
    {
      title: 'Open source contributor',
      description: 'I regularly contribute to open source projects. I love sharing knowledge and helping the developer community.'
    },
    {
      title: 'Coffee is fuel',
      description: 'Average 4 coffees per day. The best coffee is the one drunk while solving a difficult problem at 3 AM.'
    }
  ],
  skillsCategories: [
    {
      name: 'Backend',
      skills: [
        { name: 'C#', icon: null },
        { name: '.NET', icon: null },
        { name: 'ASP.NET Core', icon: null },
      ]
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'React', icon: null },
        { name: 'TypeScript', icon: null },
        { name: 'JavaScript', icon: null },
        { name: 'Tailwind CSS', icon: null }
      ]
    },
    {
      name: 'Database',
      skills: [
        { name: 'SQL Server', icon: null },
        { name: 'PostgreSQL', icon: null },
        { name: 'MongoDB', icon: null },
        { name: 'Redis', icon: null }
      ]
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Docker', icon: null },
        { name: 'Azure', icon: null },
        { name: 'Git', icon: null },
        { name: 'Kubernetes', icon: null }
      ]
    }
  ],
  contact: [
    { 
      type: 'github', 
      value: 'https://github.com/wiktorwijata',
      title: 'GitHub',
      isExternal: true
    },
    { 
      type: 'linkedin', 
      value: 'https://linkedin.com/in/wiktorwijata',
      title: 'LinkedIn',
      isExternal: true
    },
    { 
      type: 'email', 
      value: 'mailto:wiktor.wijata@example.com',
      title: 'Email',
      isExternal: false
    }
  ]
};

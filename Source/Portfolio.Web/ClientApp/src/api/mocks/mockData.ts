import type { ContentDto } from '../models';
import developerImage from '../../assets/developer.avif';
import portfolioImage from '../../assets/projects/portfolio.png';
import vitrum from '../../assets/projects/vitrum.png';

export const mockContentPL: ContentDto = {
  hero: {
    motto: 'Nie da się? Ludzie w kosmos latają.',
    aboutMe: {
      title: ' Console.WriteLine("Hello World");',
      greeting: 'Cześć, mam na imię Wiktor i bardzo mi miło, że mnie odwiedziłeś.',
      description: [
        'Skoro już tu jesteś, pozwól, że opowiem Ci trochę o sobie.',
        'Odkąd zacząłem swoją przygodę z programowaniem minęło już ponad 7 lat. Od tego czasu specjalizuję się w tworzeniu wydajnych aplikacji backendowych w ekosystemie .NET. Pasjonuje mnie pisanie czystego kodu, architektura systemów oraz rozwiązywanie złożonych problemów technicznych.',
        'Najwięszką satysafakcję sprawia mi kiedy za pomocą mojej pracy mogę rozwiązać realne problemy.'
      ]
    }
  },
  skillsCategories: [
    {
      name: 'Backend',
      skills: [
        { name: 'C#', icon: null },
        { name: '.NET Core', icon: null },
        { name: 'EF Core', icon: null },
        { name: 'VB.NET', icon: null },
        { name: 'NHibernate', icon: null },
        { name: 'SignalR', icon: null}
      ]
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'HTML5', icon: null },
        { name: 'CSS3', icon: null },
        { name: 'React', icon: null },
        { name: 'Aurelia', icon: 'https://cdn.simpleicons.org/aurelia' },
        { name: 'Knockout.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/knockout/knockout-plain-wordmark.svg' },
        { name: 'Blazor', icon: null },
        { name: 'TypeScript', icon: null },
        { name: 'JavaScript', icon: null },
        { name: 'Tailwind CSS', icon: null },
        { name: 'Bootstrap', icon: null }
      ]
    },
    {
      name: 'Desktop',
      skills: [
        { name: 'WPF', icon: null },
        { name: 'WinForms', icon: null }
      ]
    },
    {
      name: 'Database',
      skills: [
        { name: 'MSSQL', icon: null },
        { name: 'Azure SQL', icon: null },
        { name: 'PostgreSQL', icon: null },
        { name: 'Oracle DB', icon: null },
        { name: 'MongoDB', icon: null },
        { name: 'Redis', icon: null },
        { name: 'Apache Solr', icon: 'https://cdn.simpleicons.org/apachesolr' }
      ]
    },
    {
      name: 'API & Messaging',
      skills: [
        { name: 'REST API', icon: null },
        { name: 'SOAP', icon: null },
        { name: 'Masstransit', icon: null },
        { name: 'RabbitMQ', icon: null }
      ]
    },
    {
      name: 'CI/CD',
      skills: [
        { name: 'Azure DevOps Pipelines', icon: null },
        { name: 'GitHub Actions', icon: null },
        { name: 'Docker', icon: null },
        { name: 'Kubernetes', icon: null },
        { name: 'SonarQube', icon: null },
        { name: 'NuGet', icon: null }
      ]
    },
    {
      name: 'Kontrola wersji',
      skills: [
        { name: 'Git', icon: null },
        { name: 'Github', icon: 'https://cdn.simpleicons.org/github/white' },
        { name: 'GitLab', icon: null },
        { name: 'SVN', icon: null }
      ]
    },
    {
      name: 'Testy',
      skills: [
        { name: 'xUnit', icon: null },
        { name: 'NUnit', icon: null }
      ]
    },
    {
      name: 'Narzędzia',
      skills: [
        { name: 'Visual Studio', icon: null },
        { name: 'VS Code', icon: null },
        { name: 'Rider', icon: null },
        { name: 'Azure DevOps', icon: null },
        { name: 'Jira', icon: null },
        { name: 'Postman', icon: null },
        { name: 'Swagger', icon: null },
        { name: 'Figma', icon: null },
        { name: 'Gimp', icon: null },
      ]
    }
  ],
  projects: [
    {
      title: '@vitrum/ui',
      description: 'Autorski design-system stworzony w React i TypeScript w stylu glass-morphism, wykorzystywany w moich projektach frontendowych. Zawiera zestaw wielokrotnie używanych komponentów UI, motywów kolorystycznych oraz narzędzi do budowy responsywnych interfejsów.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      imageUrl: vitrum,
      codeUrl: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio.Web/ClientApp/src/design-system'
    },
    {
      title: 'Portfolio',
      description: 'Strona wizytówka prezentująca moje umiejętności, doświadczenie oraz projekty. Treść na stronę zarządzana jest przez autorski CMS.',
      technologies: ['C#','.NET 10', 'MSSQL', 'React', 'TypeScript', 'Tailwind CSS', 'Docker', 'Kubernetes'],
      imageUrl: portfolioImage,
      codeUrl: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio.Web/ClientApp'
    }
  ],
  experiences: [
    {
      company: 'mLeasing Sp. z o.o.',
      position: '.NET Developer',
      startDate: '2021-11-01',
      endDate: null,
      description: 'Projektowanie i rozwój aplikacji webowych w technologii .NET',
      achivements: [
        'Tworzenie i utrzymanie aplikacji webowych w technologii .NET (backend i frontend)',
        'Tworzenie i utrzymanie aplikacji w środowisku chmurowym Microsoft Azure',
        'Praca z bazą danych SQL Server/Oracle DB/MongoDb - utrzymanie i rozwój struktur bazodanowych (tabele, indeksy, relacje), optymalizacja zapytań',
        'Integracja z zewnętrznymi systemami oraz implementacja komunikacji między usługami',
        'Praca z komunikacją asynchroniczną (RabbitMQ/MassTransit)',
        'Konfiguracja i utrzymanie pipeline-ów CI/CD w Azure DevOps (build, testy, wdrożenia)',
        'Analiza, diagnozowanie i rozwiązywanie problemów zgłaszanych przez użytkowników oraz zespół QA',
        'Pisanie testów jednostkowych i integracyjnych',
        'Przeprowadzanie Code Review oraz dbanie o jakość i spójność kodu zgodnie z ustalonymi standardami',
        'Udział w planowaniu sprintów, estymacji zadań oraz projektowaniu rozwiązań technicznych',
        'Tworzenie dokumentacji technicznej (C4 model)'
      ],
      technologies: ['C#', '.NET', 'TypeScript', 'React', 'Aurelia', 'Knockout.js', 'Blazor', 'MSSQL', 'Oracle DB', 'MongoDB', 'RESTful API', 'RabbitMQ', 'MassTransit', 'Docker', 'Kubernetes', 'Azure DevOps', 'xUnit', 'NUnit', 'Azure', 'Application Insights']
    },
    {
      company: 'LSI Software S.A.',
      position: '.NET Developer',
      startDate: '2019-01-01',
      endDate: '2021-11-01',
      achivements: [
        'Współtworzenie i rozwój systemu ERP, w tym implementacja nowych funkcjonalności, integracja z usługami REST/SOAP oraz wsparcie użytkowników biznesowych',
        'Projektowanie, rozwój i utrzymanie aplikacji desktopowych w technologii WPF i .NET Core, stosując architekturę MVVM',
        'Tworzenie dynamicznych i responsywnych interfejsów użytkownika w XAML',
        'Tworzenie aplikacji desktopowej (WinForms) umożliwiającej użytkownikom wystawianie i zarządzanie własnymi usługami REST/SOAP z poziomu interfejsu graficznego',
        'Integracja z zewnętrznymi systemami (np. PayU, Pyszne.pl, UberEats)',
        'Praca z bazą danych SQL Server (optymalizacja zapytań, migracje, konserwacja)',
        'Wsparcie przy tworzeniu aplikacji webowych w ASP.NET MVC i .NET Core',
        'Analiza, diagnozowanie i rozwiązywanie problemów zgłaszanych przez użytkowników oraz zespół QA',
        'Pisanie testów jednostkowych i integracyjnych oraz dbanie o stabilność aplikacji',
        'Przeprowadzanie Code Review oraz dbanie o jakość i spójność kodu zgodnie ze standardami zespołu',
        'Udział w planowaniu sprintów, estymacji zadań oraz projektowaniu rozwiązań technicznych',
        'Tworzenie dokumentacji technicznej',
      ],
      technologies: ['C#', 'XAML', '.NET',  'WPF', 'WinForms', 'ASP.NET MVC', 'MSSQL', 'PostgreSQL', 'RESTful API', 'SOAP', 'Jira', 'NUnit']
    },
    {
      company: 'GECOS Sp. z o.o.',
      position: 'Programista C#/SQL',
      startDate: '2018-09-01',
      endDate: '2019-01-01',
      achivements: [
        'Tworzenie dodatków i aplikacji dla systemu Comarch CDN XL',
        'Programistyczne wsparcie klientów korzystających z systemów Comarch, w tym rozwój funkcjonalności i rozwiązywanie problemów',
        'Integracja aplikacji z istniejącymi modułami systemu Comarch i dostosowywanie ich do wymagań biznesowych klientów',
        'Analiza zgłoszeń użytkowników oraz diagnozowanie i naprawa błędów systemowych',
        'Tworzenie i aktualizacja dokumentacji technicznej oraz instrukcji dla użytkowników końcowych'
      ],
      technologies: ['C#', 'XAML','.NET', 'WPF', 'WinForms', 'MSSQL']
    },
    {
      company: 'Moje Bambino Sp. z o.o. Sp. k.',
      position: 'Specjalista ds. analiz',
      startDate: '2016-09-01',
      endDate: '2018-09-01',
      achivements: [
        'Tworzenie raportów sprzedaży przy użyciu Excel oraz zapytań SQL/procedur składowanych',
        'Projektowanie i rozwój aplikacji wspierających wycenę produktów oraz tworzenie katalogów sprzedażowych',
        'Integracja danych z różnych źródeł w celu zapewnienia dokładnych i aktualnych informacji dla zespołów sprzedaży',
        'Analiza potrzeb biznesowych i dostosowywanie aplikacji oraz raportów do wymagań klientów',
        'Optymalizacja zapytań SQL i struktur baz danych w celu poprawy wydajności generowanych raportów'
      ],
      technologies: ['VBA', 'VB.NET', 'C#', 'XAML','.NET', 'WPF', 'WinForms', 'MSSQL']
    }
  ],
  educations: [
    {
      degree: 'AZ-204',
      field: 'Microsoft certified: Azure Developer Associate',
      institution: 'microsoft.com',
      startDate: '2022-01-01',
      endDate: '2022-01-01',
    },
    {
      degree: '70-483, 70-486',
      field: 'Microsoft certified solutions associate: Web Applications - certified 2019',
      institution: 'microsoft.com',
      startDate: '2022-01-01',
      endDate: '2022-01-01',
    },
    {
      degree: 'Technikum Informatyczne',
      field: 'Technik Informatyk',
      institution: 'Zespół Szkół Ponadgimazjalnych nr 1 w Opocznie',
      startDate: '2008-09-01',
      endDate: '2011-04-01',
    },
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
        { name: '.NET Core', icon: null },
        { name: 'EF Core', icon: null }
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

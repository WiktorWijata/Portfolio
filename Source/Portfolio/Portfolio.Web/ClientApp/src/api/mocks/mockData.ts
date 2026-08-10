import type { ContentDto } from '../models';
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
      company: 'B3 Consulting Poland Sp. z o.o.',
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
      startDate: '2020-03-01',
      endDate: '2020-03-01',
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
      title: 'Smakowity sum',
      description: 'Sum ma najwięcej kubków smakowych ze wszystkich zwierząt — ma ich ponad 27 000!',
      icon: '🐟'
    },
    {
      title: 'Myszka Miki i listy',
      description: 'W 1933 roku Myszka Miki, postać z kreskówek, otrzymała 800 000 listów od fanów.',
      icon: '📬'
    },
    {
      title: 'Wenusjański dzień',
      description: 'Na Wenus dzień trwa dłużej niż rok, czyli planeta obraca się wolniej niż okrąża Słońce.',
      icon: '🪐'
    },
    {
      title: 'Miód nie psuje się nigdy',
      description: 'W egipskich grobowcach liczących ponad 3000 lat odkryto miód, który nadal był jadalny. Dzięki niskiej zawartości wody i właściwościom antybakteryjnym miód praktycznie nie ma terminu ważności.',
      icon: '🍯'
    },
    {
      title: 'Ośmiornica z trzema sercami',
      description: 'Ośmiornica ma trzy serca i niebieską krew. Dwa serca pompują krew do skrzeli, a trzecie do reszty ciała. Krew jest niebieska ze względu na hemocyjaninę zawierającą miedź zamiast żelaza.',
      icon: '🐙'
    },
    {
      title: 'Piorun uderza 100 razy na sekundę',
      description: 'W każdej chwili na Ziemi szaleje ok. 2000 burz. W ich wyniku pioruny uderzają w powierzchnię Ziemi średnio 100 razy na każdą sekundę — łącznie ok. 8,6 miliona razy dziennie.',
      icon: '⚡'
    },
    {
      title: 'Księżyc oddala się od Ziemi',
      description: 'Księżyc oddala się od Ziemi o około 3,8 cm rocznie. Za miliard lat będzie tak daleko, że całkowite zaćmienia Słońca nie będą już możliwe.',
      icon: '🌙'
    },
    {
      title: 'Gorąca woda zamarza szybciej',
      description: 'Gorąca woda może zamarznąć szybciej niż zimna — zjawisko to nazywa się efektem Mpemby. Zaobserwował je już Arystoteles, a jego pełne wyjaśnienie naukowe wciąż jest przedmiotem dyskusji.',
      icon: '🧊'
    },
    {
      title: 'Mrówki nigdy nie śpią',
      description: 'Mrówki nie mają typowego snu. Zamiast spać kilka godzin, drzemią setkach krótkich drzemek po ok. 1 minucie przez całą dobę — łącznie śpią ok. 4-5 godzin, ale rozłożonych na cały dzień.',
      icon: '🐜'
    },
    {
      title: 'Odciski języka są unikalne',
      description: 'Podobnie jak odciski palców, odcisk języka każdego człowieka jest całkowicie unikalny. Układ brodawek i kształt języka nie powtarza się u żadnych dwóch osób na świecie.',
      icon: '👅'
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
      value: 'https://www.linkedin.com/in/wiktor-wijata-a72082149/',
      title: 'LinkedIn',
      isExternal: true
    },
    { 
      type: 'email', 
      value: 'mailto:wiktorwijata@gmail.com',
      title: 'Email',
      isExternal: false
    }
  ]
};

export const mockContentEN: ContentDto = {
  hero: {
    motto: 'Can\'t be done? People fly to space.',
    aboutMe: {
      title: ' Console.WriteLine("Hello World");',
      greeting: 'Hi, my name is Wiktor, and I\'m glad you stopped by.',
      description: [
        'Since you\'re here, let me tell you a bit about myself.',
        'It\'s been over 7 years since I started my journey with programming. Since then, I have specialized in building efficient backend applications in the .NET ecosystem. I am passionate about writing clean code, system architecture, and solving complex technical problems.',
        'The greatest satisfaction comes to me when my work can solve real problems.'
      ]
    }
  },
  experiences: [
    {
      company: 'B3 Consulting Poland Sp. z o.o.',
      position: '.NET Developer',
      startDate: '2021-11-01',
      endDate: null,
      description: 'Designing and developing web applications in .NET technology',
      achivements: [
        'Creating and maintaining web applications using .NET technology (backend and frontend)',
        'Creating and maintaining applications in the Microsoft Azure cloud environment',
        'Working with SQL Server / Oracle DB / MongoDB databases — maintaining and developing database structures (tables, indexes, relationships), query optimization',
        'Integration with external systems and implementing inter-service communication',
        'Working with asynchronous messaging (RabbitMQ/MassTransit)',
        'Configuring and maintaining CI/CD pipelines in Azure DevOps (build, tests, deployments)',
        'Analyzing, diagnosing, and resolving issues reported by users and the QA team',
        'Writing unit and integration tests',
        'Conducting code reviews and maintaining code quality and consistency in accordance with established standards',
        'Participating in sprint planning, task estimation, and technical solution design',
        'Creating technical documentation (C4 model)'
      ],
      technologies: ['C#', '.NET', 'TypeScript', 'React', 'Aurelia', 'Knockout.js', 'Blazor', 'MSSQL', 'Oracle DB', 'MongoDB', 'RESTful API', 'RabbitMQ', 'MassTransit', 'Docker', 'Kubernetes', 'Azure DevOps', 'xUnit', 'NUnit', 'Azure', 'Application Insights']
    },
    {
      company: 'LSI Software S.A.',
      position: '.NET Developer',
      startDate: '2019-01-01',
      endDate: '2021-11-01',
      achivements: [
        'Co-creating and developing an ERP system, including implementing new functionalities, integration with REST/SOAP services, and supporting business users',
        'Designing, developing, and maintaining desktop applications using WPF and .NET Core with MVVM architecture',
        'Creating dynamic and responsive user interfaces in XAML',
        'Creating a desktop application (WinForms) allowing users to publish and manage their own REST/SOAP services through a graphical interface',
        'Integration with external systems (e.g., PayU, Pyszne.pl, UberEats)',
        'Working with SQL Server databases (query optimization, migrations, maintenance)',
        'Support in building web applications with ASP.NET MVC and .NET Core',
        'Analyzing, diagnosing, and resolving issues reported by users and the QA team',
        'Writing unit and integration tests and maintaining application stability',
        'Conducting code reviews and maintaining code quality and consistency in accordance with team standards',
        'Participating in sprint planning, task estimation, and technical solution design',
        'Creating technical documentation',
      ],
      technologies: ['C#', 'XAML', '.NET', 'WPF', 'WinForms', 'ASP.NET MVC', 'MSSQL', 'PostgreSQL', 'RESTful API', 'SOAP', 'Jira', 'NUnit']
    },
    {
      company: 'GECOS Sp. z o.o.',
      position: 'C#/SQL Programmer',
      startDate: '2018-09-01',
      endDate: '2019-01-01',
      achivements: [
        'Creating add-ons and applications for the Comarch CDN XL system',
        'Providing programming support for clients using Comarch systems, including functionality development and issue resolution',
        'Integrating applications with existing Comarch system modules and adapting them to client business requirements',
        'Analyzing user reports, diagnosing, and fixing system bugs',
        'Creating and updating technical documentation and user manuals'
      ],
      technologies: ['C#', 'XAML', '.NET', 'WPF', 'WinForms', 'MSSQL']
    },
    {
      company: 'Moje Bambino Sp. z o.o. Sp. k.',
      position: 'Analytics Specialist',
      startDate: '2016-09-01',
      endDate: '2018-09-01',
      achivements: [
        'Creating sales reports using Excel and SQL queries/stored procedures',
        'Designing and developing applications supporting product pricing and creation of sales catalogs',
        'Integrating data from various sources to ensure accurate and up-to-date information for sales teams',
        'Analyzing business needs and adapting applications and reports to client requirements',
        'Optimizing SQL queries and database structures to improve report generation performance'
      ],
      technologies: ['VBA', 'VB.NET', 'C#', 'XAML', '.NET', 'WPF', 'WinForms', 'MSSQL']
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
      startDate: '2020-03-01',
      endDate: '2020-03-01',
    },
    {
      degree: 'IT Vocational School',
      field: 'IT Technician',
      institution: 'Zespół Szkół Ponadgimazjalnych nr 1 w Opocznie',
      startDate: '2008-09-01',
      endDate: '2011-04-01',
    },
  ],
  projects: [
    {
      title: '@vitrum/ui',
      description: 'A custom design system built in React and TypeScript with a glass-morphism style, used in my frontend projects. Contains a set of reusable UI components, color themes, and tools for building responsive interfaces.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      imageUrl: vitrum,
      codeUrl: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio.Web/ClientApp/src/design-system'
    },
    {
      title: 'Portfolio',
      description: 'A portfolio website showcasing my skills, experience, and projects. The site content is managed by a custom CMS.',
      technologies: ['C#', '.NET 10', 'MSSQL', 'React', 'TypeScript', 'Tailwind CSS', 'Docker', 'Kubernetes'],
      imageUrl: portfolioImage,
      codeUrl: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio.Web/ClientApp'
    }
  ],
  facts: [
    {
      title: 'Tasty catfish',
      description: 'The catfish has more taste buds than any other animal — over 27,000 of them!',
      icon: '🐟'
    },
    {
      title: 'Mickey Mouse and fan mail',
      description: 'In 1933, Mickey Mouse, the cartoon character, received 800,000 fan letters.',
      icon: '📬'
    },
    {
      title: 'A Venusian day',
      description: 'A day on Venus lasts longer than a year — the planet rotates slower than it orbits the Sun.',
      icon: '🪐'
    },
    {
      title: 'Honey never expires',
      description: 'Honey found in Egyptian tombs over 3,000 years old was still edible. Thanks to its low water content and antibacterial properties, honey has virtually no expiration date.',
      icon: '🍯'
    },
    {
      title: 'Octopus has three hearts',
      description: 'An octopus has three hearts and blue blood. Two hearts pump blood to the gills, while the third pumps it to the rest of the body. The blood is blue because it contains copper-based hemocyanin instead of iron.',
      icon: '🐙'
    },
    {
      title: 'Lightning strikes 100 times per second',
      description: 'At any given moment, about 2,000 thunderstorms are active on Earth. As a result, lightning strikes the surface about 100 times every second — roughly 8.6 million times per day.',
      icon: '⚡'
    },
    {
      title: 'The Moon is drifting away',
      description: 'The Moon moves away from Earth by about 3.8 cm per year. In about a billion years, it will be so far away that total solar eclipses will no longer be possible.',
      icon: '🌙'
    },
    {
      title: 'Hot water can freeze faster',
      description: 'Hot water can freeze faster than cold water — a phenomenon known as the Mpemba effect. It was observed by Aristotle, and its full scientific explanation is still debated today.',
      icon: '🧊'
    },
    {
      title: 'Ants never sleep',
      description: 'Ants do not have a conventional sleep cycle. Instead of sleeping for several hours, they take hundreds of short naps of about 1 minute throughout the day — totaling around 4-5 hours of rest spread across 24 hours.',
      icon: '🐜'
    },
    {
      title: 'Tongue prints are unique',
      description: 'Just like fingerprints, every person\'s tongue print is completely unique. The pattern of papillae and the shape of the tongue is never the same in any two people in the world.',
      icon: '👅'
    }
  ],
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
      name: 'Version Control',
      skills: [
        { name: 'Git', icon: null },
        { name: 'Github', icon: 'https://cdn.simpleicons.org/github/white' },
        { name: 'GitLab', icon: null },
        { name: 'SVN', icon: null }
      ]
    },
    {
      name: 'Testing',
      skills: [
        { name: 'xUnit', icon: null },
        { name: 'NUnit', icon: null }
      ]
    },
    {
      name: 'Tools',
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
  contact: [
    { 
      type: 'github', 
      value: 'https://github.com/wiktorwijata',
      title: 'GitHub',
      isExternal: true
    },
    { 
      type: 'linkedin', 
      value: 'https://www.linkedin.com/in/wiktor-wijata-a72082149/',
      title: 'LinkedIn',
      isExternal: true
    },
    { 
      type: 'email', 
      value: 'mailto:wiktorwijata@gmail.com',
      title: 'Email',
      isExternal: false
    }
  ]
};

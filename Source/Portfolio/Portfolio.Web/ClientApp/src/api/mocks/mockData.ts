import type {
  Aspiration,
  Business,
  Certificate,
  Contact,
  Experience,
  Introduction,
  Language,
  Project,
  ProjectArchitectureBlock,
  ProjectArchitectureNote,
  ProjectImage,
  Service,
  SkillCategory,
  Specialization,
  Technology,
} from '../models'

/**
 * Mock responses for each `/profile/*` endpoint, matching the real API's shape 1:1.
 * Used only when VITE_USE_MOCK=true, so the frontend can be developed without a backend.
 * PL content mirrors the current TestData.sql seed; EN is a straight translation of it.
 */

export const mockLanguages: Language[] = [
  { code: 'PL', name: 'Polski' },
  { code: 'EN', name: 'English' },
]

// ---------------------------------------------------------------------------
// Introduction
// ---------------------------------------------------------------------------

export const mockIntroductionPl: Introduction = {
  title: '.NET Developer',
  motto: 'Łączę systemy. Rozwiązuję problemy.',
  description:
    'Tworzę i rozwijam aplikacje w ekosystemie .NET — od backendu i API po rozwiązania webowe i desktopowe. Łączę systemy biznesowe, pracuję z bazami danych i projektuję komunikację między usługami. Ważne są dla mnie zrozumienie problemu, czytelny kod i architektura, która ułatwia dalszy rozwój. Pomagam zarówno przy nowych projektach, jak i przy utrzymaniu oraz modernizacji istniejących aplikacji.',
}

export const mockIntroductionEn: Introduction = {
  title: '.NET Developer',
  motto: 'I connect systems. I solve problems.',
  description:
    'I build and develop applications in the .NET ecosystem — from backend and APIs to web and desktop solutions. I connect business systems, work with databases and design communication between services. What matters to me is understanding the problem, readable code and an architecture that makes further development easier. I help with both new projects and the maintenance and modernization of existing applications.',
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const mockServicesPl: Service[] = [
  {
    iconSlug: 'code-xml',
    title: 'Rozwój aplikacji .NET',
    description: 'Nowe funkcje i utrzymanie istniejących systemów.',
  },
  {
    iconSlug: 'workflow',
    title: 'Integracje systemów',
    description: 'API, komunikacja asynchroniczna i wymiana danych.',
  },
  {
    iconSlug: 'refresh-cw',
    title: 'Modernizacja rozwiązań',
    description: 'Usprawnianie starszych aplikacji i rozwój w Azure.',
  },
  {
    iconSlug: 'network',
    title: 'Projektowanie architektury',
    description:
      'Dobór komponentów, podział odpowiedzialności i komunikacja między usługami. Dokumentacja w modelu C4.',
  },
]

export const mockServicesEn: Service[] = [
  {
    iconSlug: 'code-xml',
    title: '.NET application development',
    description: 'New features and maintenance of existing systems.',
  },
  {
    iconSlug: 'workflow',
    title: 'System integration',
    description: 'APIs, asynchronous communication and data exchange.',
  },
  {
    iconSlug: 'refresh-cw',
    title: 'Solution modernization',
    description: 'Improving legacy applications and development in Azure.',
  },
  {
    iconSlug: 'network',
    title: 'Architecture design',
    description:
      'Choosing components, dividing responsibilities and communication between services. Documentation in the C4 model.',
  },
]

// ---------------------------------------------------------------------------
// Specializations
// ---------------------------------------------------------------------------

const devicon = (slug: string): Technology => ({
  name: slug,
  iconSource: 'Devicon',
  iconSlug: slug,
  iconIsMonochrome: false,
})
const tech = (name: string, iconSource: 'Devicon' | 'SimpleIcons', iconSlug: string): Technology => ({
  name,
  iconSource,
  iconSlug,
  iconIsMonochrome: false,
})

const T = {
  react: tech('React', 'Devicon', 'react'),
  blazor: tech('Blazor', 'Devicon', 'blazor'),
  wpf: tech('WPF', 'Devicon', 'dot-net'),
  winforms: tech('WinForms', 'Devicon', 'dot-net'),
  dotnet: tech('.NET', 'Devicon', 'dotnetcore'),
  restApi: tech('REST API', 'SimpleIcons', 'openapiinitiative'),
  grpc: tech('gRPC', 'Devicon', 'grpc'),
  soap: tech('SOAP', 'Devicon', 'dot-net'),
  wcf: tech('WCF', 'Devicon', 'dot-net'),
  rabbitmq: tech('RabbitMQ', 'Devicon', 'rabbitmq'),
  masstransit: tech('MassTransit', 'Devicon', 'dot-net'),
  sqlServer: tech('SQL Server', 'Devicon', 'microsoftsqlserver'),
  mongodb: tech('MongoDB', 'Devicon', 'mongodb'),
  azure: tech('Azure', 'Devicon', 'azure'),
  azureDevOps: tech('Azure DevOps', 'Devicon', 'azuredevops'),
  githubActions: tech('GitHub Actions', 'Devicon', 'githubactions'),
  docker: tech('Docker', 'Devicon', 'docker'),
  kubernetes: tech('Kubernetes', 'Devicon', 'kubernetes'),
  csharp: devicon('csharp'),
  typescript: devicon('typescript'),
  tailwind: devicon('tailwindcss'),
}

export const mockSpecializationsPl: Specialization[] = [
  {
    tag: 'UI',
    title: 'Aplikacje biznesowe',
    subtitle: 'Web i desktop dla użytkowników wewnętrznych',
    technologies: [T.react, T.blazor, T.wpf, T.winforms],
  },
  {
    tag: 'API',
    title: 'Backend i usługi',
    subtitle: 'Logika domenowa, kontrakty, autoryzacja',
    technologies: [T.dotnet, T.restApi, T.grpc, T.soap, T.wcf],
  },
  {
    tag: 'MSG',
    title: 'Integracje',
    subtitle: 'Komunikacja z systemami zewnętrznymi',
    technologies: [T.rabbitmq, T.masstransit],
  },
  {
    tag: 'DB',
    title: 'Dane',
    subtitle: 'Modele, migracje, optymalizacja zapytań',
    technologies: [T.sqlServer, T.mongodb],
  },
  {
    tag: 'OPS',
    title: 'Wdrożenia i utrzymanie',
    subtitle: "Pipeline'y, monitoring, chmura",
    technologies: [T.azure, T.azureDevOps, T.githubActions, T.docker, T.kubernetes],
  },
]

export const mockSpecializationsEn: Specialization[] = [
  {
    tag: 'UI',
    title: 'Business applications',
    subtitle: 'Web and desktop for internal users',
    technologies: [T.react, T.blazor, T.wpf, T.winforms],
  },
  {
    tag: 'API',
    title: 'Backend and services',
    subtitle: 'Domain logic, contracts, authorization',
    technologies: [T.dotnet, T.restApi, T.grpc, T.soap, T.wcf],
  },
  {
    tag: 'MSG',
    title: 'Integrations',
    subtitle: 'Communication with external systems',
    technologies: [T.rabbitmq, T.masstransit],
  },
  {
    tag: 'DB',
    title: 'Data',
    subtitle: 'Models, migrations, query optimization',
    technologies: [T.sqlServer, T.mongodb],
  },
  {
    tag: 'OPS',
    title: 'Deployment and maintenance',
    subtitle: 'Pipelines, monitoring, cloud',
    technologies: [T.azure, T.azureDevOps, T.githubActions, T.docker, T.kubernetes],
  },
]

// ---------------------------------------------------------------------------
// Aspirations
// ---------------------------------------------------------------------------

export const mockAspirationsPl: Aspiration[] = [
  { text: 'pomysłów do zrealizowania' },
  { text: 'powodów, by się rozwijać' },
  { text: 'nowych wyzwań do podjęcia' },
]

export const mockAspirationsEn: Aspiration[] = [
  { text: 'ideas to bring to life' },
  { text: 'reasons to keep growing' },
  { text: 'new challenges to take on' },
]

// ---------------------------------------------------------------------------
// Skills (grouped by category) — mirrors Stack.consts.ts / TestData.sql
// ---------------------------------------------------------------------------

const skillGroup = (namePl: string, nameEn: string, technologies: Technology[]) => ({
  pl: { name: namePl, technologies } as SkillCategory,
  en: { name: nameEn, technologies } as SkillCategory,
})

const SKILL_GROUPS = [
  skillGroup('Backend', 'Backend', [
    T.csharp,
    tech('.NET Core', 'Devicon', 'dotnetcore'),
    tech('.NET Framework', 'Devicon', 'dot-net'),
    tech('VB.NET', 'Devicon', 'visualbasic'),
    tech('NHibernate', 'Devicon', 'nhibernate'),
    tech('SignalR', 'Devicon', 'dot-net'),
  ]),
  skillGroup('Frontend', 'Frontend', [
    tech('HTML5', 'Devicon', 'html5'),
    tech('CSS3', 'Devicon', 'css3'),
    T.react,
    tech('Aurelia', 'SimpleIcons', 'aurelia'),
    tech('Knockout.js', 'Devicon', 'knockout'),
    T.blazor,
    T.typescript,
    tech('JavaScript', 'Devicon', 'javascript'),
    T.tailwind,
    tech('Bootstrap', 'Devicon', 'bootstrap'),
  ]),
  skillGroup('AI', 'AI', [
    tech('GitHub Copilot', 'SimpleIcons', 'githubcopilot'),
    tech('Claude Code', 'SimpleIcons', 'claude'),
    tech('Cursor', 'SimpleIcons', 'cursor'),
    tech('OpenAI API', 'SimpleIcons', 'openai'),
    tech('OpenRouter API', 'SimpleIcons', 'openrouter'),
    tech('HuggingFace', 'SimpleIcons', 'huggingface'),
  ]),
  skillGroup('Desktop', 'Desktop', [T.wpf, T.winforms]),
  skillGroup('Bazy danych', 'Databases', [
    T.sqlServer,
    tech('Azure SQL', 'Devicon', 'azuresqldatabase'),
    tech('PostgreSQL', 'Devicon', 'postgresql'),
    tech('Oracle DB', 'Devicon', 'oracle'),
    T.mongodb,
    tech('Redis', 'Devicon', 'redis'),
    tech('Apache Solr', 'SimpleIcons', 'apachesolr'),
  ]),
  skillGroup('API i komunikacja', 'API & Messaging', [T.restApi, T.grpc, T.wcf, T.soap, T.masstransit, T.rabbitmq]),
  skillGroup('Monitoring', 'Monitoring', [
    tech('Azure Application Insights', 'Devicon', 'azure'),
    tech('Grafana', 'Devicon', 'grafana'),
  ]),
  skillGroup('CI/CD', 'CI/CD', [
    tech('Azure DevOps Pipelines', 'Devicon', 'azuredevops'),
    T.githubActions,
    T.docker,
    T.kubernetes,
    tech('SonarQube', 'Devicon', 'sonarqube'),
    tech('NuGet', 'Devicon', 'nuget'),
  ]),
  skillGroup('Kontrola wersji', 'Version Control', [
    tech('Git', 'Devicon', 'git'),
    tech('GitHub', 'SimpleIcons', 'github'),
    tech('GitLab', 'Devicon', 'gitlab'),
    tech('SVN', 'Devicon', 'subversion'),
  ]),
  skillGroup('Testy', 'Testing', [tech('xUnit', 'Devicon', 'dot-net'), tech('NUnit', 'Devicon', 'dot-net')]),
  skillGroup('Narzędzia', 'Tools', [
    tech('Visual Studio', 'Devicon', 'visualstudio'),
    tech('VS Code', 'Devicon', 'vscode'),
    tech('Rider', 'Devicon', 'rider'),
    T.azureDevOps,
    tech('Jira', 'Devicon', 'jira'),
    tech('Postman', 'Devicon', 'postman'),
    tech('Swagger', 'Devicon', 'swagger'),
    tech('Figma', 'Devicon', 'figma'),
    tech('Gimp', 'Devicon', 'gimp'),
  ]),
]

export const mockSkillCategoriesPl: SkillCategory[] = SKILL_GROUPS.map((g) => g.pl)
export const mockSkillCategoriesEn: SkillCategory[] = SKILL_GROUPS.map((g) => g.en)

// ---------------------------------------------------------------------------
// Experiences
// ---------------------------------------------------------------------------

export const mockExperiencesPl: Experience[] = [
  {
    employer: 'B3 Consulting Poland',
    position: '.NET Developer',
    startDate: '2021-11-01',
    endDate: '2026-03-31',
    areas: [
      {
        title: 'Backend i chmura',
        responsibilities: [
          'Tworzenie i utrzymanie aplikacji webowych w technologii .NET (backend i frontend)',
          'Tworzenie i utrzymanie aplikacji w środowisku chmurowym Microsoft Azure',
        ],
      },
      {
        title: 'Dane',
        responsibilities: [
          'SQL Server / Oracle DB / MongoDB — utrzymanie i rozwój struktur baz (tabele, indeksy, relacje)',
          'Optymalizacja zapytań',
        ],
      },
      {
        title: 'Integracje',
        responsibilities: [
          'Integracja z systemami zewnętrznymi i komunikacja między usługami',
          'Komunikacja asynchroniczna (RabbitMQ / MassTransit)',
        ],
      },
      {
        title: 'DevOps',
        responsibilities: ["Konfiguracja i utrzymanie pipeline'ów CI/CD w Azure DevOps (build, testy, wdrożenia)"],
      },
      {
        title: 'Jakość',
        responsibilities: [
          'Testy jednostkowe i integracyjne',
          'Code review oraz utrzymanie jakości i spójności kodu wg przyjętych standardów',
          'Analiza, diagnoza i rozwiązywanie zgłoszeń od użytkowników i zespołu QA',
        ],
      },
      {
        title: 'Zespół',
        responsibilities: [
          'Udział w planowaniu sprintów, estymacji zadań i projektowaniu rozwiązań technicznych',
          'Tworzenie dokumentacji technicznej (model C4)',
        ],
      },
    ],
    technologies: [
      T.csharp,
      T.dotnet,
      T.azure,
      T.sqlServer,
      tech('Oracle DB', 'Devicon', 'oracle'),
      T.mongodb,
      T.rabbitmq,
      T.masstransit,
      T.azureDevOps,
      tech('C4', 'Devicon', 'dot-net'),
    ],
  },
  {
    employer: 'LSI Software',
    position: '.NET Developer',
    startDate: '2019-01-01',
    endDate: '2021-11-01',
    areas: [
      {
        title: 'Produkt',
        responsibilities: [
          'Współtworzenie i rozwój systemu ERP — nowe funkcjonalności i wsparcie użytkowników biznesowych',
        ],
      },
      {
        title: 'Desktop',
        responsibilities: [
          'Projektowanie, rozwój i utrzymanie aplikacji desktopowych WPF / .NET Core w architekturze MVVM',
          'Dynamiczne i responsywne interfejsy w XAML',
          'Aplikacja WinForms pozwalająca publikować i zarządzać własnymi usługami REST/SOAP przez interfejs graficzny',
        ],
      },
      {
        title: 'Integracje',
        responsibilities: [
          'Integracja z usługami REST/SOAP',
          'Integracja z systemami zewnętrznymi (PayU, Pyszne.pl, UberEats)',
        ],
      },
      { title: 'Dane', responsibilities: ['SQL Server — optymalizacja zapytań, migracje, utrzymanie'] },
      { title: 'Web', responsibilities: ['Wsparcie przy budowie aplikacji webowych w ASP.NET MVC i .NET Core'] },
      {
        title: 'Jakość',
        responsibilities: [
          'Testy jednostkowe i integracyjne, utrzymanie stabilności aplikacji',
          'Code review i spójność kodu wg standardów zespołu',
          'Analiza, diagnoza i rozwiązywanie zgłoszeń od użytkowników i zespołu QA',
        ],
      },
      {
        title: 'Zespół',
        responsibilities: [
          'Udział w planowaniu sprintów, estymacji i projektowaniu rozwiązań technicznych',
          'Tworzenie dokumentacji technicznej',
        ],
      },
    ],
    technologies: [
      T.csharp,
      T.wpf,
      tech('MVVM', 'Devicon', 'dot-net'),
      tech('XAML', 'Devicon', 'dot-net'),
      T.winforms,
      tech('ASP.NET MVC', 'Devicon', 'dot-net'),
      tech('.NET Core', 'Devicon', 'dotnetcore'),
      T.sqlServer,
      T.restApi,
      T.soap,
    ],
  },
  {
    employer: 'GECOS',
    position: 'Programista C#/SQL',
    startDate: '2018-09-01',
    endDate: '2019-01-01',
    areas: [
      { title: 'Produkt', responsibilities: ['Tworzenie dodatków i aplikacji dla systemu Comarch CDN XL'] },
      {
        title: 'Klienci',
        responsibilities: [
          'Wsparcie programistyczne dla klientów korzystających z systemów Comarch — rozwój funkcjonalności i rozwiązywanie problemów',
        ],
      },
      {
        title: 'Integracje',
        responsibilities: [
          'Integracja aplikacji z istniejącymi modułami systemu Comarch i dopasowanie ich do wymagań biznesowych klienta',
        ],
      },
      { title: 'Jakość', responsibilities: ['Analiza zgłoszeń użytkowników, diagnoza i naprawa błędów systemu'] },
      {
        title: 'Dokumentacja',
        responsibilities: ['Tworzenie i aktualizacja dokumentacji technicznej oraz instrukcji użytkownika'],
      },
    ],
    technologies: [
      T.csharp,
      tech('SQL', 'Devicon', 'microsoftsqlserver'),
      tech('Comarch CDN XL', 'Devicon', 'dot-net'),
    ],
  },
  {
    employer: 'Moje Bambino',
    position: 'Specjalista ds. analiz',
    startDate: '2016-09-01',
    endDate: '2018-09-01',
    areas: [
      {
        title: 'Raportowanie',
        responsibilities: ['Tworzenie raportów sprzedażowych w Excelu z użyciem zapytań SQL i procedur składowanych'],
      },
      {
        title: 'Aplikacje',
        responsibilities: [
          'Projektowanie i rozwój aplikacji wspierających wycenę produktów i tworzenie katalogów sprzedażowych',
        ],
      },
      {
        title: 'Dane',
        responsibilities: [
          'Integracja danych z różnych źródeł, aby zespoły sprzedaży miały spójne i aktualne informacje',
        ],
      },
      {
        title: 'Analiza',
        responsibilities: ['Analiza potrzeb biznesowych i dopasowanie aplikacji oraz raportów do wymagań klienta'],
      },
      {
        title: 'Wydajność',
        responsibilities: ['Optymalizacja zapytań SQL i struktur baz danych dla szybszego generowania raportów'],
      },
    ],
    technologies: [
      tech('SQL', 'Devicon', 'microsoftsqlserver'),
      tech('T-SQL', 'Devicon', 'microsoftsqlserver'),
      tech('Excel', 'Devicon', 'dot-net'),
    ],
  },
]

export const mockExperiencesEn: Experience[] = [
  {
    employer: 'B3 Consulting Poland',
    position: '.NET Developer',
    startDate: '2021-11-01',
    endDate: '2026-03-31',
    areas: [
      {
        title: 'Backend and cloud',
        responsibilities: [
          'Building and maintaining web applications in .NET (backend and frontend)',
          'Building and maintaining applications in the Microsoft Azure cloud',
        ],
      },
      {
        title: 'Data',
        responsibilities: [
          'SQL Server / Oracle DB / MongoDB — maintaining and developing database structures (tables, indexes, relations)',
          'Query optimization',
        ],
      },
      {
        title: 'Integrations',
        responsibilities: [
          'Integration with external systems and communication between services',
          'Asynchronous communication (RabbitMQ / MassTransit)',
        ],
      },
      {
        title: 'DevOps',
        responsibilities: ['Configuring and maintaining CI/CD pipelines in Azure DevOps (build, tests, deployments)'],
      },
      {
        title: 'Quality',
        responsibilities: [
          'Unit and integration tests',
          'Code review and maintaining code quality and consistency according to agreed standards',
          'Analysis, diagnosis and resolution of issues reported by users and the QA team',
        ],
      },
      {
        title: 'Team',
        responsibilities: [
          'Participating in sprint planning, task estimation and technical solution design',
          'Writing technical documentation (C4 model)',
        ],
      },
    ],
    technologies: [
      T.csharp,
      T.dotnet,
      T.azure,
      T.sqlServer,
      tech('Oracle DB', 'Devicon', 'oracle'),
      T.mongodb,
      T.rabbitmq,
      T.masstransit,
      T.azureDevOps,
      tech('C4', 'Devicon', 'dot-net'),
    ],
  },
  {
    employer: 'LSI Software',
    position: '.NET Developer',
    startDate: '2019-01-01',
    endDate: '2021-11-01',
    areas: [
      {
        title: 'Product',
        responsibilities: ['Co-developing an ERP system — new features and support for business users'],
      },
      {
        title: 'Desktop',
        responsibilities: [
          'Designing, developing and maintaining WPF / .NET Core desktop applications using the MVVM architecture',
          'Dynamic and responsive interfaces in XAML',
          'A WinForms application for publishing and managing custom REST/SOAP services through a graphical interface',
        ],
      },
      {
        title: 'Integrations',
        responsibilities: [
          'Integration with REST/SOAP services',
          'Integration with external systems (PayU, Pyszne.pl, UberEats)',
        ],
      },
      { title: 'Data', responsibilities: ['SQL Server — query optimization, migrations, maintenance'] },
      { title: 'Web', responsibilities: ['Support in building web applications in ASP.NET MVC and .NET Core'] },
      {
        title: 'Quality',
        responsibilities: [
          'Unit and integration tests, keeping applications stable',
          'Code review and code consistency according to team standards',
          'Analysis, diagnosis and resolution of issues reported by users and the QA team',
        ],
      },
      {
        title: 'Team',
        responsibilities: [
          'Participating in sprint planning, estimation and technical solution design',
          'Writing technical documentation',
        ],
      },
    ],
    technologies: [
      T.csharp,
      T.wpf,
      tech('MVVM', 'Devicon', 'dot-net'),
      tech('XAML', 'Devicon', 'dot-net'),
      T.winforms,
      tech('ASP.NET MVC', 'Devicon', 'dot-net'),
      tech('.NET Core', 'Devicon', 'dotnetcore'),
      T.sqlServer,
      T.restApi,
      T.soap,
    ],
  },
  {
    employer: 'GECOS',
    position: 'C#/SQL Programmer',
    startDate: '2018-09-01',
    endDate: '2019-01-01',
    areas: [
      { title: 'Product', responsibilities: ['Building add-ons and applications for the Comarch CDN XL system'] },
      {
        title: 'Clients',
        responsibilities: [
          'Development support for clients using Comarch systems — feature development and problem solving',
        ],
      },
      {
        title: 'Integrations',
        responsibilities: [
          "Integrating applications with existing Comarch system modules and adapting them to the client's business requirements",
        ],
      },
      { title: 'Quality', responsibilities: ['Analysis of user reports, diagnosis and fixing of system bugs'] },
      { title: 'Documentation', responsibilities: ['Creating and updating technical documentation and user manuals'] },
    ],
    technologies: [
      T.csharp,
      tech('SQL', 'Devicon', 'microsoftsqlserver'),
      tech('Comarch CDN XL', 'Devicon', 'dot-net'),
    ],
  },
  {
    employer: 'Moje Bambino',
    position: 'Analytics Specialist',
    startDate: '2016-09-01',
    endDate: '2018-09-01',
    areas: [
      {
        title: 'Reporting',
        responsibilities: ['Building sales reports in Excel using SQL queries and stored procedures'],
      },
      {
        title: 'Applications',
        responsibilities: [
          'Designing and developing applications supporting product pricing and sales catalog creation',
        ],
      },
      {
        title: 'Data',
        responsibilities: [
          'Integrating data from various sources so that sales teams have consistent and up-to-date information',
        ],
      },
      {
        title: 'Analysis',
        responsibilities: ['Analysis of business needs and adapting applications and reports to client requirements'],
      },
      {
        title: 'Performance',
        responsibilities: ['Optimizing SQL queries and database structures for faster report generation'],
      },
    ],
    technologies: [
      tech('SQL', 'Devicon', 'microsoftsqlserver'),
      tech('T-SQL', 'Devicon', 'microsoftsqlserver'),
      tech('Excel', 'Devicon', 'dot-net'),
    ],
  },
]

// ---------------------------------------------------------------------------
// Certificates — language-neutral (no Translation table for this aggregate)
// ---------------------------------------------------------------------------

export const mockCertificates: Certificate[] = [
  { name: 'Azure Developer Associate', issuer: 'Microsoft', issuedOn: '2022-01-01', code: 'AZ-204' },
  { name: 'MCSA: Web Applications', issuer: 'Microsoft', issuedOn: '2020-03-01', code: '70-483, 70-486' },
]

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

const ARCHITECTURE_NOTES_PL: ProjectArchitectureNote[] = [
  {
    title: 'Clean Architecture',
    text: 'Profile i Notifications mają własne projekty Contracts, Application, Domain, Persistence i Infrastructure. Kontrolery korzystają wyłącznie z kontraktów modułów (IProfileModule, INotificationsModule); host API rejestruje ich implementacje. Wspólne BuildingBlocks dostarczają podstawy techniczne.',
  },
  {
    title: 'CQRS z MediatR',
    text: 'Każdy odczyt to osobne zapytanie (np. GetExperiencesQuery, GetProjectsQuery) z własnym handlerem, a przygotowanie wiadomości obsługuje PrepareNotificationToSendCommand. Handlery działają przez repozytoria. Rozdział komend i zapytań nie oznacza osobnych baz danych.',
  },
  {
    title: 'DDD — model domeny i tłumaczenia',
    text: 'Agregaty (m.in. Profile, Project, Experience) dziedziczą po AggregateRoot<Guid>. Treści językowe leżą w osobnych tabelach tłumaczeń, a encja sama wybiera właściwe (GetTranslation) z powrotem do PL, gdy brakuje wersji. Interfejsy repozytoriów są w Domain, ich implementacje w Persistence.',
  },
  {
    title: 'Język i kontekst żądania',
    text: 'Język wybiera nagłówek Accept-Language — adresy API nie mają parametru języka. ICallerContext podaje język bieżącego żądania, a ICurrentTenant profil, którego dane są zwracane; handlery łączą jedno z drugim.',
  },
  {
    title: 'Zaplecze techniczne',
    text: 'API konfiguruje Hangfire z magazynem SQL Server, logowanie Serilog i limit żądań formularza kontaktowego. EF Core korzysta z osobnych kontekstów modułów, rejestrowanych ze wspólnym connection stringiem.',
  },
]

const ARCHITECTURE_NOTES_EN: ProjectArchitectureNote[] = [
  {
    title: 'Clean Architecture',
    text: 'Profile and Notifications each have their own Contracts, Application, Domain, Persistence and Infrastructure projects. Controllers depend only on the module contracts (IProfileModule, INotificationsModule); the API host registers their implementations. Shared BuildingBlocks provide the technical foundation.',
  },
  {
    title: 'CQRS with MediatR',
    text: 'Every read is its own query (e.g. GetExperiencesQuery, GetProjectsQuery) with a dedicated handler, and preparing a message is handled by PrepareNotificationToSendCommand. Handlers work through repositories. Separating commands and queries does not mean separate databases.',
  },
  {
    title: 'DDD — domain model and translations',
    text: 'Aggregates (among them Profile, Project and Experience) derive from AggregateRoot<Guid>. Language-specific content lives in separate translation tables, and the entity picks the right one itself (GetTranslation), falling back to PL when a version is missing. Repository interfaces live in Domain, their implementations in Persistence.',
  },
  {
    title: 'Language and request context',
    text: "The language comes from the Accept-Language header — API routes have no language parameter. ICallerContext supplies the current request's language and ICurrentTenant the profile whose data is returned; handlers combine the two.",
  },
  {
    title: 'Technical backbone',
    text: 'The API configures Hangfire with a SQL Server store, Serilog logging and a rate limit for the contact form requests. EF Core uses a separate context per module, registered with a shared connection string.',
  },
]

const ARCHITECTURE_BLOCKS_PL: ProjectArchitectureBlock[] = [
  {
    title: 'Portfolio.Web',
    note: 'React · TypeScript · Vite · TanStack Query',
    url: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio/Portfolio.Web',
    linkLabel: 'Otwórz Portfolio.Web na GitHubie',
  },
  {
    title: 'Portfolio.Api',
    note: 'ASP.NET Core · kontrolery · mapowanie DTO',
    url: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio/Portfolio.Api',
    linkLabel: 'Otwórz Portfolio.Api na GitHubie',
    connectionLabel: 'HTTP / JSON',
  },
  {
    title: 'Moduły',
    connectionLabel: 'IProfileModule / INotificationsModule',
    children: [
      { title: 'Profile', note: 'Treści portfolio i wersje językowe' },
      { title: 'Notifications', note: 'Przygotowanie wiadomości do wysyłki' },
    ],
  },
  { title: 'Application → Domain', note: 'MediatR · handlery zapytań i komend · model domenowy' },
  {
    title: 'Persistence → Application + Domain',
    note: 'EF Core · repozytoria · ProfileDbContext / NotificationDbContext',
  },
  { title: 'Infrastructure', note: 'Fasady modułów · rejestracja zależności · połączenie warstw' },
]

const ARCHITECTURE_BLOCKS_EN: ProjectArchitectureBlock[] = [
  {
    title: 'Portfolio.Web',
    note: 'React · TypeScript · Vite · TanStack Query',
    url: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio/Portfolio.Web',
    linkLabel: 'Open Portfolio.Web on GitHub',
  },
  {
    title: 'Portfolio.Api',
    note: 'ASP.NET Core · controllers · DTO mapping',
    url: 'https://github.com/WiktorWijata/Portfolio/tree/develop/Source/Portfolio/Portfolio.Api',
    linkLabel: 'Open Portfolio.Api on GitHub',
    connectionLabel: 'HTTP / JSON',
  },
  {
    title: 'Modules',
    connectionLabel: 'IProfileModule / INotificationsModule',
    children: [
      { title: 'Profile', note: 'Portfolio content and language versions' },
      { title: 'Notifications', note: 'Preparing messages for sending' },
    ],
  },
  { title: 'Application → Domain', note: 'MediatR · query and command handlers · domain model' },
  {
    title: 'Persistence → Application + Domain',
    note: 'EF Core · repositories · ProfileDbContext / NotificationDbContext',
  },
  { title: 'Infrastructure', note: 'Module facades · dependency registration · wiring the layers' },
]

const FILES_URL = 'https://files.wiktorwijata.com/projects/portfolio/'

const PROJECT_IMAGES_PL: ProjectImage[] = [
  {
    url: `${FILES_URL}desktop-about.webp`,
    alt: 'Strona „O mnie” w oknie w stylu IDE: explorer plików po lewej, treść strony po prawej',
  },
  {
    url: `${FILES_URL}desktop-experience.webp`,
    alt: 'Strona „Doświadczenie” z listą stanowisk i zakresem obowiązków',
  },
  {
    url: `${FILES_URL}mobile-about.webp`,
    alt: 'Portfolio na telefonie: nagłówek, treść strony i dolny pasek zakładek',
  },
]

const PROJECT_IMAGES_EN: ProjectImage[] = [
  {
    url: `${FILES_URL}desktop-about.webp`,
    alt: 'The About page in the IDE-style window: the file explorer on the left, the page on the right',
  },
  {
    url: `${FILES_URL}desktop-experience.webp`,
    alt: 'The Experience page with the list of positions and their responsibilities',
  },
  {
    url: `${FILES_URL}mobile-about.webp`,
    alt: 'The portfolio on a phone: the header, the page and the bottom tab bar',
  },
]

const INTEGRATORAI_NOTES_PL: ProjectArchitectureNote[] = [
  {
    title: 'Modularny monolit',
    text: 'Chat, Context i Providers mają własne projekty Contracts, Application, Domain, Persistence i Infrastructure. Moduły rozmawiają przez kontrakty, a host API rejestruje ich implementacje.',
  },
  {
    title: 'Strumieniowanie i narzędzia',
    text: 'Odpowiedź płynie jako Server-Sent Events. Model może poprosić o narzędzie (zdarzenie tool_call); klient wykonuje je i odsyła wynik, a rozmowa czekająca na wyniki odrzuca nowe pytanie kodem 409.',
  },
  {
    title: 'Wymienni dostawcy',
    text: 'Odpowiada dostawca z aktywnym wierszem w tabeli providers.Provider, zapamiętany w Redis. OpenRouter dostaje narzędzia natywnie, HuggingFace na razie je pomija.',
  },
  {
    title: 'Czat tego portfolio',
    text: 'Asystent na tej stronie korzysta z IntegratorAI: Portfolio.Api wysyła pytanie, odpowiedź płynie strumieniem do przeglądarki, a kontekst asystenta (rola, wiedza o portfolio, narzędzia) jest synchronizowany z IntegratorAI. Narzędzia wykonuje Portfolio.',
  },
  {
    title: 'Testy i obserwowalność',
    text: 'Każdy kontekst ma testy jednostkowe i integracyjne (xUnit, NSubstitute), a API ma instrumentację OpenTelemetry.',
  },
]

const INTEGRATORAI_BLOCKS_PL: ProjectArchitectureBlock[] = [
  {
    title: 'IntegratorAI.Api',
    note: 'ASP.NET Core · REST · SSE · Scalar',
    url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Integrator',
    linkLabel: 'Otwórz IntegratorAI.Api na GitHubie',
    connectionLabel: 'HTTP / SSE',
  },
  {
    title: 'Moduły',
    connectionLabel: 'kontrakty modułów',
    children: [
      {
        title: 'Chat',
        note: 'Rozmowy i strumieniowanie odpowiedzi',
        url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Chat',
        linkLabel: 'Otwórz Chat na GitHubie',
      },
      {
        title: 'Context',
        note: 'Rola, wiedza i narzędzia AI',
        url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Context',
        linkLabel: 'Otwórz Context na GitHubie',
      },
      {
        title: 'Providers',
        note: 'HuggingFace · OpenRouter',
        url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Providers',
        linkLabel: 'Otwórz Providers na GitHubie',
      },
    ],
  },
  {
    title: 'BuildingBlocks',
    note: 'Wspólne abstrakcje domeny, aplikacji i infrastruktury',
    url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/BuildingBlocks',
    linkLabel: 'Otwórz BuildingBlocks na GitHubie',
  },
  {
    title: 'Dane',
    note: 'SQL Server · Redis',
  },
]

const INTEGRATORAI_IMAGES_PL: ProjectImage[] = [
  {
    url: `${FILES_URL}integratorai/assistant-desktop.webp`,
    alt: 'Asystent na stronie portfolio odpowiada na pytanie; odpowiedź płynie z IntegratorAI',
  },
  { url: `${FILES_URL}integratorai/assistant-mobile.webp`, alt: 'Asystent portfolio na telefonie jako dolny panel' },
  {
    url: `${FILES_URL}integratorai/scalar-overview.webp`,
    alt: 'Dokumentacja API IntegratorAI w Scalar: lista endpointów rozmów i kontekstów',
  },
  {
    url: `${FILES_URL}integratorai/scalar-chat.webp`,
    alt: 'Szczegóły endpointu rozmowy ze strumieniowaniem odpowiedzi w dokumentacji Scalar',
  },
]

const INTEGRATORAI_NOTES_EN: ProjectArchitectureNote[] = [
  {
    title: 'Modular monolith',
    text: 'Chat, Context and Providers each have their own Contracts, Application, Domain, Persistence and Infrastructure projects. The modules talk through contracts and the API host registers their implementations.',
  },
  {
    title: 'Streaming and tools',
    text: 'The answer flows as Server-Sent Events. The model can ask for a tool (a tool_call event); the client runs it and sends the result back, and a conversation waiting for results rejects a new prompt with a 409.',
  },
  {
    title: 'Swappable providers',
    text: 'The provider with the active row in the providers.Provider table answers, cached in Redis. OpenRouter gets the tools natively; HuggingFace ignores them for now.',
  },
  {
    title: 'The chat of this portfolio',
    text: 'The assistant on this site runs on IntegratorAI: Portfolio.Api sends the question, the answer is streamed to the browser, and the assistant context (role, knowledge about the portfolio, tools) is synchronized with IntegratorAI. The tools are run by Portfolio.',
  },
  {
    title: 'Tests and observability',
    text: 'Every context has unit and integration tests (xUnit, NSubstitute), and the API is instrumented with OpenTelemetry.',
  },
]

const INTEGRATORAI_BLOCKS_EN: ProjectArchitectureBlock[] = [
  {
    title: 'IntegratorAI.Api',
    note: 'ASP.NET Core · REST · SSE · Scalar',
    url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Integrator',
    linkLabel: 'Open IntegratorAI.Api on GitHub',
    connectionLabel: 'HTTP / SSE',
  },
  {
    title: 'Modules',
    connectionLabel: 'module contracts',
    children: [
      {
        title: 'Chat',
        note: 'Conversations and streamed answers',
        url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Chat',
        linkLabel: 'Open Chat on GitHub',
      },
      {
        title: 'Context',
        note: 'AI role, knowledge and tools',
        url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Context',
        linkLabel: 'Open Context on GitHub',
      },
      {
        title: 'Providers',
        note: 'HuggingFace · OpenRouter',
        url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/Providers',
        linkLabel: 'Open Providers on GitHub',
      },
    ],
  },
  {
    title: 'BuildingBlocks',
    note: 'Shared domain, application and infrastructure abstractions',
    url: 'https://github.com/WiktorWijata/IntegratorAI/tree/develop/Source/BuildingBlocks',
    linkLabel: 'Open BuildingBlocks on GitHub',
  },
  {
    title: 'Data',
    note: 'SQL Server · Redis',
  },
]

const INTEGRATORAI_IMAGES_EN: ProjectImage[] = [
  {
    url: `${FILES_URL}integratorai/assistant-desktop.webp`,
    alt: 'The assistant on the portfolio site answering a question; the answer comes from IntegratorAI',
  },
  {
    url: `${FILES_URL}integratorai/assistant-mobile.webp`,
    alt: 'The portfolio assistant on a phone as a bottom sheet',
  },
  {
    url: `${FILES_URL}integratorai/scalar-overview.webp`,
    alt: 'The IntegratorAI API documentation in Scalar: the list of conversation and context endpoints',
  },
  {
    url: `${FILES_URL}integratorai/scalar-chat.webp`,
    alt: 'The details of the streaming conversation endpoint in the Scalar documentation',
  },
]

const INFRASTRUCTURE_NOTES_PL: ProjectArchitectureNote[] = [
  {
    title: 'Izolowane środowiska',
    text: 'Każde środowisko ma własną sieć Docker, instancję MSSQL i Redis. Jedna instancja bazy obsługuje wszystkie aplikacje środowiska, a każda aplikacja ma w niej własną bazę.',
  },
  {
    title: 'Konwencja dla aplikacji',
    text: 'Nowa aplikacja dodaje plik routing.caddy i skrypt init.sql; Caddy sam je wczytuje, więc nie trzeba edytować żadnego wspólnego pliku.',
  },
  {
    title: 'Wdrożenia z repozytoriów aplikacji',
    text: 'Infrastruktura dostarcza tylko wspólne zasoby: proxy, bazy, Redis i monitoring. Każda aplikacja wdraża się z własnego repozytorium.',
  },
  {
    title: 'Monitoring',
    text: 'Promtail zbiera logi kontenerów bez konfiguracji per aplikacja, Tempo przyjmuje ślady OTLP, a Grafana jest dostępna po zalogowaniu.',
  },
  {
    title: 'Serwer plików',
    text: 'Zdjęcia projektów, w tym te na tej stronie, serwuje Caddy jako statyczny serwer plików wspólny dla obu środowisk.',
  },
]

const INFRASTRUCTURE_BLOCKS_PL: ProjectArchitectureBlock[] = []

const INFRASTRUCTURE_IMAGES_PL: ProjectImage[] = [
  {
    url: `${FILES_URL}infrastructure/diagram.webp`,
    alt: 'Schemat infrastruktury: Caddy, środowiska dev i prod, monitoring i serwer plików',
  },
]

const INFRASTRUCTURE_NOTES_EN: ProjectArchitectureNote[] = [
  {
    title: 'Isolated environments',
    text: 'Every environment has its own Docker network, MSSQL instance and Redis. One database instance serves all the applications of an environment, and each application has its own database in it.',
  },
  {
    title: 'A convention for applications',
    text: 'A new application adds a routing.caddy file and an init.sql script; Caddy loads them by itself, so no shared file has to be edited.',
  },
  {
    title: 'Deployments from the application repositories',
    text: 'The infrastructure provides only the shared resources: the proxy, the databases, Redis and the monitoring. Each application deploys from its own repository.',
  },
  {
    title: 'Monitoring',
    text: 'Promtail collects the container logs with no per-application configuration, Tempo accepts OTLP traces, and Grafana is available after logging in.',
  },
  {
    title: 'File server',
    text: 'The project pictures, including the ones on this site, are served by Caddy as a static file server shared by both environments.',
  },
]

const INFRASTRUCTURE_BLOCKS_EN: ProjectArchitectureBlock[] = []

const INFRASTRUCTURE_IMAGES_EN: ProjectImage[] = [
  {
    url: `${FILES_URL}infrastructure/diagram.webp`,
    alt: 'The infrastructure diagram: Caddy, the dev and prod environments, the monitoring and the file server',
  },
]

export const mockProjectsPl: Project[] = [
  {
    name: 'Portfolio',
    description:
      'Strona wizytówka prezentująca moje umiejętności, doświadczenie oraz projekty. Treść na stronę zarządzana jest przez autorski CMS.',
    goal: 'Prezentacja doświadczenia i projektów oraz samodzielna aktualizacja treści portfolio.',
    solution: 'Interfejs w React i TypeScript połączony z backendem .NET i bazą MSSQL.',
    codeUrl: 'https://github.com/WiktorWijata/Portfolio',
    technologies: [T.csharp, T.dotnet, T.react, T.typescript, T.tailwind, T.sqlServer, T.docker, T.kubernetes],
    architectureNotes: ARCHITECTURE_NOTES_PL,
    architectureBlocks: ARCHITECTURE_BLOCKS_PL,
    images: PROJECT_IMAGES_PL,
    architectureCaption:
      'Uproszczony schemat komponentów. HTTP opisuje komunikację, strzałki między warstwami — zależności kodu.',
    architectureDiagramLabel:
      'React komunikuje się przez HTTP z Portfolio.Api. API udostępnia moduły Profile i Notifications przez ich kontrakty. Każdy moduł ma Application, Domain, Persistence oraz Infrastructure.',
  },
  {
    name: 'IntegratorAI',
    description:
      'Platforma integracji z modelami AI w .NET 10: REST API do rozmów z modelem ze strumieniowaniem odpowiedzi, konfigurowalne konteksty (rola, wiedza, narzędzia) i wymienni dostawcy modeli. Obsługuje czat asystenta na tej stronie.',
    goal: 'Jedno miejsce do rozmów z modelami AI: reużywalne konteksty, strumieniowanie odpowiedzi i możliwość zmiany dostawcy modelu bez zmian w logice biznesowej.',
    solution:
      'Modularny monolit w .NET 10 z kontekstami Chat, Context i Providers, MediatR, EF Core, cache w Redis i telemetrią OpenTelemetry; dostawcy HuggingFace i OpenRouter.',
    codeUrl: 'https://github.com/WiktorWijata/IntegratorAI',
    technologies: [
      tech('C#', 'Devicon', 'csharp'),
      tech('.NET', 'Devicon', 'dotnetcore'),
      tech('REST API', 'SimpleIcons', 'openapiinitiative'),
      tech('SQL Server', 'Devicon', 'microsoftsqlserver'),
      tech('Redis', 'Devicon', 'redis'),
      tech('HuggingFace', 'SimpleIcons', 'huggingface'),
      tech('OpenRouter API', 'SimpleIcons', 'openrouter'),
      tech('Scalar', 'SimpleIcons', 'openapiinitiative'),
      tech('xUnit', 'Devicon', 'dot-net'),
      tech('Docker', 'Devicon', 'docker'),
      tech('GitHub Actions', 'Devicon', 'githubactions'),
    ],
    architectureNotes: INTEGRATORAI_NOTES_PL,
    architectureBlocks: INTEGRATORAI_BLOCKS_PL,
    images: INTEGRATORAI_IMAGES_PL,
    architectureCaption:
      'Uproszczony schemat modułów. Strzałki między warstwami pokazują zależności kodu, etykiety — sposób komunikacji.',
    architectureDiagramLabel:
      'Diagram architektury IntegratorAI: klient wywołuje API, które korzysta z modułów Chat, Context i Providers, a te ze wspólnych BuildingBlocks i z danych.',
  },
  {
    name: 'Infrastructure',
    description:
      'Infrastruktura jako kod dla moich aplikacji na jednym VPS: izolowane środowiska dev i prod, wspólny reverse proxy, bazy danych i pełne monitorowanie, wdrażane workflowami GitHub Actions.',
    goal: 'Powtarzalne środowiska dla wszystkich projektów na jednym serwerze, w których nowa aplikacja wymaga tylko pliku routingu i skryptu bazy.',
    solution:
      'Caddy jako jeden reverse proxy, osobna sieć Docker, MSSQL i Redis dla każdego środowiska, stos Prometheus, Loki, Tempo i Grafana oraz reużywalne workflowy GitHub Actions.',
    technologies: [
      tech('Docker', 'Devicon', 'docker'),
      tech('GitHub Actions', 'Devicon', 'githubactions'),
      tech('SQL Server', 'Devicon', 'microsoftsqlserver'),
      tech('Redis', 'Devicon', 'redis'),
      tech('Grafana', 'Devicon', 'grafana'),
      tech('Caddy', 'SimpleIcons', 'caddy'),
      tech('Prometheus', 'SimpleIcons', 'prometheus'),
    ],
    architectureNotes: INFRASTRUCTURE_NOTES_PL,
    architectureBlocks: INFRASTRUCTURE_BLOCKS_PL,
    images: INFRASTRUCTURE_IMAGES_PL,
  },
]

export const mockProjectsEn: Project[] = [
  {
    name: 'Portfolio',
    description:
      'A portfolio website showcasing my skills, experience, and projects. The site content is managed by a custom CMS.',
    goal: 'Presenting my experience and projects, and updating the portfolio content myself.',
    solution: 'A React and TypeScript interface connected to a .NET backend and an MSSQL database.',
    codeUrl: 'https://github.com/WiktorWijata/Portfolio',
    technologies: [T.csharp, T.dotnet, T.react, T.typescript, T.tailwind, T.sqlServer, T.docker, T.kubernetes],
    architectureNotes: ARCHITECTURE_NOTES_EN,
    architectureBlocks: ARCHITECTURE_BLOCKS_EN,
    images: PROJECT_IMAGES_EN,
    architectureCaption:
      'A simplified component diagram. HTTP describes communication; arrows between layers show code dependencies.',
    architectureDiagramLabel:
      'React communicates over HTTP with Portfolio.Api. The API exposes the Profile and Notifications modules through their contracts. Each module has Application, Domain, Persistence and Infrastructure layers.',
  },
  {
    name: 'IntegratorAI',
    description:
      'An AI integration platform in .NET 10: a REST API for conversations with a model with streamed answers, configurable contexts (role, knowledge, tools) and swappable model providers. It runs the assistant chat on this site.',
    goal: 'One place for conversations with AI models: reusable contexts, streamed answers and the ability to change the model provider without touching the business logic.',
    solution:
      'A modular monolith in .NET 10 with the Chat, Context and Providers contexts, MediatR, EF Core, a Redis cache and OpenTelemetry; HuggingFace and OpenRouter as providers.',
    codeUrl: 'https://github.com/WiktorWijata/IntegratorAI',
    technologies: [
      tech('C#', 'Devicon', 'csharp'),
      tech('.NET', 'Devicon', 'dotnetcore'),
      tech('REST API', 'SimpleIcons', 'openapiinitiative'),
      tech('SQL Server', 'Devicon', 'microsoftsqlserver'),
      tech('Redis', 'Devicon', 'redis'),
      tech('HuggingFace', 'SimpleIcons', 'huggingface'),
      tech('OpenRouter API', 'SimpleIcons', 'openrouter'),
      tech('Scalar', 'SimpleIcons', 'openapiinitiative'),
      tech('xUnit', 'Devicon', 'dot-net'),
      tech('Docker', 'Devicon', 'docker'),
      tech('GitHub Actions', 'Devicon', 'githubactions'),
    ],
    architectureNotes: INTEGRATORAI_NOTES_EN,
    architectureBlocks: INTEGRATORAI_BLOCKS_EN,
    images: INTEGRATORAI_IMAGES_EN,
    architectureCaption:
      'A simplified module diagram. Arrows between layers show code dependencies; labels describe how they communicate.',
    architectureDiagramLabel:
      'IntegratorAI architecture diagram: a client calls the API, which uses the Chat, Context and Providers modules, and these use the shared BuildingBlocks and the data stores.',
  },
  {
    name: 'Infrastructure',
    description:
      'Infrastructure as code for my applications on a single VPS: isolated dev and prod environments, a shared reverse proxy, databases and full monitoring, deployed with GitHub Actions workflows.',
    goal: 'Repeatable environments for all projects on one server, where a new application needs only a routing file and a database script.',
    solution:
      'Caddy as the single reverse proxy, a separate Docker network, MSSQL and Redis for every environment, a Prometheus, Loki, Tempo and Grafana stack, and reusable GitHub Actions workflows.',
    technologies: [
      tech('Docker', 'Devicon', 'docker'),
      tech('GitHub Actions', 'Devicon', 'githubactions'),
      tech('SQL Server', 'Devicon', 'microsoftsqlserver'),
      tech('Redis', 'Devicon', 'redis'),
      tech('Grafana', 'Devicon', 'grafana'),
      tech('Caddy', 'SimpleIcons', 'caddy'),
      tech('Prometheus', 'SimpleIcons', 'prometheus'),
    ],
    architectureNotes: INFRASTRUCTURE_NOTES_EN,
    architectureBlocks: INFRASTRUCTURE_BLOCKS_EN,
    images: INFRASTRUCTURE_IMAGES_EN,
  },
]

// ---------------------------------------------------------------------------
// Contacts & Business — language-neutral
// ---------------------------------------------------------------------------

export const mockContacts: Contact[] = [
  { type: 'Email', value: 'wiktorwijata@gmail.com' },
  { type: 'LinkedIn', value: 'https://www.linkedin.com/in/wiktor-wijata-a72082149/' },
  { type: 'GitHub', value: 'https://github.com/WiktorWijata' },
]

export const mockBusiness: Business = {
  name: 'Rescuepc Software Wiktor Wijata',
  taxNumber: '7681831348',
  registrationNumber: '385601617',
  street: 'ul. Norwida 3 lok. 46',
  postalCode: '26-300',
  city: 'Opoczno',
  region: 'łódzkie',
}

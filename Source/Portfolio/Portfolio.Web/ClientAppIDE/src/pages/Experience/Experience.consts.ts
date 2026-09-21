import type { Position } from './Experience.types'

export const EXPERIENCE_KICKER = 'Ścieżka zawodowa'
export const EXPERIENCE_TITLE = 'Doświadczenie'
export const EXPERIENCE_TITLE_ACCENT = 'z realnych systemów.'
export const EXPERIENCE_TEXT =
  'Aplikacje biznesowe, integracje i rozwój oprogramowania w ekosystemie Microsoft. Wybierz stanowisko, aby zobaczyć zakres obowiązków.'

export const POSITIONS_HEADER = 'Stanowiska'

/** Positions, newest first (later served by the API). */
export const POSITIONS: Position[] = [
  {
    id: 'b3',
    period: '2021.11 — obecnie',
    role: '.NET Developer',
    company: 'B3 Consulting Poland',
    groups: [
      {
        title: 'Backend i chmura',
        items: [
          'Tworzenie i utrzymanie aplikacji webowych w technologii .NET (backend i frontend)',
          'Tworzenie i utrzymanie aplikacji w środowisku chmurowym Microsoft Azure',
        ],
      },
      {
        title: 'Dane',
        items: [
          'SQL Server / Oracle DB / MongoDB — utrzymanie i rozwój struktur baz (tabele, indeksy, relacje)',
          'Optymalizacja zapytań',
        ],
      },
      {
        title: 'Integracje',
        items: [
          'Integracja z systemami zewnętrznymi i komunikacja między usługami',
          'Komunikacja asynchroniczna (RabbitMQ / MassTransit)',
        ],
      },
      {
        title: 'DevOps',
        items: ['Konfiguracja i utrzymanie pipeline’ów CI/CD w Azure DevOps (build, testy, wdrożenia)'],
      },
      {
        title: 'Jakość',
        items: [
          'Testy jednostkowe i integracyjne',
          'Code review oraz utrzymanie jakości i spójności kodu wg przyjętych standardów',
          'Analiza, diagnoza i rozwiązywanie zgłoszeń od użytkowników i zespołu QA',
        ],
      },
      {
        title: 'Zespół',
        items: [
          'Udział w planowaniu sprintów, estymacji zadań i projektowaniu rozwiązań technicznych',
          'Tworzenie dokumentacji technicznej (model C4)',
        ],
      },
    ],
    technologies: [
      'C#',
      '.NET',
      'Azure',
      'SQL Server',
      'Oracle DB',
      'MongoDB',
      'RabbitMQ',
      'MassTransit',
      'Azure DevOps',
      'C4',
    ],
  },
  {
    id: 'lsi',
    period: '2019.01 — 2021.11',
    role: '.NET Developer',
    company: 'LSI Software',
    groups: [
      {
        title: 'Produkt',
        items: ['Współtworzenie i rozwój systemu ERP — nowe funkcjonalności i wsparcie użytkowników biznesowych'],
      },
      {
        title: 'Desktop',
        items: [
          'Projektowanie, rozwój i utrzymanie aplikacji desktopowych WPF / .NET Core w architekturze MVVM',
          'Dynamiczne i responsywne interfejsy w XAML',
          'Aplikacja WinForms pozwalająca publikować i zarządzać własnymi usługami REST/SOAP przez interfejs graficzny',
        ],
      },
      {
        title: 'Integracje',
        items: ['Integracja z usługami REST/SOAP', 'Integracja z systemami zewnętrznymi (PayU, Pyszne.pl, UberEats)'],
      },
      { title: 'Dane', items: ['SQL Server — optymalizacja zapytań, migracje, utrzymanie'] },
      { title: 'Web', items: ['Wsparcie przy budowie aplikacji webowych w ASP.NET MVC i .NET Core'] },
      {
        title: 'Jakość',
        items: [
          'Testy jednostkowe i integracyjne, utrzymanie stabilności aplikacji',
          'Code review i spójność kodu wg standardów zespołu',
          'Analiza, diagnoza i rozwiązywanie zgłoszeń od użytkowników i zespołu QA',
        ],
      },
      {
        title: 'Zespół',
        items: [
          'Udział w planowaniu sprintów, estymacji i projektowaniu rozwiązań technicznych',
          'Tworzenie dokumentacji technicznej',
        ],
      },
    ],
    technologies: ['C#', 'WPF', 'MVVM', 'XAML', 'WinForms', 'ASP.NET MVC', '.NET Core', 'SQL Server', 'REST/SOAP'],
  },
  {
    id: 'gecos',
    period: '2018.09 — 2019.01',
    role: 'Programista C#/SQL',
    company: 'GECOS',
    groups: [
      { title: 'Produkt', items: ['Tworzenie dodatków i aplikacji dla systemu Comarch CDN XL'] },
      {
        title: 'Klienci',
        items: [
          'Wsparcie programistyczne dla klientów korzystających z systemów Comarch — rozwój funkcjonalności i rozwiązywanie problemów',
        ],
      },
      {
        title: 'Integracje',
        items: [
          'Integracja aplikacji z istniejącymi modułami systemu Comarch i dopasowanie ich do wymagań biznesowych klienta',
        ],
      },
      { title: 'Jakość', items: ['Analiza zgłoszeń użytkowników, diagnoza i naprawa błędów systemu'] },
      {
        title: 'Dokumentacja',
        items: ['Tworzenie i aktualizacja dokumentacji technicznej oraz instrukcji użytkownika'],
      },
    ],
    technologies: ['C#', 'SQL', 'Comarch CDN XL'],
  },
  {
    id: 'bambino',
    period: '2016.09 — 2018.09',
    role: 'Specjalista ds. analiz',
    company: 'Moje Bambino',
    groups: [
      {
        title: 'Raportowanie',
        items: ['Tworzenie raportów sprzedażowych w Excelu z użyciem zapytań SQL i procedur składowanych'],
      },
      {
        title: 'Aplikacje',
        items: ['Projektowanie i rozwój aplikacji wspierających wycenę produktów i tworzenie katalogów sprzedażowych'],
      },
      {
        title: 'Dane',
        items: ['Integracja danych z różnych źródeł, aby zespoły sprzedaży miały spójne i aktualne informacje'],
      },
      {
        title: 'Analiza',
        items: ['Analiza potrzeb biznesowych i dopasowanie aplikacji oraz raportów do wymagań klienta'],
      },
      {
        title: 'Wydajność',
        items: ['Optymalizacja zapytań SQL i struktur baz danych dla szybszego generowania raportów'],
      },
    ],
    technologies: ['SQL', 'T-SQL', 'Excel'],
  },
]

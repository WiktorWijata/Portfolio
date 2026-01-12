export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
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

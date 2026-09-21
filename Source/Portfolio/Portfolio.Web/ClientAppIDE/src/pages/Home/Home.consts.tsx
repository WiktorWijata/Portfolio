import { CodeXml, Network, RefreshCw, Workflow } from 'lucide-react'
import type { HomeCareerItem, HomeCertificate, HomeLayer, HomeMetric, HomeService } from './Home.types'

export const HOME_KICKER = 'Wiktor Wijata / .NET Developer'
export const HOME_TITLE_LEAD = 'Łączę systemy.'
export const HOME_TITLE_ACCENT = 'Rozwiązuję problemy.'
export const HOME_TEXT =
  'Tworzę i rozwijam aplikacje w ekosystemie .NET — od backendu i API po rozwiązania webowe i desktopowe. Łączę systemy biznesowe, pracuję z bazami danych i projektuję komunikację między usługami. Ważne są dla mnie zrozumienie problemu, czytelny kod i architektura, która ułatwia dalszy rozwój. Pomagam zarówno przy nowych projektach, jak i przy utrzymaniu oraz modernizacji istniejących aplikacji.'
export const HOME_PROJECTS_LABEL = 'Zobacz projekty ↗'
export const HOME_CV_LABEL = 'Pobierz CV ↓'

export const HOME_SERVICES_TITLE = 'W czym mogę pomóc'
export const HOME_SERVICES: HomeService[] = [
  { icon: <CodeXml />, title: 'Rozwój aplikacji .NET', text: 'Nowe funkcje i utrzymanie istniejących systemów.' },
  { icon: <Workflow />, title: 'Integracje systemów', text: 'API, komunikacja asynchroniczna i wymiana danych.' },
  { icon: <RefreshCw />, title: 'Modernizacja rozwiązań', text: 'Usprawnianie starszych aplikacji i rozwój w Azure.' },
  {
    icon: <Network />,
    title: 'Projektowanie architektury',
    text: 'Dobór komponentów, podział odpowiedzialności i komunikacja między usługami. Dokumentacja w modelu C4.',
  },
]

export const HOME_LAYERS_TITLE = 'Co buduję / warstwy systemu'
export const HOME_LAYERS_LABEL = 'Warstwy systemów, które buduję'
export const HOME_LAYERS: HomeLayer[] = [
  {
    tag: 'UI',
    title: 'Aplikacje biznesowe',
    subtitle: 'Web i desktop dla użytkowników wewnętrznych',
    chips: ['React', 'Blazor', 'WPF', 'WinForms'],
  },
  {
    tag: 'API',
    title: 'Backend i usługi',
    subtitle: 'Logika domenowa, kontrakty, autoryzacja',
    chips: ['.NET', 'REST', 'gRPC', 'SOAP', 'WCF'],
  },
  {
    tag: 'MSG',
    title: 'Integracje',
    subtitle: 'Komunikacja z systemami zewnętrznymi',
    chips: ['RabbitMQ', 'MassTransit'],
  },
  { tag: 'DB', title: 'Dane', subtitle: 'Modele, migracje, optymalizacja zapytań', chips: ['SQL Server', 'MongoDB'] },
  {
    tag: 'OPS',
    title: 'Wdrożenia i utrzymanie',
    subtitle: "Pipeline'y, monitoring, chmura",
    chips: ['Azure', 'Azure DevOps', 'GitHub Actions', 'Docker', 'Kubernetes'],
  },
]

export const HOME_METRICS: HomeMetric[] = [
  { value: '7+', label: 'lat doświadczenia' },
  { value: '4', label: 'firmy i zespoły' },
]
/** The third metric: "∞" with a caption that can be flipped through. */
export const HOME_INFINITY_LABEL = 'Nieskończoność'
export const HOME_INFINITY_PHRASES = [
  'pomysłów do zrealizowania',
  'powodów, by się rozwijać',
  'nowych wyzwań do podjęcia',
]
export const HOME_INFINITY_CONTROLS_LABEL = 'Wybierz hasło'
export const HOME_INFINITY_PREVIOUS_LABEL = 'Poprzednie hasło'
export const HOME_INFINITY_NEXT_LABEL = 'Następne hasło'

export const HOME_CAREER_TITLE = 'Ścieżka w skrócie'
export const HOME_CAREER_ACTION = 'Otwórz →'
export const HOME_CAREER: HomeCareerItem[] = [
  { title: '.NET Developer', company: 'B3 Consulting Poland', period: '2021.11 — obecnie' },
  { title: '.NET Developer', company: 'LSI Software', period: '2019.01 — 2021.11' },
  { title: 'Programista C#/SQL', company: 'GECOS', period: '2018.09 — 2019.01' },
]

export const HOME_CERTIFICATES_TITLE = 'Certyfikaty'
export const HOME_CERTIFICATES: HomeCertificate[] = [
  { name: 'Azure Developer Associate', issuer: 'Microsoft' },
  { name: 'MCSA: Web Applications', issuer: 'Microsoft' },
]

export const HOME_TECH_TITLE = 'Kluczowe technologie'
export const HOME_TECH_ACTION = 'Otwórz Stack →'
export const HOME_TECH = ['C#', '.NET', 'Azure', 'SQL Server', 'MongoDB', 'RabbitMQ', 'Azure DevOps', 'WPF']

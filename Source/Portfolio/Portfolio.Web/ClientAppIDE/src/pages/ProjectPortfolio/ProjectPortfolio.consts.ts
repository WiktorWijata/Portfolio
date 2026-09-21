import {
  ArchitectureBlockKind,
  type ArchitectureBlock,
  type ArchitectureNote,
  type ProjectAction,
} from './ProjectPortfolio.types'

const REPOSITORY_URL = 'https://github.com/WiktorWijata/Portfolio'
const REPOSITORY_COMMIT = 'b88ee03'

export const PROJECT_KICKER = 'Projects / Portfolio.cs'
export const PROJECT_TITLE = 'Portfolio'

export const GALLERY_LABEL = 'Galeria projektu Portfolio'
export const GALLERY_SLIDES = [
  { alt: 'Widok aplikacji — zdjęcie 1' },
  { alt: 'Widok aplikacji — zdjęcie 2' },
  { alt: 'Widok aplikacji — zdjęcie 3' },
]

export const GOAL_HEADING = 'O PROJEKCIE / ZAŁOŻENIA'
export const GOAL_INTRO_TITLE = 'Cel projektu'
export const GOAL_INTRO_TEXT = 'Prezentacja doświadczenia i projektów oraz samodzielna aktualizacja treści portfolio.'
export const GOAL_SOLUTION_TITLE = 'Rozwiązanie'
export const GOAL_SOLUTION_TEXT = 'Interfejs w React i TypeScript połączony z backendem .NET i bazą MSSQL.'
export const GOAL_STACK_TITLE = 'Technologie'
export const GOAL_STACK = ['C#', '.NET', 'React', 'TypeScript', 'MSSQL', 'Docker', 'Kubernetes']
export const GOAL_ACTIONS: ProjectAction[] = [{ label: 'Repozytorium ↗', href: REPOSITORY_URL }]

export const ARCHITECTURE_HEADING = 'ARCHITEKTURA / MODULARNY MONOLIT'
export const ARCHITECTURE_LABEL = 'Architektura projektu'
export const ARCHITECTURE_DIAGRAM_LABEL =
  'React komunikuje się przez HTTP z Portfolio.Api. API udostępnia moduły Content i Notifications przez ich kontrakty. Każdy moduł ma Application, Domain, Persistence oraz Infrastructure.'
export const ARCHITECTURE_CAPTION =
  'Uproszczony schemat komponentów. HTTP opisuje komunikację, strzałki między warstwami — zależności kodu.'
export const ARCHITECTURE_SOURCE_LABEL = 'Na podstawie kodu'
export const ARCHITECTURE_SOURCE_LINK = {
  label: `Portfolio · ${REPOSITORY_COMMIT} ↗`,
  href: `${REPOSITORY_URL}/tree/${REPOSITORY_COMMIT}`,
}

export const ARCHITECTURE_BLOCKS: ArchitectureBlock[] = [
  {
    kind: ArchitectureBlockKind.Layer,
    title: 'Portfolio.Web',
    note: 'React · TypeScript · Vite · TanStack Query',
    href: `${REPOSITORY_URL}/tree/develop/Source/Portfolio/Portfolio.Web`,
    linkLabel: 'Otwórz Portfolio.Web na GitHubie',
  },
  { kind: ArchitectureBlockKind.Arrow, text: '↓ HTTP / JSON' },
  {
    kind: ArchitectureBlockKind.Layer,
    title: 'Portfolio.Api',
    note: 'ASP.NET Core · kontrolery · mapowanie DTO',
    href: `${REPOSITORY_URL}/tree/develop/Source/Portfolio/Portfolio.Api`,
    linkLabel: 'Otwórz Portfolio.Api na GitHubie',
  },
  { kind: ArchitectureBlockKind.Arrow, text: '↓ IContentModule / INotificationsModule' },
  {
    kind: ArchitectureBlockKind.Modules,
    modules: [
      { title: 'Content', note: 'Treści portfolio i wersje językowe' },
      { title: 'Notifications', note: 'Przygotowanie wiadomości do wysyłki' },
    ],
  },
  {
    kind: ArchitectureBlockKind.Layer,
    title: 'Application → Domain',
    note: 'MediatR · query / command handlers · model domenowy',
  },
  {
    kind: ArchitectureBlockKind.Layer,
    title: 'Persistence → Application + Domain',
    note: 'EF Core · repozytoria · ContentDbContext / NotificationDbContext',
  },
  {
    kind: ArchitectureBlockKind.Layer,
    title: 'Infrastructure',
    note: 'Fasady modułów · rejestracja zależności · połączenie warstw',
  },
]

export const ARCHITECTURE_NOTES: ArchitectureNote[] = [
  {
    title: 'Clean Architecture',
    text: 'Content i Notifications mają własne projekty Contracts, Application, Domain, Persistence i Infrastructure. Kontrolery korzystają z kontraktów modułów; host API rejestruje ich implementacje. Wspólne BuildingBlocks dostarczają podstawy techniczne.',
  },
  {
    title: 'CQRS z MediatR',
    text: 'Odczyt treści obsługuje GetContentByLanguageCodeQuery, a przygotowanie wiadomości — PrepareNotificationToSendCommand. Osobne handlery wykonują operacje przez repozytoria. Rozdział komend i zapytań nie oznacza osobnych baz danych.',
  },
  {
    title: 'DDD — konkretny model domeny',
    text: 'Content jest korzeniem agregatu AggregateRoot<Guid> i grupuje m.in. projekty, doświadczenie, umiejętności oraz dane językowe. Interfejsy repozytoriów znajdują się w Domain, ich implementacje w Persistence.',
  },
  {
    title: 'Zaplecze techniczne',
    text: 'API konfiguruje Hangfire z magazynem SQL Server, logowanie Serilog i limit żądań formularza kontaktowego. EF Core korzysta z osobnych kontekstów modułów, rejestrowanych ze wspólnym connection stringiem.',
  },
]

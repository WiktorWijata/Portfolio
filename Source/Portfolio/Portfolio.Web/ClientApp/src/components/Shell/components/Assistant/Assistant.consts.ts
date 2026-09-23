import { PageId } from '@/navigation'
import type { AssistantAnswer, AssistantRule } from './Assistant.types'

export const ASSISTANT_TITLE = 'Asystent portfolio'
export const ASSISTANT_SUBTITLE = 'Poznaj doświadczenie Wiktora'
export const ASSISTANT_PLACEHOLDER = 'O co chcesz zapytać?'
export const ASSISTANT_NOTE = 'Podgląd interakcji · odpowiedzi demonstracyjne, bez połączenia z AI.'
export const ASSISTANT_LAUNCHER_LABEL = 'Zapytaj o mnie'
export const ASSISTANT_ACTION_LABEL = 'Zobacz w portfolio →'
export const ASSISTANT_WELCOME =
  'Cześć! Pomogę Ci poznać doświadczenie, technologie i projekty Wiktora. Wybierz pytanie lub wpisz własne.\n\nTo podgląd czatu — na razie pokazuję przygotowane odpowiedzi.'
/** How many messages the transcript keeps (oldest drop off first), same idea as the terminal's line limit. */
export const ASSISTANT_MAX_MESSAGES = 100

export const ASSISTANT_TOPICS = [
  'Jakie ma doświadczenie?',
  'W jakich technologiach pracuje?',
  'Opowiedz o projekcie Portfolio',
  'Jak nawiązać współpracę?',
]

/** Checked in order — the first matching rule answers. */
export const ASSISTANT_RULES: AssistantRule[] = [
  {
    pattern: /współprac|kontakt|staw|dostępn|zatrudn/,
    text: 'W sprawie współpracy, dostępności i warunków najlepiej skontaktować się bezpośrednio z Wiktorem. W portfolio znajdziesz formularz kontaktowy i dane kontaktowe.',
    page: PageId.Contact,
  },
  {
    pattern: /projekt|portfolio|architekt|cqrs|ddd/,
    text: 'Projekt Portfolio łączy frontend React i TypeScript z backendem .NET. Backend ma moduły Content i Notifications, wydzielone warstwy oraz komendy i zapytania obsługiwane przez MediatR. Opis projektu zawiera diagram architektury i link do kodu.',
    page: PageId.Projects,
  },
  {
    pattern: /technolog|stack|react|azure|docker|sql|język/,
    text: 'Główny obszar pracy Wiktora to .NET i C#, aplikacje biznesowe, bazy danych oraz integracje systemów. Portfolio przedstawia również doświadczenie z interfejsami webowymi i desktopowymi. Szczegółową listę znajdziesz w Stack.',
    page: PageId.Stack,
  },
  {
    pattern: /doświadcze|pracow|karier|robił|zawod/,
    text: 'Wiktor rozwija aplikacje .NET, integruje systemy i pracuje z bazami danych. W jego doświadczeniu są B3 Consulting Poland, LSI Software, GECOS i Moje Bambino. Sekcja Doświadczenie opisuje obowiązki, narzędzia i obszary pracy w poszczególnych firmach.',
    page: PageId.Experience,
  },
]

export const ASSISTANT_FALLBACK: AssistantAnswer = {
  text: 'W tym podglądzie mogę pokazać informacje o doświadczeniu, technologiach, projekcie Portfolio i kontakcie. Swobodne odpowiedzi na inne pytania będą dostępne po podłączeniu modelu AI.',
}

// Chat window position (px). It sits above the status bar and is lifted above a docked terminal.
export const CHAT_BOTTOM = 48
export const CHAT_BOTTOM_NARROW = 42
export const CHAT_NARROW_MAX_WIDTH = 600
export const CHAT_TERMINAL_GAP = 12
export const CHAT_MAX_HEIGHT = 580
export const CHAT_TOP_MARGIN = 16

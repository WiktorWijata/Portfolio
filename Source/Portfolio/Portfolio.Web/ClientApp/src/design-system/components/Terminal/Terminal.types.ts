import type { HTMLAttributes, ReactNode } from 'react'

export const TerminalLineKind = {
  /** Zwykły wynik komendy. */
  Output: 'output',
  /** Echo wpisanej komendy (kolor liliowy). */
  Command: 'command',
  /** Komunikat błędu (kolor pomarańczowy). */
  Error: 'error',
} as const
export type TerminalLineKind = (typeof TerminalLineKind)[keyof typeof TerminalLineKind]

export interface TerminalLine {
  /** Unikalny identyfikator linii (klucz listy). */
  id: string | number
  /**
   * Rodzaj linii — decyduje o kolorze.
   * @default TerminalLineKind.Output
   */
  kind?: TerminalLineKind
  /** Treść linii. Nowe linie i spacje są zachowane. */
  content: ReactNode
}

/** Teksty interfejsu terminala (nazwy dostępne i podpis) — do podmiany np. przy zmianie języka. */
export interface TerminalLabels {
  /** Słowo w nagłówku panelu, po znaku zachęty `>_`. */
  title: string
  /** Dostępna nazwa i podpowiedź przycisku zamykania. */
  closeButton: string
  /** Dostępna nazwa uchwytu zmiany wysokości panelu. */
  resizeHandle: string
  /** Dostępna nazwa pola komendy. */
  commandInput: string
}

export interface TerminalProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Dostępna nazwa panelu terminala. */
  'aria-label': string
  /** Linie wyświetlane w logu — stan trzyma aplikacja. */
  lines: TerminalLine[]
  /** Klikalne chipy z komendami pod logiem; kliknięcie uruchamia komendę. */
  suggestions?: string[]
  /**
   * Kandydaci do uzupełniania klawiszem Tab po wpisanym prefiksie (cyklicznie, kolejnymi naciśnięciami).
   * Gdy prefiks nie pasuje do żadnego, Tab (i zawsze Shift+Tab) przenosi fokus jak zwykle — nie jest przechwytywany.
   */
  completions?: string[]
  /**
   * Prompt przed polem komendy.
   * @default 'visitor@portfolio:~$'
   */
  prompt?: string
  /**
   * Przygaszony podpis po słowie „Terminal" w nagłówku.
   * @default '/ portfolio'
   */
  subtitle?: string
  /**
   * Teksty interfejsu; pominięte pola mają polskie wartości domyślne („Terminal", „Zamknij terminal",
   * „Zmień wysokość terminala", „Komenda terminala").
   */
  labels?: Partial<TerminalLabels>
  /** Wywoływane z przyciętą, niepustą komendą — aplikacja ją interpretuje i dopisuje linie. */
  onCommand: (command: string) => void
  /** Wywoływane przez krzyżyk i klawisz Esc. */
  onClose: () => void
  /**
   * Początkowa wysokość panelu w px (zmienna przeciąganiem; od 130 px do 55% wysokości okna).
   * @default 220
   */
  defaultHeight?: number
  /**
   * Czy panel jest widoczny. `false` ukrywa go (`hidden`), ale zachowuje historię komend, wysokość
   * i wpisany tekst; po ponownym otwarciu wyjście przewija się na dół, a fokus trafia na prompt.
   * Przy pierwszym renderowaniu fokus nie jest przejmowany.
   * @default true
   */
  open?: boolean
}

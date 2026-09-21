import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export interface StatusBarProps extends HTMLAttributes<HTMLElement> {
  /** Dostępna nazwa paska, np. „Pasek statusu". */
  'aria-label': string
  /** Elementy paska: `StatusBarItem`, `StatusBarButton`, `StatusBarDivider`, `StatusBarSpacer`, `StatusBarSwitch`. */
  children: ReactNode
}

export const StatusBarTone = {
  /** Kolor pomocniczy — ścieżka pliku, meta-informacje. */
  Default: 'default',
  /** Zielony — nazwa gałęzi. */
  Success: 'success',
  /** Bardzo przygaszony — wersja aplikacji. */
  Faint: 'faint',
} as const
export type StatusBarTone = (typeof StatusBarTone)[keyof typeof StatusBarTone]

export interface StatusBarItemProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * Kolor tekstu.
   * @default StatusBarTone.Default
   */
  tone?: StatusBarTone
  /**
   * Przycina zbyt długi tekst wielokropkiem i pozwala elementowi się zwężać (np. ścieżka pliku).
   * Bez tego element nie zmniejsza się i nie zawija.
   * @default false
   */
  truncate?: boolean
  /** Treść elementu. */
  children: ReactNode
}

export const StatusBarAccent = {
  /** Zielony — np. otwarty terminal. */
  Success: 'success',
  /** Pomarańczowy — kolor asystenta. */
  Assistant: 'assistant',
} as const
export type StatusBarAccent = (typeof StatusBarAccent)[keyof typeof StatusBarAccent]

export interface StatusBarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Adres. Z `href` element jest odnośnikiem `<a>` wyglądającym jak przycisk paska (np. link do dokumentacji);
   * bez niego — zwykłym `<button>`. Z `href` nie ma `expanded`.
   */
  href?: string
  /** Gdzie otworzyć odnośnik (tylko z `href`), np. `_blank`. */
  target?: string
  /** Relacja odnośnika (tylko z `href`), np. `noopener`. */
  rel?: string
  /** Ikona przed podpisem (renderowana w 13 px). */
  icon?: ReactNode
  /**
   * Stan przełączanego panelu. Gdy podany, ustawia `aria-expanded` i koloruje przycisk kolorem `accent`.
   * Pominięty — przycisk jest zwykłą akcją.
   */
  expanded?: boolean
  /**
   * Kolor przycisku, gdy `expanded` jest `true`.
   * @default StatusBarAccent.Success
   */
  accent?: StatusBarAccent
  /** Podpis przycisku. */
  children: ReactNode
}

export interface StatusBarSwitchOption<T extends string = string> {
  /** Wartość zwracana w `onChange`, np. `'pl'`. */
  value: T
  /** Widoczny podpis, np. „PL". */
  label: string
  /** Dostępna nazwa opcji, np. „Polski". Pominięta — używany jest `label`. */
  'aria-label'?: string
}

export interface StatusBarSwitchProps<T extends string = string> {
  /** Dostępna nazwa grupy, np. „Język". */
  'aria-label': string
  /** Dostępne opcje. */
  options: StatusBarSwitchOption<T>[]
  /** Aktualnie wybrana wartość. */
  value: T
  /** Wywoływane po kliknięciu opcji. */
  onChange: (value: T) => void
  /** Dodatkowe klasy CSS kontenera przełącznika. */
  className?: string
}

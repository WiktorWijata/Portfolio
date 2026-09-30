import type { HTMLAttributes, ReactNode } from 'react'

export const CardVariant = {
  /** Mała karta danych: pasek nagłówka z tłem, licznikiem i akcją (dawniej DataCard/InfoCard). */
  Compact: 'compact',
  /** Większa karta z lekkim nagłówkiem u góry — sam tekst, bez tła, licznika i akcji (Gallery, karta architektury). */
  Standard: 'standard',
  /** Wyróżniona karta: jak Standard, ale z gradientowym tłem i mocniejszym cieniem (karta O projekcie). */
  Hero: 'hero',
} as const
export type CardVariant = (typeof CardVariant)[keyof typeof CardVariant]

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Wygląd ramki i nagłówka.
   * @default CardVariant.Compact
   */
  variant?: CardVariant
  /** Tytuł nagłówka, np. „Ścieżka w skrócie" (wersaliki w `Compact`). Bez niego karta nie ma nagłówka. */
  title?: ReactNode
  /** Ikona przed tytułem (`Standard` i `Hero`); rozmiar dopasowuje karta. */
  icon?: ReactNode
  /** Licznik w małej plakietce po tytule, np. liczba wierszy. Tylko `Compact`. */
  count?: number | string
  /** Element po prawej stronie paska, zwykle `CardAction` („Otwórz →"). Tylko `Compact`. */
  action?: ReactNode
  /** Zawartość karty pod nagłówkiem: `CardList`, `CardFields`, chipy, obraz itp. */
  children: ReactNode
}

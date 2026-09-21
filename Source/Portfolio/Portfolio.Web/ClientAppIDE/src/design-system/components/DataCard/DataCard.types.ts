import type { HTMLAttributes, ReactNode } from 'react'

export interface DataCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Tytuł paska nagłówka; wyświetlany dużymi literami, np. „Ścieżka w skrócie". */
  title: ReactNode
  /** Licznik w małej plakietce po tytule, np. liczba wierszy. */
  count?: number | string
  /** Element po prawej stronie paska, zwykle `DataCardAction` („Otwórz →"). */
  action?: ReactNode
  /** Zawartość karty pod paskiem: `DataCardList`, chipy itp. */
  children: ReactNode
}

export interface DataCardActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Podpis akcji, np. „Otwórz →". */
  children: ReactNode
}

export interface DataCardListProps extends HTMLAttributes<HTMLUListElement> {
  /** Wiersze: `DataCardRow`. */
  children: ReactNode
}

export interface DataCardRowProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Główny tekst wiersza, np. stanowisko. */
  title: ReactNode
  /** Opcjonalny drugi wiersz pod tytułem, np. nazwa firmy. */
  subtitle?: ReactNode
  /** Opcjonalna plakietka po prawej, np. daty lub nazwa wystawcy certyfikatu. */
  tag?: ReactNode
}

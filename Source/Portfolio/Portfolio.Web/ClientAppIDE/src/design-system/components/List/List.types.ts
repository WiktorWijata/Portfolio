import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export const ListItemVariant = {
  /** Wiersz Experience: tytuł, opcjonalny podtytuł i treść po prawej. */
  Detail: 'detail',
  /** Wiersz filtra kategorii (Stack): jedna linia mono 12 px. W wąskim kontenerze (`@container` < 700 px) układa się w rząd. */
  Filter: 'filter',
} as const
export type ListItemVariant = (typeof ListItemVariant)[keyof typeof ListItemVariant]

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  /** Etykieta paska nagłówka, np. „Stanowiska" (Experience) albo „Kategorie" (Stack). */
  header?: ReactNode
  /** Licznik obok nagłówka, np. liczba elementów. */
  count?: number | string
  /**
   * Pokazuje własny wiersz wyszukiwania między nagłówkiem a elementami
   * (płaska, bezramkowa szukajka ze Stack). To prywatny element List — nie jest
   * publicznym `SearchField` i nie da się go użyć poza listą.
   * @default false
   */
  searchable?: boolean
  /** Atrybuty przekazywane do pola wyszukiwania (bez `type`): `placeholder`, `value`, `onChange` itd. */
  searchProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
  /** Elementy `ListItem`. */
  children: ReactNode
}

export interface ListItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /**
   * Wygląd wiersza. `Filter` nie obsługuje `subtitle` ani `trailing`.
   * @default ListItemVariant.Detail
   */
  variant?: ListItemVariant
  /**
   * Zaznaczony element: akcentowy pasek z lewej, jaśniejsze tło, większy lewy padding.
   * @default false
   */
  active?: boolean
  /** Główny tekst wiersza, np. nazwa firmy. */
  title: ReactNode
  /** Druga linia pod tytułem, np. rola — w stanie aktywnym przyjmuje kolor akcentu. */
  subtitle?: ReactNode
  /** Ramkowana etykieta po prawej, np. zakres dat; zmienia wygląd razem z wierszem (hover i stan aktywny). */
  tag?: ReactNode
  /** Dowolna treść wyrównana do końca wiersza, np. `Badge`. */
  trailing?: ReactNode
}

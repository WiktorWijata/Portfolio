import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export const ListItemVariant = {
  /** Wiersz Experience: tytuł, opcjonalny podtytuł i treść po prawej. */
  Detail: 'detail',
  /** Wiersz filtra kategorii (Stack): jedna linia mono 12 px. W wąskim kontenerze (`@container` < 700 px) układa się w rząd. */
  Filter: 'filter',
} as const

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

export type { ListItemProps } from './components/ListItem'

export type ListItemVariant = (typeof ListItemVariant)[keyof typeof ListItemVariant]

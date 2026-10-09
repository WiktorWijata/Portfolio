import type { HTMLAttributes, ReactNode } from 'react'

export interface ArchitectureBlock {
  /** Nazwa warstwy lub modułu, np. „Portfolio.Api". */
  title: string
  /** Krótki opis pod tytułem, np. „ASP.NET Core · kontrolery". */
  note?: string
  /** Adres, do którego prowadzi ikona przy tytule (np. folder w repozytorium). */
  href?: string
  /** Etykieta dostępności ikony linku; bez niej ikona nie jest opisana. */
  linkLabel?: string
  /** Opis połączenia z poprzednim blokiem, np. „HTTP / JSON"; pokazywany przy strzałce nad tym blokiem. */
  connectionLabel?: string
  /** Bloki podrzędne: blok z dziećmi jest rzędem wyróżnionych kafelków zamiast pojedynczej warstwy. */
  children?: ArchitectureBlock[]
}

export interface ArchitectureDiagramProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Warstwy od góry do dołu; strzałki między nimi rysuje komponent. */
  blocks: ArchitectureBlock[]
  /** Ikona linku bloku (np. GitHub); komponent nie zna ikon aplikacji. */
  linkIcon?: ReactNode
}

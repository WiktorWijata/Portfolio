import type { ReactNode } from 'react'

export interface GallerySlide {
  /** Adres obrazu. Bez niego slajd pokazuje placeholder „Miejsce na zdjęcie". */
  src?: string
  /** Tekst alternatywny obrazu; służy też jako klucz slajdu, więc powinien być unikalny. */
  alt: string
}

/** Teksty interfejsu galerii (nazwy dostępne i placeholder) — do podmiany np. przy zmianie języka. */
export interface GalleryLabels {
  /** Opis roli galerii dla czytników ekranu (`aria-roledescription`). */
  carousel: string
  /** Dostępna nazwa przycisku „poprzedni slajd". */
  previous: string
  /** Dostępna nazwa przycisku „następny slajd". */
  next: string
  /** Dostępna nazwa grupy kropek wyboru slajdu. */
  slides: string
  /** Dostępna nazwa kropki slajdu o danym numerze (od 1). */
  slide: (number: number) => string
  /** Podpis placeholdera slajdu bez obrazu, dla slajdu o danym numerze (od 1). */
  placeholder: (number: number) => string
  /** Drugi wiersz placeholdera. */
  placeholderNote: string
}

export interface GalleryProps {
  /**
   * Nagłówek nad galerią.
   * @default 'GALERIA PROJEKTU'
   */
  heading?: ReactNode
  /**
   * Teksty interfejsu; brakujące pola mają polskie wartości domyślne („Poprzedni slajd", „Następny slajd",
   * „Wybierz slajd", „Pokaż slajd 2", „Miejsce na zdjęcie 1"…).
   */
  labels?: Partial<GalleryLabels>
  /** Lista slajdów. */
  slides: GallerySlide[]
  /** Indeks aktualnego slajdu (od 0) — komponent jest kontrolowany. */
  activeIndex: number
  /** Wywoływane przy zmianie slajdu strzałką, kropką albo klawiaturą (←/→); nawigacja zawija się na końcach. */
  onActiveIndexChange: (index: number) => void
  /** Dostępna nazwa karuzeli. */
  'aria-label': string
  /** Dodatkowe klasy głównego elementu. */
  className?: string
}

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

/** Teksty interfejsu explorera — do podmiany np. przy zmianie języka. */
export interface SolutionExplorerLabels {
  /** Tytuł w nagłówku panelu. */
  title: string
  /** Dostępna nazwa drzewa plików. */
  tree: string
}

export interface SolutionExplorerProps extends HTMLAttributes<HTMLElement> {
  /** Przyciski paska narzędzi w nagłówku, np. `IconButton`y „rozwiń/zwiń wszystko" i „ukryj explorer". */
  tools?: ReactNode
  /** Element pod nagłówkiem, np. `SearchField` do wyszukiwania plików. */
  search?: ReactNode
  /**
   * Pokazuje wąski pasek (tylko `collapsedContent`) zamiast pełnego explorera.
   * @default false
   */
  collapsed?: boolean
  /** Zawartość zwiniętego paska — zwykle jeden `IconButton` „pokaż explorer". */
  collapsedContent?: ReactNode
  /** Element przypięty do dołu explorera pod drzewem, np. karta „Otwarty na współpracę". */
  footer?: ReactNode
  /** Teksty interfejsu; brakujące pola mają wartości domyślne („Solution Explorer", „Pliki rozwiązania"). */
  labels?: Partial<SolutionExplorerLabels>
  /** Drzewo: `TreeFile` i `TreeFolder`. */
  children: ReactNode
}

export interface TreeFileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Głębokość zagnieżdżenia — 0 dla elementów na najwyższym poziomie.
   * @default 0
   */
  level?: number
  /**
   * Zaznaczony plik: tło i akcentowy pasek z lewej.
   * @default false
   */
  active?: boolean
  /** Znacznik typu pliku, np. kolorowe „C#" albo ikona SVG. */
  icon: ReactNode
  /** Nazwa pliku. */
  children: ReactNode
}

export interface TreeFolderProps {
  /**
   * Głębokość zagnieżdżenia — 0 dla elementów na najwyższym poziomie.
   * @default 0
   */
  level?: number
  /** Nazwa folderu. */
  label: ReactNode
  /** Ikona folderu. */
  icon: ReactNode
  /**
   * Początkowy stan otwarcia w trybie niekontrolowanym (bez `open`).
   * @default true
   */
  defaultOpen?: boolean
  /** Kontrolowany stan otwarcia — przekaż razem z `onToggle` (np. dla „rozwiń/zwiń wszystko"). */
  open?: boolean
  /** Wywoływane po kliknięciu chevrona z nowym stanem otwarcia. */
  onToggle?: (open: boolean) => void
  /**
   * Zaznaczony folder.
   * @default false
   */
  active?: boolean
  /** Wywoływane po kliknięciu samego wiersza (zaznaczenie) — chevron tylko rozwija i zwija. */
  onClick?: () => void
  /** Zawartość folderu: kolejne `TreeFile` i `TreeFolder`. */
  children: ReactNode
}

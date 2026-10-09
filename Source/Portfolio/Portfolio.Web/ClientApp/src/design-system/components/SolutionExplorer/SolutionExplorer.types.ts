import type { HTMLAttributes, ReactNode } from 'react'

/** Teksty interfejsu explorera — do podmiany np. przy zmianie języka. */
export interface SolutionExplorerLabels {
  /** Tytuł w nagłówku panelu. */
  title: string
  /** Dostępna nazwa drzewa plików. */
  tree: string
}

export interface SolutionExplorerProps extends HTMLAttributes<HTMLElement> {
  /** Przyciski paska narzędzi w nagłówku, np. `ToolbarButton`y „rozwiń/zwiń wszystko" i „ukryj explorer". */
  tools?: ReactNode
  /** Element pod nagłówkiem, np. `SearchField` do wyszukiwania plików. */
  search?: ReactNode
  /**
   * Pokazuje wąski pasek (tylko `collapsedContent`) zamiast pełnego explorera.
   * @default false
   */
  collapsed?: boolean
  /** Zawartość zwiniętego paska — zwykle jeden `ToolbarButton` „pokaż explorer". */
  collapsedContent?: ReactNode
  /** Element przypięty do dołu explorera pod drzewem, np. karta „Otwarty na współpracę". */
  footer?: ReactNode
  /** Teksty interfejsu; brakujące pola mają wartości domyślne („Solution Explorer", „Pliki rozwiązania"). */
  labels?: Partial<SolutionExplorerLabels>
  /** Drzewo: `TreeFile` i `TreeFolder`. */
  children: ReactNode
}

export type { TreeFileProps } from './components/TreeFile'

export type { TreeFolderProps } from './components/TreeFolder'

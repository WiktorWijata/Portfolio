import type { HTMLAttributes, ReactNode } from 'react'

export const SplitPanelCollapseAt = {
  /** Experience (`.xp`) zwija się poniżej 700 px. */
  Bp700: 'bp700',
  /** Stack (`.stack-panel`) zwija się poniżej 820 px. */
  Bp820: 'bp820',
  /**
   * Stack w prototypie zwija się według szerokości kontenera: poniżej 700 px szerokości
   * rodzica z klasą `@container`, a nie okna. Rodzic musi być kontenerem (`@container`).
   */
  Container700: 'container700',
} as const
export type SplitPanelCollapseAt = (typeof SplitPanelCollapseAt)[keyof typeof SplitPanelCollapseAt]

export interface SplitPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Lewa kolumna (lista nadrzędna), np. `List` ze stanowiskami albo kategoriami. */
  aside: ReactNode
  /** Zawartość prawej kolumny (szczegóły). */
  children: ReactNode
  /**
   * Punkt, poniżej którego panel zwija się do jednej kolumny (lista nad szczegółami).
   * @default SplitPanelCollapseAt.Bp700
   */
  collapseAt?: SplitPanelCollapseAt
}

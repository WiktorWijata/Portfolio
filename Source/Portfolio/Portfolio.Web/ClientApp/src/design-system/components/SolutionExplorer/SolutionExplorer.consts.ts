import type { SolutionExplorerLabels } from './SolutionExplorer.types'

export const DEFAULT_LABELS: SolutionExplorerLabels = {
  title: 'Solution Explorer',
  tree: 'Pliki rozwiązania',
}

// Rows aren't nested inside padded ancestor containers here (TreeFolder itself adds no
// indent) — each row encodes its own indent purely via padding-left, so a plain w-full
// already gives a full-width hover/active background without needing a margin/width
// compensation trick.
export const rowShape = 'box-border w-full rounded-none'

export interface GuideHighlightRect {
  /** Odległość od górnej krawędzi okna (px). */
  top: number
  /** Odległość od lewej krawędzi okna (px). */
  left: number
  /** Szerokość podświetlenia (px). */
  width: number
  /** Wysokość podświetlenia (px). */
  height: number
}

export type { GuideShadeProps } from './components/GuideShade'

export type { GuideHighlightProps } from './components/GuideHighlight'

export type { GuideCardLabels, GuideCardProps } from './components/GuideCard'

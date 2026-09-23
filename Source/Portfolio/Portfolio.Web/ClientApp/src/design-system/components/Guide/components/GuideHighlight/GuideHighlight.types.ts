import type { GuideHighlightRect } from '../../Guide.types'

export interface GuideHighlightProps {
  /** Prostokąt (w pikselach okna), który ma być podświetlony — zwykle z `getBoundingClientRect()`. */
  rect: GuideHighlightRect
  /** Dodatkowe klasy. */
  className?: string
}

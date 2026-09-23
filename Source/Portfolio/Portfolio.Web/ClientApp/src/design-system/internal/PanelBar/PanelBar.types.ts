import type { ReactNode } from 'react'

export interface PanelBarProps {
  /** Title of the bar; shown in capitals. */
  title: ReactNode
  /** Counter shown as a small badge after the title. */
  count?: number | string
  /** Element at the end of the bar, e.g. a text button. */
  action?: ReactNode
}

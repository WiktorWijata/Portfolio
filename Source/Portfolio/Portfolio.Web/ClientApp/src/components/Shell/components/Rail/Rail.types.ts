import type { ParseKeys } from 'i18next'
import type { ReactNode } from 'react'

/** How a page appears on the rail. Pages without an entry have no rail button. */
export interface RailPage {
  /** Vertical label under the icon. */
  label: string
  /** Translation key of the button's accessible name. */
  name: ParseKeys
  icon: ReactNode
  /** Pins the button to the bottom of the rail. */
  pinned?: boolean
}

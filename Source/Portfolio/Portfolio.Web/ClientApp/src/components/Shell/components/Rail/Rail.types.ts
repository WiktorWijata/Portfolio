import type { ReactNode } from 'react'

/** How a page appears on the rail. Pages without an entry have no rail button. */
export interface RailPage {
  /** Vertical label under the icon. */
  label: string
  /** Accessible name of the button. */
  name: string
  icon: ReactNode
  /** Pins the button to the bottom of the rail. */
  pinned?: boolean
}

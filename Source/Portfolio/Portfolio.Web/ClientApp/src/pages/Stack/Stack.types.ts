export interface Technology {
  name: string
  /** Address of the icon; without it (or when it fails to load) the chip shows the name only. */
  icon?: string
  /** A dark single-colour icon: it is inverted in themes with a dark surface (`--theme-icon-invert`). */
  monochrome?: boolean
}

export interface TechnologyGroup {
  id: string
  label: string
  technologies: Technology[]
}

/** The category filter: either every group (`ALL_CATEGORIES`) or the id of one group. */
export type StackCategory = string

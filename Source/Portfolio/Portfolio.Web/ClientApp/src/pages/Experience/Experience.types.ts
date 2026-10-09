export interface PositionGroup {
  /** Area of responsibility, e.g. "Backend i chmura". */
  title: string
  items: string[]
}

export interface Position {
  id: string
  /** Period, e.g. "2021.11 — obecnie". */
  period: string
  role: string
  company: string
  groups: PositionGroup[]
  technologies: string[]
}

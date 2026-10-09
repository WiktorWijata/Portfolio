export interface HomeMetric {
  value: string
  label: string
}

/** A career entry as shown in "Ścieżka w skrócie", derived from an Experience. */
export interface HomeCareerItem {
  title: string
  company: string
  period: string
}

import type { ReactNode } from 'react'

export interface HomeService {
  icon: ReactNode
  title: string
  text: string
}

/** One layer of the system diagram ("Co buduję / warstwy systemu"). */
export interface HomeLayer {
  /** Short tag in the box on the left, e.g. "UI", "API". */
  tag: string
  title: string
  subtitle: string
  chips: string[]
}

export interface HomeMetric {
  value: string
  label: string
}

export interface HomeCareerItem {
  title: string
  company: string
  period: string
}

export interface HomeCertificate {
  name: string
  issuer: string
}

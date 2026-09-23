export interface SocialLink {
  label: string
  /** Arrow shown after the label: ↗ opens another site, ↓ downloads a file. */
  arrow: string
  href: string
}

export interface CompanyField {
  label: string
  /** Lines of the value; more than one for an address. */
  lines: string[]
}

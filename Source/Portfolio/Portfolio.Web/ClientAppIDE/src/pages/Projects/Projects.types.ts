import type { PageId } from '@/navigation'

export interface ProjectSummary {
  id: string
  /** Page opened by the card (the project's own file in the solution). */
  page: PageId
  /** Small label above the title, e.g. "01 / APLIKACJA WEBOWA". */
  label: string
  title: string
  text: string
  image: { src: string; alt: string }
}

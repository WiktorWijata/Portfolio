import type { PageId } from '@/navigation'

/** One row of "Szybki dostęp". */
export interface QuickAccessItem {
  page: PageId
  /** Human label, e.g. "Wybrane projekty". */
  label: string
  /** Name of the file in the solution that the row opens, e.g. "Experience.cs". */
  file: string
}

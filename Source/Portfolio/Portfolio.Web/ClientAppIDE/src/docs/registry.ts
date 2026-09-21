import { dataEntries } from './demos/data'
import { formEntries } from './demos/forms'
import { generalEntries } from './demos/general'
import { layoutEntries } from './demos/layout'
import { navigationEntries } from './demos/navigation'
import { overlayEntries } from './demos/overlays'
import type { DocCategory, DocEntry } from './types'

export const categories: DocCategory[] = [
  { id: 'general', label: 'Ogólne' },
  { id: 'layout', label: 'Układ' },
  { id: 'navigation', label: 'Nawigacja' },
  { id: 'data', label: 'Prezentacja danych' },
  { id: 'forms', label: 'Formularze' },
  { id: 'overlays', label: 'Panele i nakładki' },
]

export const entries: DocEntry[] = [
  ...generalEntries,
  ...layoutEntries,
  ...navigationEntries,
  ...dataEntries,
  ...formEntries,
  ...overlayEntries,
]

export function entriesIn(categoryId: string) {
  return entries.filter((e) => e.category === categoryId)
}

export function findEntry(id: string) {
  return entries.find((e) => e.id === id)
}

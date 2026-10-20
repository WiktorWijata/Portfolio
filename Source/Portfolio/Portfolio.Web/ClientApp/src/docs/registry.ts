import { dataEntries } from './demos/data'
import { formEntries } from './demos/forms'
import { generalEntries } from './demos/general'
import { layoutEntries } from './demos/layout'
import { navigationEntries } from './demos/navigation'
import { overlayEntries } from './demos/overlays'
import type { CategoryId, DocCategory, DocEntry } from './types'

export const categories: DocCategory[] = [
  { id: 'general' },
  { id: 'layout' },
  { id: 'navigation' },
  { id: 'data' },
  { id: 'forms' },
  { id: 'overlays' },
]

export const entries: DocEntry[] = [
  ...generalEntries,
  ...layoutEntries,
  ...navigationEntries,
  ...dataEntries,
  ...formEntries,
  ...overlayEntries,
]

export function entriesIn(categoryId: CategoryId) {
  return entries.filter((e) => e.category === categoryId)
}

export function findEntry(id: string) {
  return entries.find((e) => e.id === id)
}

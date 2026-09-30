import type { ParseKeys } from 'i18next'
import { PageId } from '@/navigation'
import { EMPTY_EDITOR_KEYS } from './EmptyEditor.keys'

export const EMPTY_EDITOR_TITLE = 'WiktorWijata.Portfolio'
export const EMPTY_EDITOR_LOGO = '</>'

/**
 * Pages offered in "Quick access" and the translation key of the label shown for each. Their order is
 * not set here: the list follows the order of pages in the solution (the files in the Solution Explorer).
 */
export const QUICK_ACCESS_LABELS: Partial<Record<PageId, ParseKeys>> = {
  [PageId.Home]: EMPTY_EDITOR_KEYS.pages.home,
  [PageId.Projects]: EMPTY_EDITOR_KEYS.pages.projects,
  [PageId.Stack]: EMPTY_EDITOR_KEYS.pages.stack,
  [PageId.Experience]: EMPTY_EDITOR_KEYS.pages.experience,
  [PageId.Contact]: EMPTY_EDITOR_KEYS.pages.contact,
}

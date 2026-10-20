import { PageId } from '@/navigation'
import { MOBILE_DETAIL_PARENTS, MOBILE_TABS } from './MobileShell.consts'

/**
 * The page shown on a phone, its parent (for a detail page) and the tab that is highlighted. Pages with no
 * place in the tab bar (the guide, an empty editor) fall back to About.
 */
export function resolveMobilePage(active: PageId | null): { page: PageId; tab: PageId; parent?: PageId } {
  const parent = active ? MOBILE_DETAIL_PARENTS[active] : undefined
  if (active && parent) return { page: active, tab: parent, parent }
  const tab = MOBILE_TABS.find((item) => item.page === active)?.page ?? PageId.Home
  return { page: tab, tab }
}

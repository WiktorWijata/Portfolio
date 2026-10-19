import { Briefcase, FolderOpen, Layers, Mail, User } from 'lucide-react'
import { PageId } from '@/navigation'

/** Bottom tab bar of the phone layout, in display order. */
export const MOBILE_TABS = [
  { page: PageId.Home, icon: User },
  { page: PageId.Projects, icon: FolderOpen },
  { page: PageId.Experience, icon: Briefcase },
  { page: PageId.Stack, icon: Layers },
  { page: PageId.Contact, icon: Mail },
] as const

/** Pages on a phone that are not tabs: they open from a tab's page and keep that tab lit. */
export const MOBILE_DETAIL_PARENTS: Partial<Record<PageId, PageId>> = {
  [PageId.ProjectPortfolio]: PageId.Projects,
}

/** Height of the tab bar (px), without the device's bottom inset; the assistant launcher floats above it. */
export const MOBILE_TAB_BAR_HEIGHT = 62

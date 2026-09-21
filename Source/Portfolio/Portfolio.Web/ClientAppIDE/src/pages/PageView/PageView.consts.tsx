import type { ComponentType } from 'react'
import { Contact } from '../Contact'
import { Experience } from '../Experience'
import { GetStarted } from '../GetStarted'
import { Home } from '../Home'
import { ProjectPortfolio } from '../ProjectPortfolio'
import { Projects } from '../Projects'
import { Stack } from '../Stack'
import { PageId } from '@/navigation'

/** The page component for each PageId; the type makes the compiler demand an entry for every new page. */
export const PAGE_COMPONENTS: Record<PageId, ComponentType> = {
  [PageId.GetStarted]: GetStarted,
  [PageId.Home]: Home,
  [PageId.Projects]: Projects,
  [PageId.ProjectPortfolio]: ProjectPortfolio,
  [PageId.Stack]: Stack,
  [PageId.Experience]: Experience,
  [PageId.Contact]: Contact,
}

import type { ReactNode } from 'react'
import type { PageId } from '@/navigation'

export interface ProjectDetailProps {
  /** Shown across the top of the page instead of the gallery, for a project with a picture of its own to draw. */
  hero?: ReactNode
  /** The page being shown; its file name is the kicker ("Projects / Portfolio.cs"). */
  pageId: PageId
  /** Name of the project in the API; also the title of the page. */
  projectName: string
}

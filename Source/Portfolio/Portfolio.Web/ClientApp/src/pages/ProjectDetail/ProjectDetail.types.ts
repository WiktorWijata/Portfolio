import type { PageId } from '@/navigation'

export interface ProjectDetailProps {
  /** The page being shown; its file name is the kicker ("Projects / Portfolio.cs"). */
  pageId: PageId
  /** Name of the project in the API; also the title of the page. */
  projectName: string
}

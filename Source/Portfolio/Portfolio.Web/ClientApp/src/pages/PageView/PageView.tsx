import type { PageId } from '@/navigation'
import { PAGE_COMPONENTS } from './PageView.consts'

/** Renders the page for an id. */
export function PageView({ id }: { id: PageId }) {
  const Page = PAGE_COMPONENTS[id]
  return <Page />
}

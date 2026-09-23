import { pages } from './navigation.consts'
import { type PageId, type SolutionNode } from './navigation.types'

export function pageFromPath(pathname: string): PageId | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return Object.values(pages).find((page) => page.path === normalized)?.id ?? null
}

/** Pages of the solution in explorer order (depth-first, each page once). */
export function pagesInSolutionOrder(nodes: SolutionNode[]): PageId[] {
  const order: PageId[] = []
  const visit = (list: SolutionNode[]) => {
    for (const node of list) {
      if (!order.includes(node.page)) order.push(node.page)
      if (node.children) visit(node.children)
    }
  }
  visit(nodes)
  return order
}

/** First node of the solution (depth-first) that opens the page. */
export function findSolutionNode(nodes: SolutionNode[], page: PageId): SolutionNode | undefined {
  for (const node of nodes) {
    if (node.page === page) return node
    const inChildren = node.children && findSolutionNode(node.children, page)
    if (inChildren) return inChildren
  }
  return undefined
}

import type { SolutionNode } from '@/navigation'

/** True when the node, or any of its descendants, matches the (lower-cased) query. Empty query matches all. */
export function nodeMatches(node: SolutionNode, query: string): boolean {
  return (
    !query ||
    node.label.toLowerCase().includes(query) ||
    (node.children?.some((child) => nodeMatches(child, query)) ?? false)
  )
}

export function collectFolderIds(nodes: SolutionNode[]): string[] {
  return nodes.flatMap((node) => (node.children ? [node.id, ...collectFolderIds(node.children)] : []))
}

/** `{ [folderId]: open }` for every folder in the tree. */
export function allFolders(nodes: SolutionNode[], open: boolean): Record<string, boolean> {
  return Object.fromEntries(collectFolderIds(nodes).map((id) => [id, open]))
}

import type { SolutionNode } from '@/navigation'

export interface ExplorerTreeProps {
  nodes: SolutionNode[]
  /** Lower-cased search query; nodes that don't match (and have no matching descendants) are hidden. */
  query: string
  /** `{ [folderId]: open }`; folders missing from the map are open. */
  openFolders: Record<string, boolean>
  onToggleFolder: (id: string, open: boolean) => void
  /** Nesting depth, used for indentation. */
  level?: number
}

import { TreeFile, TreeFolder } from '@/design-system'
import { useEditor } from '@/context'
import { nodeMatches } from '../../utils'
import { NODE_ICONS } from '../../Explorer.consts'
import type { ExplorerTreeProps } from './ExplorerTree.types'

/** Recursive renderer of the explorer tree. A folder row selects its page; only the chevron toggles it. */
export function ExplorerTree({ nodes, query, openFolders, onToggleFolder, level = 0 }: ExplorerTreeProps) {
  const { activePage, openPage } = useEditor()

  return nodes.map((node) => {
    if (!nodeMatches(node, query)) return null

    if (!node.children) {
      return (
        <TreeFile
          key={node.id}
          level={level}
          icon={NODE_ICONS[node.kind]}
          active={node.page === activePage}
          onClick={() => openPage(node.page)}
        >
          {node.label}
        </TreeFile>
      )
    }

    return (
      <TreeFolder
        key={node.id}
        level={level}
        label={node.label}
        icon={NODE_ICONS[node.kind]}
        active={node.page === activePage}
        onClick={() => openPage(node.page)}
        open={openFolders[node.id] ?? true}
        onToggle={(open) => onToggleFolder(node.id, open)}
      >
        <ExplorerTree
          nodes={node.children}
          query={query}
          openFolders={openFolders}
          onToggleFolder={onToggleFolder}
          level={level + 1}
        />
      </TreeFolder>
    )
  })
}

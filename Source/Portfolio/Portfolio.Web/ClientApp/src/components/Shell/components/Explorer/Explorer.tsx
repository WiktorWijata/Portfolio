import { FoldVertical, ListTree, PanelLeftClose } from 'lucide-react'
import { useState } from 'react'
import {
  FontSize,
  ToolbarButton,
  ToolbarButtonSize,
  SearchField,
  SolutionExplorer,
  Text,
  TextColor,
} from '@/design-system'
import { useEditor, usePanels } from '@/context'
import { EXPLORER_HIDE_LABEL, TourTarget } from '../../Shell.consts'
import { ContactCard, ExplorerTree } from './components'
import {
  COLLAPSE_ALL_LABEL,
  EXPAND_ALL_LABEL,
  EXPLORER_LABEL,
  EXPLORER_NO_RESULTS,
  EXPLORER_SEARCH_LABEL,
  EXPLORER_SEARCH_PLACEHOLDER,
} from './Explorer.consts'
import { allFolders, nodeMatches } from './utils'

/** The Solution Explorer of the portfolio: every page is a "file" that opens as an editor tab. */
export function Explorer() {
  const { solution } = useEditor()
  const { setExplorerOpen } = usePanels()
  const [query, setQuery] = useState('')
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => allFolders(solution, true))
  const normalizedQuery = query.trim().toLowerCase()
  const hasResults = solution.some((node) => nodeMatches(node, normalizedQuery))

  return (
    <SolutionExplorer
      aria-label={EXPLORER_LABEL}
      data-tour={TourTarget.Explorer}
      className="min-h-0"
      tools={
        <>
          <ToolbarButton
            size={ToolbarButtonSize.Sm}
            icon={<ListTree />}
            aria-label={EXPAND_ALL_LABEL}
            onClick={() => setOpenFolders(allFolders(solution, true))}
          />
          <ToolbarButton
            size={ToolbarButtonSize.Sm}
            icon={<FoldVertical />}
            aria-label={COLLAPSE_ALL_LABEL}
            onClick={() => setOpenFolders(allFolders(solution, false))}
          />
          <ToolbarButton
            size={ToolbarButtonSize.Sm}
            icon={<PanelLeftClose />}
            aria-label={EXPLORER_HIDE_LABEL}
            onClick={() => setExplorerOpen(false)}
          />
        </>
      }
      search={
        <SearchField
          placeholder={EXPLORER_SEARCH_PLACEHOLDER}
          aria-label={EXPLORER_SEARCH_LABEL}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      }
      footer={<ContactCard />}
    >
      {hasResults ? (
        <ExplorerTree
          nodes={solution}
          query={normalizedQuery}
          openFolders={openFolders}
          onToggleFolder={(id, open) => setOpenFolders((prev) => ({ ...prev, [id]: open }))}
        />
      ) : (
        <Text as="p" size={FontSize.Small} color={TextColor.Faint} className="px-3 py-2">
          {EXPLORER_NO_RESULTS}
        </Text>
      )}
    </SolutionExplorer>
  )
}

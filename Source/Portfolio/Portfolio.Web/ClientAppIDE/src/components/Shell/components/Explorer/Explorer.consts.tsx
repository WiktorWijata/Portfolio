import { Boxes, FileText, FolderOpen } from 'lucide-react'
import type { ReactNode } from 'react'
import { SolutionNodeKind } from '@/navigation'

/** Icon of each kind of node in the solution tree. */
export const NODE_ICONS: Record<SolutionNodeKind, ReactNode> = {
  [SolutionNodeKind.Solution]: <Boxes className="size-4 text-accent" />,
  [SolutionNodeKind.Folder]: <FolderOpen className="size-4" />,
  [SolutionNodeKind.Markdown]: <FileText className="size-4 text-[#8eb5df]" />,
  [SolutionNodeKind.CSharp]: <span className="font-tree text-xs tracking-[-0.6px] text-file-cs">C#</span>,
}

export const EXPLORER_LABEL = 'Solution Explorer'
export const EXPAND_ALL_LABEL = 'Rozwiń wszystkie foldery'
export const COLLAPSE_ALL_LABEL = 'Zwiń wszystkie foldery'
export const EXPLORER_SEARCH_PLACEHOLDER = 'Szukaj plików…'
export const EXPLORER_SEARCH_LABEL = 'Szukaj plików w rozwiązaniu'
export const EXPLORER_NO_RESULTS = 'Brak plików pasujących do wyszukiwania.'

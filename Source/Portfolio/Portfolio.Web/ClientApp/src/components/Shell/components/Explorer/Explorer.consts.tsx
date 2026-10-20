import { Boxes, FileText, FolderOpen } from 'lucide-react'
import type { ReactNode } from 'react'
import { SolutionNodeKind } from '@/navigation'

/** Icon of each kind of node in the solution tree. */
export const NODE_ICONS: Record<SolutionNodeKind, ReactNode> = {
  [SolutionNodeKind.Solution]: <Boxes className="size-4 text-accent" />,
  [SolutionNodeKind.Folder]: <FolderOpen className="size-4" />,
  [SolutionNodeKind.Markdown]: <FileText className="size-4 text-filetype-markdown" />,
  [SolutionNodeKind.CSharp]: <span className="font-tree text-xs tracking-[-0.6px] text-filetype-cs">C#</span>,
}

export const EXPLORER_LABEL = 'Solution Explorer'

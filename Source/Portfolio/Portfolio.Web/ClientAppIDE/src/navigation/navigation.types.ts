/** Every "file" that can be opened in the editor area. */
export const PageId = {
  GetStarted: 'getstarted',
  Home: 'home',
  Projects: 'projects',
  ProjectPortfolio: 'project-portfolio',
  Stack: 'stack',
  Experience: 'experience',
  Contact: 'contact',
} as const
export type PageId = (typeof PageId)[keyof typeof PageId]

/** What a node of the solution tree is — decides its icon in the explorer. */
export const SolutionNodeKind = {
  Solution: 'solution',
  Folder: 'folder',
  Markdown: 'markdown',
  CSharp: 'csharp',
} as const
export type SolutionNodeKind = (typeof SolutionNodeKind)[keyof typeof SolutionNodeKind]

export interface PageMeta {
  id: PageId
  /** URL path the page lives under. */
  path: string
  /** Label of the editor tab. */
  tab: string
  /** File name shown in the status bar. */
  file: string
}

/**
 * Node of the solution tree — the list of "files" shown in the Solution Explorer. It is plain data
 * (no JSX) so it can come from the API later; it is the source of truth for the order of pages
 * in the explorer, the rail, the empty-editor shortcuts and the terminal command list.
 */
export interface SolutionNode {
  id: string
  label: string
  /** Decides the icon. */
  kind: SolutionNodeKind
  /** Page opened when the node is selected (folders open a page too). */
  page: PageId
  /** Present on folders (`.sln`, directories). */
  children?: SolutionNode[]
}

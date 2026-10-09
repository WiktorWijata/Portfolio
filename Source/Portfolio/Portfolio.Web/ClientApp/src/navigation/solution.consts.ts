import { PageId, SolutionNodeKind, type SolutionNode } from './navigation.types'

/**
 * The solution shown in the explorer: `.sln` opens "O mnie", `Projects` opens the projects page,
 * the rest are one file per page. Later this list is returned by the API.
 */
export const DEFAULT_SOLUTION: SolutionNode[] = [
  { id: 'getstarted', label: 'GetStarted.md', kind: SolutionNodeKind.Markdown, page: PageId.GetStarted },
  {
    id: 'sln',
    label: 'WiktorWijata.sln',
    kind: SolutionNodeKind.Solution,
    page: PageId.Home,
    children: [
      {
        id: 'projects',
        label: 'Projects',
        kind: SolutionNodeKind.Folder,
        page: PageId.Projects,
        children: [
          { id: 'portfolio', label: 'Portfolio.cs', kind: SolutionNodeKind.CSharp, page: PageId.ProjectPortfolio },
        ],
      },
      { id: 'stack', label: 'Stack.cs', kind: SolutionNodeKind.CSharp, page: PageId.Stack },
      { id: 'experience', label: 'Experience.cs', kind: SolutionNodeKind.CSharp, page: PageId.Experience },
      { id: 'contact', label: 'Contact.cs', kind: SolutionNodeKind.CSharp, page: PageId.Contact },
    ],
  },
]

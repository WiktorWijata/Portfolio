import { PageId, type PageMeta } from './navigation.types'

export const pages: Record<PageId, PageMeta> = {
  [PageId.GetStarted]: { id: PageId.GetStarted, path: '/getstarted', tab: 'GetStarted.md', file: 'GetStarted.md' },
  [PageId.Home]: { id: PageId.Home, path: '/about', tab: 'O mnie', file: 'AboutMe.cs' },
  [PageId.Projects]: { id: PageId.Projects, path: '/projects', tab: 'Projekty', file: 'Overview.cs' },
  [PageId.ProjectPortfolio]: {
    id: PageId.ProjectPortfolio,
    path: '/projects/portfolio',
    tab: 'Portfolio.cs',
    file: 'Portfolio.cs',
  },
  [PageId.Stack]: { id: PageId.Stack, path: '/stack', tab: 'Stack', file: 'Stack.cs' },
  [PageId.Experience]: { id: PageId.Experience, path: '/experience', tab: 'Doświadczenie', file: 'Experience.cs' },
  [PageId.Contact]: { id: PageId.Contact, path: '/contact', tab: 'Kontakt', file: 'Contact.cs' },
}

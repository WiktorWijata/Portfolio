import { PageId, type PageMeta } from './navigation.types'
import { NAV_KEYS } from './navigation.keys'

export const pages: Record<PageId, PageMeta> = {
  [PageId.GetStarted]: {
    id: PageId.GetStarted,
    path: '/getstarted',
    tab: NAV_KEYS.tabs.getStarted,
    file: 'GetStarted.md',
  },
  [PageId.Home]: { id: PageId.Home, path: '/about', tab: NAV_KEYS.tabs.home, file: 'AboutMe.cs' },
  [PageId.Projects]: { id: PageId.Projects, path: '/projects', tab: NAV_KEYS.tabs.projects, file: 'Overview.cs' },
  [PageId.ProjectPortfolio]: {
    id: PageId.ProjectPortfolio,
    path: '/projects/portfolio',
    tab: NAV_KEYS.tabs.projectPortfolio,
    file: 'Portfolio.cs',
  },
  [PageId.ProjectIntegratorAi]: {
    id: PageId.ProjectIntegratorAi,
    path: '/projects/integratorai',
    tab: NAV_KEYS.tabs.projectIntegratorAi,
    file: 'IntegratorAI.cs',
  },
  [PageId.ProjectInfrastructure]: {
    id: PageId.ProjectInfrastructure,
    path: '/projects/infrastructure',
    tab: NAV_KEYS.tabs.projectInfrastructure,
    file: 'Infrastructure.cs',
  },
  [PageId.Stack]: { id: PageId.Stack, path: '/stack', tab: NAV_KEYS.tabs.stack, file: 'Stack.cs' },
  [PageId.Experience]: {
    id: PageId.Experience,
    path: '/experience',
    tab: NAV_KEYS.tabs.experience,
    file: 'Experience.cs',
  },
  [PageId.Contact]: { id: PageId.Contact, path: '/contact', tab: NAV_KEYS.tabs.contact, file: 'Contact.cs' },
}

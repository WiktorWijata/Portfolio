import { PageId } from '@/navigation'
import { GuideActionKind, GuideImagePosition, type GuideIntroData, type GuideSectionData } from './GetStarted.types'
import { GET_STARTED_KEYS } from './GetStarted.keys'

export const GUIDE_INTRO: GuideIntroData = {
  id: 'gs-welcome',
  indexLabelKey: GET_STARTED_KEYS.intro.indexLabel,
  titleKey: GET_STARTED_KEYS.intro.title,
  textKey: GET_STARTED_KEYS.intro.text,
  action: { kind: GuideActionKind.OpenPage, page: PageId.Home, labelKey: GET_STARTED_KEYS.intro.action },
}

export const GUIDE_SECTIONS: GuideSectionData[] = [
  {
    id: 'portfolio',
    titleKey: GET_STARTED_KEYS.sections.portfolio,
    articles: [
      {
        id: 'gs-profile',
        indexLabelKey: GET_STARTED_KEYS.articles.profile.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.profile.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.profile.p1],
        image: {
          src: '/getstarted/home.png',
          altKey: GET_STARTED_KEYS.articles.profile.alt,
          position: GuideImagePosition.Top,
        },
        action: {
          kind: GuideActionKind.OpenPage,
          page: PageId.Home,
          labelKey: GET_STARTED_KEYS.articles.profile.action,
        },
      },
      {
        id: 'gs-projects',
        indexLabelKey: GET_STARTED_KEYS.articles.projects.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.projects.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.projects.p1],
        image: {
          src: '/getstarted/projects.png',
          altKey: GET_STARTED_KEYS.articles.projects.alt,
          position: GuideImagePosition.Top,
        },
        action: {
          kind: GuideActionKind.OpenPage,
          page: PageId.Projects,
          labelKey: GET_STARTED_KEYS.articles.projects.action,
        },
      },
      {
        id: 'gs-experience',
        indexLabelKey: GET_STARTED_KEYS.articles.experience.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.experience.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.experience.p1],
        image: {
          src: '/getstarted/experience.png',
          altKey: GET_STARTED_KEYS.articles.experience.alt,
          position: GuideImagePosition.Top,
        },
        action: {
          kind: GuideActionKind.OpenPage,
          page: PageId.Experience,
          labelKey: GET_STARTED_KEYS.articles.experience.action,
        },
      },
      {
        id: 'gs-contact',
        indexLabelKey: GET_STARTED_KEYS.articles.contact.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.contact.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.contact.p1],
        image: {
          src: '/getstarted/contact.png',
          altKey: GET_STARTED_KEYS.articles.contact.alt,
          position: GuideImagePosition.Top,
        },
        action: {
          kind: GuideActionKind.OpenPage,
          page: PageId.Contact,
          labelKey: GET_STARTED_KEYS.articles.contact.action,
        },
      },
    ],
  },
  {
    id: 'navigation',
    titleKey: GET_STARTED_KEYS.sections.navigation,
    articles: [
      {
        id: 'gs-explorer',
        indexLabelKey: GET_STARTED_KEYS.articles.explorer.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.explorer.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.explorer.p1],
        image: {
          src: '/getstarted/explorer.png',
          altKey: GET_STARTED_KEYS.articles.explorer.alt,
          position: GuideImagePosition.Top,
        },
      },
      {
        id: 'gs-tabs',
        indexLabelKey: GET_STARTED_KEYS.articles.tabs.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.tabs.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.tabs.p1],
        image: {
          src: '/getstarted/tabs.png',
          altKey: GET_STARTED_KEYS.articles.tabs.alt,
          position: GuideImagePosition.Center,
        },
      },
      {
        id: 'gs-start',
        indexLabelKey: GET_STARTED_KEYS.articles.start.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.start.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.start.p1],
        image: {
          src: '/getstarted/start.png',
          altKey: GET_STARTED_KEYS.articles.start.alt,
          position: GuideImagePosition.Top,
        },
      },
      {
        id: 'gs-terminal',
        indexLabelKey: GET_STARTED_KEYS.articles.terminal.indexLabel,
        titleKey: GET_STARTED_KEYS.articles.terminal.title,
        paragraphKeys: [GET_STARTED_KEYS.articles.terminal.p1, GET_STARTED_KEYS.articles.terminal.p2],
        image: {
          src: '/getstarted/terminal.png',
          altKey: GET_STARTED_KEYS.articles.terminal.alt,
          position: GuideImagePosition.Center,
          centerFrame: true,
        },
        action: { kind: GuideActionKind.OpenTerminal, labelKey: GET_STARTED_KEYS.articles.terminal.action },
      },
    ],
  },
]

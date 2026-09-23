import type { PageId } from '@/navigation'

export const GuideActionKind = {
  OpenPage: 'open-page',
  OpenTerminal: 'open-terminal',
} as const
export type GuideActionKind = (typeof GuideActionKind)[keyof typeof GuideActionKind]

export const GuideImagePosition = {
  Top: 'top',
  Center: 'center',
} as const
export type GuideImagePosition = (typeof GuideImagePosition)[keyof typeof GuideImagePosition]

/** Link under an article: opens a page, or the terminal. */
export type GuideAction = { label: string } & (
  { kind: typeof GuideActionKind.OpenPage; page: PageId } | { kind: typeof GuideActionKind.OpenTerminal }
)

export interface GuideImage {
  /** Path under `public/`. */
  src: string
  alt: string
  /** Which part of the screenshot stays visible when it is cropped to the frame. */
  position: GuideImagePosition
  /** Centres the frame vertically next to the text (used for the wide terminal screenshot). */
  centerFrame?: boolean
}

export interface GuideArticleData {
  /** DOM id — the target of the index item (`scrollIntoView`). */
  id: string
  /** Label in the index on the left. */
  indexLabel: string
  title: string
  /** Paragraphs; `text` in backticks is rendered as code. */
  paragraphs: string[]
  image: GuideImage
  action?: GuideAction
}

export interface GuideSectionData {
  id: string
  title: string
  articles: GuideArticleData[]
}

export interface GuideIntroData {
  id: string
  indexLabel: string
  title: string
  text: string
  action: GuideAction
}

import type { HTMLAttributes, ReactNode } from 'react'

/** Padding of the page content. */
export const PageContainerPadding = {
  /** Projects, Portfolio.cs, About, Stack, Experience: 36/31/31 px, tighter under 850 px and 570 px. */
  Content: 'content',
  /** Contact: 32 px, 18 px under 600 px. */
  Form: 'form',
  /** GetStarted: 22/20/30 px. */
  Article: 'article',
} as const
export type PageContainerPadding = (typeof PageContainerPadding)[keyof typeof PageContainerPadding]

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** @default PageContainerPadding.Content */
  padding?: PageContainerPadding
  children: ReactNode
}

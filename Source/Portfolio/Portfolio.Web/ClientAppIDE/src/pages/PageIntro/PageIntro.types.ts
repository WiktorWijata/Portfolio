/** Which page's heading block to reproduce; they differ slightly. */
export const PageIntroVariant = {
  /** Projekty and Portfolio.cs: title line height 1.15, colour #dfe1e5, accent on the last part. */
  Overview: 'overview',
  /** Stack and Experience: line height 1.04, colour #e6e7e9, no accent on the last part. */
  Section: 'section',
  /** Contact: like Section, with its own spacing (20px under the kicker, 12px under the title) and a lead that never wraps on wide screens. */
  Contact: 'contact',
} as const
export type PageIntroVariant = (typeof PageIntroVariant)[keyof typeof PageIntroVariant]

export interface PageIntroProps {
  /** Small uppercase label above the title, e.g. "Portfolio / Wybrane realizacje". */
  kicker: string
  /** First part of the title, in the normal text colour. */
  title: string
  /** Last part of the title; in the accent colour only in the `Overview` variant. Optional. */
  accent?: string
  /** Lead under the title. Optional; without it the block ends right under the title. */
  text?: string
  /** @default PageIntroVariant.Overview */
  variant?: PageIntroVariant
}

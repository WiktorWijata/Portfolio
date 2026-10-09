import type { ComponentType, ReactNode } from 'react'

export type CategoryId = 'general' | 'layout' | 'navigation' | 'data' | 'forms' | 'overlays'

export interface DocCategory {
  id: CategoryId
}

export interface DocEntry {
  id: string
  name: string
  category: CategoryId
  /** Small static preview for the overview card. */
  preview: ReactNode
  Demo: ComponentType
  /** Where the component lives and which of its types the API tables document, in order. */
  api: { folder: string; interfaces: string[] }
  /** Copy-pasteable usage example shown under the demo. */
  usage: string
}

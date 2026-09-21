import type { ComponentType, ReactNode } from 'react'

export interface DocCategory {
  id: string
  label: string
}

export interface DocEntry {
  id: string
  name: string
  category: DocCategory['id']
  /** One sentence for the overview card. */
  summary: string
  /** Technical note: what the demo was verified against in the prototype. */
  note?: string
  /** Small static preview for the overview card. */
  preview: ReactNode
  Demo: ComponentType
  /** Where the component lives and which of its types the API tables document, in order. */
  api: { folder: string; interfaces: string[] }
  /** Copy-pasteable usage example shown under the demo. */
  usage: string
}

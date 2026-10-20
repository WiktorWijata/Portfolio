import type { Texts } from '@/i18n/hooks/useTexts'
import type { DOCS_KEYS } from './Docs.keys'

interface EntryText {
  /** One sentence for the overview card. */
  summary: string
  /** Technical note: what the demo was verified against in the prototype. */
  note?: string
}

/** The translated summary (and note, when the entry has one) of a component entry. */
export function entryText(text: Texts<typeof DOCS_KEYS>, id: string): EntryText {
  return (text.entries as unknown as Record<string, EntryText>)[id] ?? { summary: '' }
}

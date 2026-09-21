import type { PageId } from '@/navigation'

/** Canned answer to a question matching `pattern`. Replaced by a real model later. */
export interface AssistantRule {
  /** Tested against the lower-cased (Polish locale) question. */
  pattern: RegExp
  text: string
  /** Page offered under the answer as "Zobacz w portfolio →". */
  page?: PageId
}

export interface AssistantAnswer {
  text: string
  page?: PageId
}

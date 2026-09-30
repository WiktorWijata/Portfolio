import type { PageId } from '@/navigation'

/** Which canned answer a rule gives: its translations live under `shell.assistant.rules.<key>`. Replaced by a real model later. */
export interface AssistantRuleConfig {
  key: 'contact' | 'project' | 'stack' | 'experience'
  /** Page offered under the answer as "See in the portfolio →". */
  page: PageId
}

export interface AssistantAnswer {
  text: string
  page?: PageId
}

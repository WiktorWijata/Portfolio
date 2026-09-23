import { ASSISTANT_FALLBACK, ASSISTANT_RULES } from '../Assistant.consts'
import type { AssistantAnswer } from '../Assistant.types'

/** Canned answer for a question: the first rule whose pattern matches, otherwise the fallback. */
export function getAnswer(question: string): AssistantAnswer {
  const text = question.toLocaleLowerCase('pl')
  const rule = ASSISTANT_RULES.find((r) => r.pattern.test(text))
  return rule ? { text: rule.text, page: rule.page } : ASSISTANT_FALLBACK
}

import type { TFunction } from 'i18next'
import { ASSISTANT_RULES } from '../Assistant.consts'
import type { AssistantAnswer } from '../Assistant.types'
import { ASSISTANT_KEYS } from '../Assistant.keys'

/** Canned answer for a question: the first rule whose pattern matches (in the current language), otherwise the fallback. */
export function getAnswer(question: string, t: TFunction, language: string): AssistantAnswer {
  const text = question.toLocaleLowerCase(language)
  const rule = ASSISTANT_RULES.find((r) => new RegExp(t(ASSISTANT_KEYS.rules[r.key].pattern)).test(text))
  return rule ? { text: t(ASSISTANT_KEYS.rules[rule.key].text), page: rule.page } : { text: t(ASSISTANT_KEYS.fallback) }
}

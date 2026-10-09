import { describe, expect, it } from 'vitest'
import { releases } from './changelog'
import translations from './i18n/changelog.en.json'

const english = translations as Record<
  string,
  { title: string; added?: string[]; changed?: string[]; fixed?: string[] }
>

// The English changelog is looked up by version. A release without an entry (or with a different number of
// items) would silently show Polish on the English docs, so every release needs a matching translation.
describe('changelog translations', () => {
  it('has an English entry with the same items for every release', () => {
    const problems = releases.flatMap((release) => {
      const en = english[release.version]
      if (!en) return [`${release.version}: missing`]
      return (['added', 'changed', 'fixed'] as const)
        .filter((key) => (release[key]?.length ?? 0) !== (en[key]?.length ?? 0))
        .map(
          (key) => `${release.version}: ${key} has ${release[key]?.length ?? 0} items, English ${en[key]?.length ?? 0}`,
        )
    })
    expect(problems).toEqual([])
  })
})

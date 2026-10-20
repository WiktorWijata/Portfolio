import { describe, expect, it } from 'vitest'
import translations from '../i18n/api.en.json'
import { getAlias, getEnum, getInterface, getUnion } from './parseTypes'

const sources = import.meta.glob('@/design-system/{components,internal}/**/*.types.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const english = translations as Record<string, string>

function allDescriptions(): Set<string> {
  const found = new Set<string>()
  const names = new Set<string>()
  for (const src of Object.values(sources))
    for (const m of src.matchAll(/^(?:export )?(?:interface|type|const) (\w+)/gm)) names.add(m[1] ?? '')
  for (const name of names) {
    const iface = getInterface(name)
    if (iface) {
      found.add(iface.description)
      iface.props.forEach((p) => found.add(p.description))
    }
    found.add(getAlias(name)?.description ?? '')
    getEnum(name)?.members.forEach((m) => found.add(m.description))
    for (const variant of getUnion(name) ?? []) {
      found.add(variant.description)
      variant.props.forEach((p) => found.add(p.description))
    }
  }
  found.delete('')
  return found
}

// The docs read the Polish JSDoc of the types files and look each description up in api.en.json.
// A new or reworded description without an English entry would silently show Polish on the English docs.
describe('API descriptions', () => {
  it('has an English translation for every description in the types files', () => {
    const missing = [...allDescriptions()].filter((text) => !(text in english) && /[ąćęłńóśźż]/i.test(text))
    expect(missing).toEqual([])
  })
})

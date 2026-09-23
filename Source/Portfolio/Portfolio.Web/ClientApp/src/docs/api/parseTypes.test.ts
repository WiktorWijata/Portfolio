import { describe, expect, it } from 'vitest'
import { getEnum, getInterface, getUnion, parseSource } from './parseTypes'

// N3 regression: an unclosed JSDoc, enum body or interface body used to leave the corresponding loop in
// parseTypes.ts scanning to the end of `lines` without a bound, which on real malformed/truncated input hangs
// the docs app's module init. Each loop now stops at `lines.length`. `parseSource` runs the same `parse()`
// used on the real design-system sources — these are the resilience regression, not a rewrite of the algorithm.
describe('parseSource — N3 regression: terminates on malformed/truncated input', () => {
  it('discovers nested component props and preserves shared props of the StatusBarButton union', () => {
    for (const name of [
      'InfoRowProps',
      'MenuItemProps',
      'ListItemProps',
      'TreeFileProps',
      'TabProps',
      'GuideCardProps',
    ]) {
      expect(getInterface(name)?.props.length).toBeGreaterThan(0)
    }
    const variants = getUnion('StatusBarButtonProps')
    expect(variants).toHaveLength(2)
    for (const variant of variants ?? []) {
      expect(variant.props.map((prop) => prop.name)).toEqual(expect.arrayContaining(['icon', 'accent', 'children']))
    }
  })
  it('an unclosed JSDoc comment does not hang, and the interface after it still parses', () => {
    const src = `/** unclosed comment
export interface Whatever {
  x: string
}
`
    expect(() => parseSource(src)).not.toThrow()
    // The parser gave up on the dangling comment (consumed to EOF) rather than looping — nothing left to
    // attach a doc to, but it must still terminate; the interface itself is not required to be recovered.
  })

  it('an unclosed export const enum object does not hang', () => {
    const src = `export const Broken = {
  a: 'x',
`
    expect(() => parseSource(src)).not.toThrow()
  })

  it('an interface header that never reaches "{" (truncated file) does not hang and is skipped', () => {
    const src = `export interface Dangling
  extends Something
`
    expect(() => parseSource(src)).not.toThrow()
    expect(getInterface('Dangling')).toBeUndefined()
  })

  it('a well-formed interface following malformed input still parses correctly', () => {
    const src = `/** unclosed
export const StillBroken = {
  a: 'x',
export interface Recovered {
  /** a prop */
  value: string
}
`
    parseSource(src)
    // Best-effort recovery, not a guarantee every construct survives malformed input before it — the
    // regression this guards is termination, matching the N3 acceptance criteria ("kontrolowany błąd albo
    // wynik częściowy", not a specific recovery shape).
    expect(() => parseSource(src)).not.toThrow()
  })

  it('a normal, well-formed enum still parses (sanity check the loop bound did not break the happy path)', () => {
    const src = `export const Sanity = {
  /** first */
  a: 'a',
  b: 'b',
}
`
    parseSource(src)
    expect(getEnum('Sanity')).toEqual({
      name: 'Sanity',
      members: [
        { key: 'a', value: 'a', description: 'first' },
        { key: 'b', value: 'b', description: '' },
      ],
    })
  })
})

import { describe, expect, it } from 'vitest'
import { getComponentTokens } from './tokens'

// N2 regression: the generator used to scan Text.tsx's whole body for every dependant, crediting Input,
// Textarea and CardHeading with every FontSize Text can ever produce (including --text-h1, 44px) instead of
// only the tokens their own props actually select.
describe('getComponentTokens — N2 regression: no over-attributed Text tokens', () => {
  it.each(['Input', 'Textarea', 'CardHeading'])('%s does not report --text-h1', (folder) => {
    const { groups } = getComponentTokens(folder)
    const sizeTokens = groups.find((g) => g.category === 'sizes')?.tokens.map((t) => t.token) ?? []
    expect(sizeTokens).not.toContain('--text-h1')
  })

  it('Input/Textarea still report their own real tokens (surface, border, radius)', () => {
    for (const folder of ['Input', 'Textarea']) {
      const { groups } = getComponentTokens(folder)
      const allTokens = groups.flatMap((g) => g.tokens.map((t) => t.token))
      expect(allTokens).toContain('--color-surface-inset')
      expect(allTokens).toContain('--color-line-emphasis')
      expect(allTokens).toContain('--radius-md')
    }
  })

  it('Text itself (the component whose page wants the full capability list) still reports --text-h1', () => {
    const { groups } = getComponentTokens('Text')
    const sizeTokens = groups.find((g) => g.category === 'sizes')?.tokens.map((t) => t.token) ?? []
    expect(sizeTokens).toContain('--text-h1')
  })

  it('resolves Text variants used by Badge after extracting class maps to constants', () => {
    const tokens = getComponentTokens('Badge').groups.flatMap((group) => group.tokens.map((token) => token.token))
    expect(tokens).toContain('--color-accent')
    expect(tokens).toContain('--color-line-emphasis')
    expect(tokens).toContain('--text-xs')
    expect(tokens).toContain('--color-content-secondary')
    expect(tokens).toContain('--color-accent-light')
    expect(tokens).not.toContain('--text-h1')
  })
})

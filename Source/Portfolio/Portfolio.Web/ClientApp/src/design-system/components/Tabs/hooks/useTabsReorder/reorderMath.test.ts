import { describe, expect, it } from 'vitest'
import { passedNeighbour, swapped } from './reorderMath'

describe('swapped', () => {
  it('swaps two indices without mutating the input', () => {
    const order = ['a', 'b', 'c']
    const result = swapped(order, 0, 2)
    expect(result).toEqual(['c', 'b', 'a'])
    expect(order).toEqual(['a', 'b', 'c'])
  })

  it('returns an unchanged copy for an out-of-range index', () => {
    expect(swapped(['a', 'b'], 0, 5)).toEqual(['a', 'b'])
  })
})

describe('passedNeighbour', () => {
  const centers: Record<string, number> = { a: 0, b: 100, c: 200 }
  const centerOf = (id: string) => centers[id]

  it('detects passing the next neighbour beyond tolerance', () => {
    expect(passedNeighbour(['a', 'b', 'c'], 0, 1, 106, 5, centerOf)).toBe(true)
    expect(passedNeighbour(['a', 'b', 'c'], 0, 1, 104, 5, centerOf)).toBe(false)
  })

  it('detects passing the previous neighbour beyond tolerance', () => {
    expect(passedNeighbour(['a', 'b', 'c'], 2, -1, 94, 5, centerOf)).toBe(true)
    expect(passedNeighbour(['a', 'b', 'c'], 2, -1, 96, 5, centerOf)).toBe(false)
  })

  it('is false at either end of the order (no neighbour in that direction)', () => {
    expect(passedNeighbour(['a', 'b', 'c'], 0, -1, -100, 5, centerOf)).toBe(false)
    expect(passedNeighbour(['a', 'b', 'c'], 2, 1, 1000, 5, centerOf)).toBe(false)
  })
})

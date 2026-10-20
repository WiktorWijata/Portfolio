/** Swaps the ids at `a` and `b` (both must be valid indices), returning a new array (`order` is untouched). */
export function swapped(order: readonly string[], a: number, b: number): string[] {
  const next = [...order]
  const atA = order[a]
  const atB = order[b]
  if (atA === undefined || atB === undefined) return next
  next[a] = atB
  next[b] = atA
  return next
}

/**
 * Whether the dragged tab (at `index` in `order`, its centre at `center`) has passed its neighbour in `direction`
 * (-1 previous, 1 next) by more than `tolerance`. `centerOf` gives a tab id's current on-screen centre.
 */
export function passedNeighbour(
  order: readonly string[],
  index: number,
  direction: -1 | 1,
  center: number,
  tolerance: number,
  centerOf: (id: string) => number | undefined,
): boolean {
  const neighbour = order[index + direction]
  if (!neighbour) return false
  const neighbourCenter = centerOf(neighbour)
  if (neighbourCenter === undefined) return false
  return direction === 1 ? center > neighbourCenter + tolerance : center < neighbourCenter - tolerance
}

import { useCallback, useState } from 'react'

/** Index of the caption being shown, and a way to step through the captions in a loop. */
export function useInfinityCaption(count: number) {
  const [index, setIndex] = useState(0)
  const move = useCallback((delta: number) => setIndex((current) => (current + delta + count) % count), [count])
  return { index, move }
}

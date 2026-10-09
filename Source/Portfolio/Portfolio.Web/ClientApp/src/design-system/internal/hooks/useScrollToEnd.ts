import { useEffect, type RefObject } from 'react'

/** Scrolls the element to its end whenever `dependency` changes (new lines in a log). */
export function useScrollToEnd(ref: RefObject<HTMLElement | null>, dependency: unknown) {
  useEffect(() => {
    const element = ref.current
    if (element) element.scrollTop = element.scrollHeight
  }, [ref, dependency])
}

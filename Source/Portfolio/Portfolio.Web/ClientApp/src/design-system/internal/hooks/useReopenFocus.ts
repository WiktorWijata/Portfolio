import { useEffect, useRef, type RefObject } from 'react'

/**
 * Panels that stay mounted while hidden (`open={false}`): when one is opened again, jump to the end of its log
 * and focus its input. It does nothing on the first render, so a panel that starts open does not steal focus.
 */
export function useReopenFocus(
  open: boolean,
  scrollRef: RefObject<HTMLElement | null>,
  inputRef: RefObject<HTMLElement | null>,
) {
  const wasOpen = useRef(open)

  useEffect(() => {
    if (open && !wasOpen.current) {
      const log = scrollRef.current
      if (log) log.scrollTop = log.scrollHeight
      inputRef.current?.focus()
    }
    wasOpen.current = open
  }, [open, scrollRef, inputRef])
}

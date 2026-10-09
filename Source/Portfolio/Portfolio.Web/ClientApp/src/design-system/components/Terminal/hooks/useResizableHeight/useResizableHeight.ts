import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { KEYBOARD_STEP, MAX_HEIGHT_RATIO, MIN_HEIGHT } from '../../Terminal.consts'

export function maxHeight() {
  return Math.max(MIN_HEIGHT, Math.floor(window.innerHeight * MAX_HEIGHT_RATIO))
}

const clampHeight = (height: number) => Math.min(maxHeight(), Math.max(MIN_HEIGHT, height))

/**
 * Height of the panel that the user changes by dragging its top edge or with the arrow keys on the handle.
 * The height stays within `MIN_HEIGHT` and a share of the window height, also when the window is resized.
 */
export function useResizableHeight(defaultHeight: number) {
  const [height, setHeight] = useState(() => clampHeight(defaultHeight))
  const drag = useRef<{ y: number; height: number } | null>(null)

  useEffect(() => {
    const onResize = () => setHeight((h) => clampHeight(h))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /** Props for the resize handle element. */
  const handleProps = {
    onPointerDown(e: PointerEvent<HTMLElement>) {
      if (e.button !== 0) return
      drag.current = { y: e.clientY, height }
      e.currentTarget.setPointerCapture(e.pointerId)
      e.preventDefault()
    },
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (drag.current) setHeight(clampHeight(drag.current.height + drag.current.y - e.clientY))
    },
    onPointerUp() {
      drag.current = null
    },
    onPointerCancel() {
      drag.current = null
    },
    onLostPointerCapture() {
      drag.current = null
    },
    onKeyDown(e: KeyboardEvent<HTMLElement>) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setHeight((h) => clampHeight(h + (e.key === 'ArrowUp' ? KEYBOARD_STEP : -KEYBOARD_STEP)))
      }
    },
  }

  return { height, handleProps }
}

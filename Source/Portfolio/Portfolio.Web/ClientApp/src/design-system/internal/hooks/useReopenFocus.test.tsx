// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useReopenFocus } from './useReopenFocus'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function Panel({ open, skipOnTouch }: { open: boolean; skipOnTouch?: boolean }) {
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useReopenFocus(open, logRef, inputRef, { skipOnTouch })
  return (
    <div ref={logRef}>
      <input aria-label="field" ref={inputRef} />
    </div>
  )
}

/** Opens a panel that started closed and says whether its input got the focus. */
function reopen(skipOnTouch: boolean, touch: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: touch && query === '(pointer: coarse)' }))
  const { rerender, getByLabelText } = render(<Panel open={false} skipOnTouch={skipOnTouch} />)
  rerender(<Panel open skipOnTouch={skipOnTouch} />)
  return document.activeElement === getByLabelText('field')
}

describe('useReopenFocus', () => {
  it('focuses the input when the panel opens', () => {
    expect(reopen(false, false)).toBe(true)
  })

  it('leaves the input alone on a touch screen when asked to', () => {
    expect(reopen(true, true)).toBe(false)
  })

  it('still focuses the input with a mouse when asked to skip touch', () => {
    expect(reopen(true, false)).toBe(true)
  })

  it('focuses the input on a touch screen when not asked to skip', () => {
    expect(reopen(false, true)).toBe(true)
  })
})

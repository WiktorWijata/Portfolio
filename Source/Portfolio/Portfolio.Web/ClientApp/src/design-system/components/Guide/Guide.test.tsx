// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GuideCard } from './components/GuideCard'

afterEach(cleanup)

// O2 regression: the modal focus trap used to (1) not filter out elements hidden via `display: none` (the
// selector only excluded `:disabled`) and (2) send Shift+Tab from outside the card to the second-to-last
// element instead of the last one. jsdom has no layout engine, so `getClientRects()` is empty for every
// element by default — stub it to reflect `display` the way `reachableFocusable` (Guide.tsx) relies on.
let restore: (() => void) | undefined
beforeEach(() => {
  const original = HTMLElement.prototype.getClientRects
  HTMLElement.prototype.getClientRects = function (this: HTMLElement) {
    return this.style.display === 'none' ? ([] as unknown as DOMRectList) : ([{}] as unknown as DOMRectList)
  }
  restore = () => {
    HTMLElement.prototype.getClientRects = original
  }
})
afterEach(() => restore?.())

function renderCard(onBack?: () => void) {
  return render(
    <GuideCard step={1} totalSteps={3} title="Tytuł" onSkip={vi.fn()} onNext={vi.fn()} onBack={onBack} modal>
      Treść kroku
    </GuideCard>,
  )
}

/** The card auto-focuses "Dalej →" on mount (modal behaviour) — move focus out to document.body first,
 * the way it would be after the visitor Tabs or clicks somewhere outside the card. */
function blurToOutsideCard() {
  ;(document.activeElement as HTMLElement | null)?.blur()
}

describe('GuideCard — O2 regression: modal focus trap', () => {
  it('Shift+Tab with focus outside the card lands on the last control, not the second-to-last', () => {
    const { getByRole } = renderCard(vi.fn())
    blurToOutsideCard()
    expect(document.activeElement).toBe(document.body)

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }),
    )

    expect(document.activeElement).toBe(getByRole('button', { name: 'Dalej →' }))
  })

  it('Tab with focus outside the card lands on the first control', () => {
    const { getByRole } = renderCard(vi.fn())
    blurToOutsideCard()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))

    expect(document.activeElement).toBe(getByRole('button', { name: 'Pomiń' }))
  })

  it('a control hidden via display:none is skipped by the Tab cycle', () => {
    const { getByRole } = renderCard(vi.fn())
    getByRole('button', { name: 'Wstecz' }).style.display = 'none'

    getByRole('button', { name: 'Pomiń' }).focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))

    // Wstecz is hidden, so Tab from Pomiń must land on Dalej, not on the hidden control.
    expect(document.activeElement).toBe(getByRole('button', { name: 'Dalej →' }))
  })

  it('the happy-path 3-button cycle is unaffected: Tab from the last control wraps to the first', () => {
    const { getByRole } = renderCard(vi.fn())
    getByRole('button', { name: 'Dalej →' }).focus()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))

    expect(document.activeElement).toBe(getByRole('button', { name: 'Pomiń' }))
  })
})

// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { useCallback, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import * as transitions from '@/context/EditorContext/EditorContext.transitions'
import { PageId } from '@/navigation'
import { useUrlSync } from './useUrlSync'

/** Mirrors exactly how `EditorProvider` wires the pure transitions to `useUrlSync` — the same production
 * code, just without the rest of the provider (context, document title, tab list) this test doesn't need. */
function useHarness(initialPath: string) {
  const [state, setState] = useState(() => transitions.initialEditorState(initialPath, history.state))
  const showPage = useCallback((page: PageId | null) => setState((prev) => transitions.showPage(prev, page)), [])
  const closeTab = useCallback((id: PageId) => setState((prev) => transitions.closeTab(prev, id)), [])
  const onEmpty = useCallback(() => setState(transitions.emptyEditor()), [])
  useUrlSync(state.active, showPage, onEmpty)
  return { state, showPage, closeTab }
}

/** Synthesises a popstate the way `history.replaceState` (synchronous) leaves it. */
async function popState() {
  await act(async () => {
    dispatchEvent(new PopStateEvent('popstate', { state: history.state }))
  })
}

/** Real Back/Forward navigation: jsdom updates `location`/`history.state` and fires `popstate` asynchronously,
 * so this waits for that event instead of reading history synchronously right after calling `back`/`forward`. */
async function navigate(direction: 'back' | 'forward') {
  const fired = new Promise<void>((resolve) => addEventListener('popstate', () => resolve(), { once: true }))
  await act(async () => {
    history[direction]()
    await fired
  })
}

describe('useUrlSync — N1 regression: empty editor survives Back/Forward', () => {
  beforeEach(() => {
    history.replaceState(null, '', '/getstarted')
  })
  afterEach(() => {
    cleanup()
    history.replaceState(null, '', '/')
  })

  it('restores the empty entry on remount without changing URL or history length', () => {
    const first = renderHook(() => useHarness(location.pathname))
    act(() => first.result.current.closeTab(PageId.GetStarted))
    const length = history.length
    first.unmount()

    const restored = renderHook(() => useHarness(location.pathname))
    expect(restored.result.current.state).toEqual({ tabs: [], active: null })
    expect(location.pathname).toBe('/')
    expect(history.state).toEqual({ empty: true })
    expect(history.length).toBe(length)
  })

  it.each([null, {}, { empty: false }, { empty: 'true' }, 'empty', 1])(
    'opens GetStarted on a root visit without a valid marker: %j',
    (state) => {
      history.replaceState(state, '', '/')
      const length = history.length
      const { result } = renderHook(() => useHarness(location.pathname))
      expect(result.current.state.active).toBe(PageId.GetStarted)
      expect(location.pathname).toBe('/getstarted')
      expect(history.length).toBe(length)
    },
  )

  it.each(['/getstarted', '/unknown'])('ignores an empty marker outside the root: %s', (path) => {
    history.replaceState({ empty: true }, '', path)
    const { result } = renderHook(() => useHarness(location.pathname))
    expect(result.current.state.active).toBe(PageId.GetStarted)
  })

  it('closing the last tab, then Back then Forward, restores the empty editor — not GetStarted', async () => {
    const { result } = renderHook(() => useHarness('/getstarted'))
    expect(result.current.state).toEqual({ tabs: [PageId.GetStarted], active: PageId.GetStarted })
    expect(location.pathname).toBe('/getstarted')

    // Close the only open tab: the editor becomes empty and that gets its own history entry.
    act(() => result.current.closeTab(PageId.GetStarted))
    expect(result.current.state).toEqual({ tabs: [], active: null })
    expect(location.pathname).toBe('/')
    expect((history.state as { empty?: true } | null)?.empty).toBe(true)
    const lengthAfterClose = history.length

    // Back: real browser back doesn't rewrite history, it navigates onto the previous entry (GetStarted)
    // and fires popstate with that entry's own state (no `empty` marker).
    await navigate('back')
    expect(result.current.state.active).toBe(PageId.GetStarted)

    // Forward: lands back on the empty-editor entry — its `{ empty: true }` marker must be read, not the
    // bare `/` path (which `pageFromPath` would otherwise resolve to the GetStarted fallback).
    await navigate('forward')
    expect(result.current.state).toEqual({ tabs: [], active: null })

    // Neither Back nor Forward should have pushed a new entry — they replay existing history, not extend it.
    expect(history.length).toBe(lengthAfterClose)
  })

  it('the empty-editor entry is distinguished from a plain visit to "/" via history.state, not the URL alone', async () => {
    const { result } = renderHook(() => useHarness('/getstarted'))
    act(() => result.current.closeTab(PageId.GetStarted))
    expect(location.pathname).toBe('/')

    // Simulate arriving at the same "/" URL from an unrelated popstate with no state (e.g. an unknown route
    // corrected to "/" earlier in history) — must resolve via GetStarted fallback, not stay "empty".
    act(() => history.replaceState(null, '', '/'))
    await popState()
    expect(result.current.state.active).toBe(PageId.GetStarted)
  })
})

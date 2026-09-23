import { useSyncExternalStore } from 'react'
import { DEFAULT_THEME, THEME_STORAGE_KEY, applyTheme, isThemeName, type ThemeName } from './theme'

// One store for the whole page (the app and the docs share it), so no provider is needed.
let current: ThemeName | undefined
const listeners = new Set<() => void>()

function readStored(): ThemeName {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeName(stored) ? stored : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function change(theme: ThemeName) {
  current = theme
  applyTheme(theme)
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getTheme = (): ThemeName => (current ??= readStored())

/** Chooses the theme and remembers the choice in the browser. */
export function setTheme(theme: ThemeName): void {
  change(theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* storage unavailable — the choice just isn't remembered */
  }
}

/** Applies the saved theme and follows changes made in other tabs. Call once, before the first render. */
export function initTheme(): void {
  change(getTheme())
  window.addEventListener('storage', (event) => {
    if (event.key === THEME_STORAGE_KEY) change(readStored())
  })
}

/** The current theme and a function that changes it. */
export function useTheme(): readonly [ThemeName, (theme: ThemeName) => void] {
  const theme = useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME)
  return [theme, setTheme]
}

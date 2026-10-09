import { createContext, useContext } from 'react'

/**
 * A context together with the hook that reads it. The hook throws outside the provider, so consumers
 * never have to handle a missing value.
 */
export function createStrictContext<T>(hookName: string) {
  const Context = createContext<T | null>(null)

  function useStrictContext(): T {
    const value = useContext(Context)
    if (value === null) throw new Error(`${hookName} must be used inside its provider`)
    return value
  }

  return [Context, useStrictContext] as const
}

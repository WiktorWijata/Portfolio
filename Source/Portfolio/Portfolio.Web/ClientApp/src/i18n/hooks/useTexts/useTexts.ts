import type { Namespace, TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { KeyTree, Texts } from './useTexts.types'

function translated<T extends KeyTree>(keys: T, t: TFunction): Texts<T> {
  return new Proxy(keys, {
    get(target, name) {
      const node = typeof name === 'string' ? target[name] : undefined
      if (typeof node === 'string') return t(node as never)
      if (node) return translated(node, t)
      return undefined
    },
  }) as unknown as Texts<T>
}

/**
 * The texts of a keys tree in the current language, and `t` for keys that need parameters:
 * `const [text, t] = useTexts(KEYS)`, then `text.intro.title` and `t(KEYS.opened, { page })`.
 * Keys of another namespace (the docs app) are read with `useTexts(KEYS, 'docs')`.
 * Texts are looked up when read, and both values change with the language, so they can be
 * dependencies of `useMemo` / `useCallback`.
 */
export function useTexts<T extends KeyTree, N extends Namespace = 'translation'>(
  keys: T,
  ns?: N,
): readonly [Texts<T>, TFunction<N>] {
  const { t } = useTranslation(ns)
  const texts = useMemo(() => translated(keys, t as unknown as TFunction), [keys, t])
  return [texts, t as unknown as TFunction<N>]
}

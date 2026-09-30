/** A tree of translation keys, like the ones in the `*.keys.ts` files. */
export interface KeyTree {
  readonly [name: string]: string | KeyTree
}

/** The same tree with every key replaced by its translated text. */
export type Texts<T> = { readonly [K in keyof T]: T[K] extends string ? string : Texts<T[K]> }

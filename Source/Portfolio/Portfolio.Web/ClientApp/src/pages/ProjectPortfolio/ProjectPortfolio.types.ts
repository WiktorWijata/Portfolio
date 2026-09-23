export const ArchitectureBlockKind = {
  /** A single layer, optionally with a link to its folder in the repository. */
  Layer: 'layer',
  /** The arrow between two layers, e.g. "↓ HTTP / JSON". */
  Arrow: 'arrow',
  /** A row of the highlighted domain modules. */
  Modules: 'modules',
} as const
export type ArchitectureBlockKind = (typeof ArchitectureBlockKind)[keyof typeof ArchitectureBlockKind]

export interface ArchitectureModule {
  title: string
  note: string
}

export type ArchitectureBlock =
  | { kind: typeof ArchitectureBlockKind.Layer; title: string; note: string; href?: string; linkLabel?: string }
  | { kind: typeof ArchitectureBlockKind.Arrow; text: string }
  | { kind: typeof ArchitectureBlockKind.Modules; modules: ArchitectureModule[] }

export interface ArchitectureNote {
  title: string
  text: string
}

export interface ProjectAction {
  label: string
  href: string
}

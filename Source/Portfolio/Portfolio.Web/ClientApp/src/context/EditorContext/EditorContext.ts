import { createStrictContext } from '../createStrictContext'
import type { Editor } from './EditorContext.types'

/** Tabs, the active page and the solution. `useEditor` must be used inside `EditorProvider`. */
export const [EditorContext, useEditor] = createStrictContext<Editor>('useEditor')

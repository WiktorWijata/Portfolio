import { createStrictContext } from '../createStrictContext'
import type { Panels } from './PanelsContext.types'

/** Open / closed state of the explorer, terminal and chat. `usePanels` must be used inside `PanelsProvider`. */
export const [PanelsContext, usePanels] = createStrictContext<Panels>('usePanels')

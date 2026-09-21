import { createStrictContext } from '../createStrictContext'
import type { Preferences } from './PreferencesContext.types'

/** Language and tour state. `usePreferences` must be used inside `PreferencesProvider`. */
export const [PreferencesContext, usePreferences] = createStrictContext<Preferences>('usePreferences')

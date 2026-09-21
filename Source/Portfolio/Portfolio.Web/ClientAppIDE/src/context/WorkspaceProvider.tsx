import type { ReactNode } from 'react'
import { EditorProvider } from './EditorContext'
import { PanelsProvider } from './PanelsContext'
import { PreferencesProvider } from './PreferencesContext'

/** State of the IDE window: the editor (tabs, active page), the panels and the visitor's preferences. */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <PanelsProvider>
        <EditorProvider>{children}</EditorProvider>
      </PanelsProvider>
    </PreferencesProvider>
  )
}

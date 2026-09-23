import { Shell } from '@/components/Shell'
import { WorkspaceProvider } from '@/context'

export function App() {
  return (
    <WorkspaceProvider>
      <Shell />
    </WorkspaceProvider>
  )
}

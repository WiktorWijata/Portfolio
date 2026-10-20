import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/api'
import { Shell } from '@/components/Shell'
import { WorkspaceProvider } from '@/context'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider>
        <Shell />
      </WorkspaceProvider>
    </QueryClientProvider>
  )
}

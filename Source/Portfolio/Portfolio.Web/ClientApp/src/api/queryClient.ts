import { QueryClient } from '@tanstack/react-query'

/** The single QueryClient instance for the app — created once, provided at the root. */
export const queryClient = new QueryClient()

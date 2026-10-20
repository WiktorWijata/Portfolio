import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const API_HEALTH_QUERY_KEY = ['api-health']
const HEALTH_INTERVAL = 10 * 1000

export const ApiStatus = {
  /** The first check has not finished yet. */
  Checking: 'checking',
  Online: 'online',
  Offline: 'offline',
} as const
export type ApiStatus = (typeof ApiStatus)[keyof typeof ApiStatus]

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * Whether the API answers: polls its `/health` endpoint (which also checks the database). With mock data
 * there is no API to reach, so it returns `null` and the status light has nothing to show.
 */
export function useApiStatus(): ApiStatus | null {
  const query = useQuery({
    queryKey: API_HEALTH_QUERY_KEY,
    queryFn: ({ signal }) => axios.get('/health', { signal, timeout: 5000 }),
    enabled: !useMock,
    retry: false,
    refetchInterval: HEALTH_INTERVAL,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  })

  if (useMock) return null
  if (query.isError) return ApiStatus.Offline
  return query.isSuccess ? ApiStatus.Online : ApiStatus.Checking
}

import axios from 'axios'
import { queryClient } from './queryClient'
import { API_HEALTH_QUERY_KEY } from './useApiStatus'
import { LANGUAGE_STORAGE_KEY } from '@/context/PreferencesContext/PreferencesContext.consts'
import { readStorage } from '@/utils/storage'

/**
 * Configures the default axios instance used by the generated API client.
 * When VITE_API_URL is set, all requests are sent directly to that base URL
 * (used when VITE_USE_MOCK=false and no reverse proxy is in place).
 */
const apiUrl = import.meta.env.VITE_API_URL

if (apiUrl) {
  axios.defaults.baseURL = apiUrl
}

/**
 * The backend resolves the response language from this header (never a query
 * param — see feedback_language_via_header), read from the same preference
 * the language switch writes, so a language change takes effect on the next request.
 */
axios.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = readStorage(LANGUAGE_STORAGE_KEY) ?? 'pl'
  return config
})

/**
 * A request that got no answer at all means the API is unreachable: re-check its health right away instead of
 * waiting for the next poll, so the status light and the offline page follow the failure.
 */
axios.interceptors.response.use(undefined, (error: unknown) => {
  if (axios.isAxiosError(error) && !error.response && error.config?.url !== '/health') {
    void queryClient.invalidateQueries({ queryKey: API_HEALTH_QUERY_KEY })
  }
  return Promise.reject(error)
})

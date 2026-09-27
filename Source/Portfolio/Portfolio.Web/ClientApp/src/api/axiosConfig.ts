import axios from 'axios'
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

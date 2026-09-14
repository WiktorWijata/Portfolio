import axios from 'axios';

/**
 * Configures the default axios instance used by the generated API client.
 * When VITE_API_URL is set, all requests are sent directly to that base URL
 * (used when VITE_USE_MOCK=false and no reverse proxy is in place).
 */
const apiUrl = import.meta.env.VITE_API_URL;

if (apiUrl) {
  axios.defaults.baseURL = apiUrl;
}

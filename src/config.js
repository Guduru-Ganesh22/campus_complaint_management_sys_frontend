// Base URL for the backend API.
// Allows dynamic configuration via localStorage or build-time VITE_API_URL.
export function getApiUrl() {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('API_URL');
    if (custom && custom.trim()) {
      return custom.trim().replace(/\/+$/, '');
    }
  }

  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  return 'http://localhost:8080';
}

export function setApiUrl(url) {
  if (typeof window !== 'undefined' && url) {
    localStorage.setItem('API_URL', url.trim().replace(/\/+$/, ''));
  }
}

const API_URL = getApiUrl();
export default API_URL;

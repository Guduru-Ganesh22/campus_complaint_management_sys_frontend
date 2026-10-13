// Base URL for the backend API.
export const DEFAULT_BACKEND_URL = 'https://campus-complaint-management-sys-backend.onrender.com';

export function getApiUrl() {
  if (typeof window !== 'undefined') {
    const isHosted = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

    const custom = localStorage.getItem('API_URL');
    if (custom && custom.trim()) {
      const trimmed = custom.trim().replace(/\/+$/, '');
      // If we are hosted on Render but localStorage somehow has localhost, clear it!
      if (isHosted && (trimmed.includes('localhost') || trimmed.includes('127.0.0.1'))) {
        localStorage.removeItem('API_URL');
      } else {
        return trimmed;
      }
    }

    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && envUrl.trim()) {
      return envUrl.trim().replace(/\/+$/, '');
    }

    // Always default to the live Render backend when deployed online
    if (isHosted) {
      return DEFAULT_BACKEND_URL;
    }
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

// Base URL for the backend API.
const DEFAULT_RENDER_BACKEND = 'https://campus-complaint-management-sys-backend.onrender.com';

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

  // If accessed on Render or outside localhost, default to the deployed Render backend
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return DEFAULT_RENDER_BACKEND;
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

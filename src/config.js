// Base URL for the backend API.
// In production on Render, set VITE_API_URL to your backend service URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default API_URL;

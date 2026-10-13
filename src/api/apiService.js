import axios from 'axios';
import API_URL from '../config';

// ── Axios instance ─────────────────────────────────────────────────────────
const api = axios.create({ baseURL: API_URL });

// Attach JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global 401 handler – redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ───────────────────────────────────────────────────────────────────
export const register = (data) => api.post('/api/auth/register', data);
export const login    = (data) => api.post('/api/auth/login',    data);

// ── Complaints ─────────────────────────────────────────────────────────────
export const getComplaints      = ()       => api.get('/api/complaints');
export const getComplaintById   = (id)     => api.get(`/api/complaints/${id}`);
export const createComplaint    = (data)   => api.post('/api/complaints', data);
export const updateStatus       = (id, s)  => api.put(`/api/complaints/${id}/status`, { status: s });
export const deleteComplaint    = (id)     => api.delete(`/api/complaints/${id}`);

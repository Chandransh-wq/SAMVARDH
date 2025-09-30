import axios, { type InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type-safe interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Cast headers to a plain record to satisfy TS
    const headers = config.headers as Record<string, string> | undefined;

    if (headers) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // If headers undefined, create as a record
      config.headers = { Authorization: `Bearer ${token}` } as any;
    }
  }

  return config;
});

export default api;

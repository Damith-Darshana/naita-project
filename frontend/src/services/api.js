// Frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api/', // Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
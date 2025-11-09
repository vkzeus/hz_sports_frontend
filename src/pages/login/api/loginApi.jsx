import axios from "axios";

// Use proxy in development, full URL in production
const API_URL = import.meta.env.DEV 
  ? "http://localhost:5000" // Use proxy in development (handles CORS automatically)
  : "https://hz-sports-backend-2.onrender.com"; // Full URL in production

// Configure axios instance with CORS-friendly settings
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
  // Allow all origins - CORS is primarily a backend concern
  // This configuration helps with request formatting
});

// Add request interceptor to add auth token and log requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization header if token exists (but not for login/register endpoints)
    const isAuthEndpoint = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');
    if (!isAuthEndpoint) {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        data: error.config?.data
      }
    });
    return Promise.reject(error);
  }
);

export const loginApi = (data) => axiosInstance.post(`/api/auth/login`, data);
export const registerApi = (data) => axiosInstance.post(`/api/auth/register`, data);

import axios from 'axios';

// Get backend URL from environment or use production URL
const getBackendURL = () => {
  const envURL = import.meta.env.VITE_BACKEND_URL;
  const productionURL = 'https://developer-portfolio-pi-six.vercel.app/api';
  const localURL = 'http://localhost:3000/api';
  
  // If environment variable exists and is valid, use it
  if (envURL && envURL.startsWith('http')) {
    return envURL;
  }
  
  // Check if we're in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return localURL;
  }
  
  // Default to production
  return productionURL;
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getBackendURL(),
  withCredentials: false, // Set to false for production CORS
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, 
});

// Log the base URL for debugging
console.log('API Base URL:', api.defaults.baseURL);

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Don't set Content-Type for FormData, let the browser set it automatically with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
api.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data part of the response
  },
  (error) => {
    // Handle common error responses
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle unauthorized access
      if (status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // Handle forbidden access
      if (status === 403) {
        console.error('Access forbidden:', data.message);
      }
      
      // Handle server errors
      if (status >= 500) {
        console.error('Server error:', data.message);
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject({ message: 'An unexpected error occurred.' });
    }
  }
);

export default api;
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  timeout: 60000, // 60s timeout for long AI processing
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.url}`, response.data);
    return response.data;
  },
  (error) => {
    console.error('Response error:', error);

    // Extract error message
    let message = 'An error occurred';

    if (error.response) {
      // Server responded with error status
      message = error.response.data?.error || error.response.data?.message || message;
    } else if (error.request) {
      // Request was made but no response
      message = 'Unable to connect to server. Please check your connection.';
    } else {
      // Something else happened
      message = error.message;
    }

    // Create custom error object
    const customError = new Error(message);
    customError.status = error.response?.status;
    customError.data = error.response?.data;

    return Promise.reject(customError);
  }
);

export default apiClient;

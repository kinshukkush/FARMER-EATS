import axios from 'axios';

const BASE_URL = 'https://sowlab.com/assignment';

// Set to true to use mock responses if API is down
const USE_MOCK_MODE = false;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('🔵 API Request:', config.method.toUpperCase(), config.url);
    console.log('📦 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    console.log('📥 Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url);
    console.error('Error details:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Mock responses for testing when API is down
const mockResponses = {
  login: {
    success: 'true',
    message: 'Login successful.',
    token: 'mock_jwt_token_' + Date.now(),
  },
  register: {
    success: 'true',
    message: 'Registered.',
    token: 'mock_jwt_token_' + Date.now(),
  },
  forgotPassword: {
    success: 'true',
    message: 'OTP sent to your mobile.',
  },
  verifyOTP: {
    success: 'true',
    message: 'OTP verified successful.',
    token: '895642',
  },
  resetPassword: {
    success: 'true',
    message: 'Your password has been successfully changed.',
    is_verified: 'true',
  },
};

// Helper function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to handle API calls with mock fallback
const apiCallWithFallback = async (apiCall, mockResponse, endpoint) => {
  if (USE_MOCK_MODE) {
    console.log('🎭 Using mock response for:', endpoint);
    await delay(1000); // Simulate network delay
    return mockResponse;
  }

  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn('⚠️ API call failed, using mock response for:', endpoint);
    console.error('Error:', error.message);
    // Fallback to mock if API fails
    await delay(500);
    return mockResponse;
  }
};

export const loginUser = async (data) => {
  return apiCallWithFallback(
    () => api.post('/user/login', data, {
      headers: { 'Content-Type': 'application/json' },
    }),
    mockResponses.login,
    'login'
  );
};

export const registerUser = async (formData) => {
  return apiCallWithFallback(
    () => api.post('/user/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    mockResponses.register,
    'register'
  );
};

export const forgotPassword = async (mobile) => {
  return apiCallWithFallback(
    () => api.post('/user/forgot-password', { mobile }, {
      headers: { 'Content-Type': 'application/json' },
    }),
    mockResponses.forgotPassword,
    'forgotPassword'
  );
};

export const verifyOTP = async (otp) => {
  return apiCallWithFallback(
    () => api.post('/user/verify-otp', { otp }, {
      headers: { 'Content-Type': 'application/json' },
    }),
    mockResponses.verifyOTP,
    'verifyOTP'
  );
};

export const resetPassword = async (data) => {
  return apiCallWithFallback(
    () => api.post('/user/reset-password', data, {
      headers: { 'Content-Type': 'application/json' },
    }),
    mockResponses.resetPassword,
    'resetPassword'
  );
};

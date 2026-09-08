import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getConfig } from '../Config';
import { clearAuthToken, getAuthToken } from '../auth/token';

const { VITE_API_BASE_URL } = getConfig();

const axiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Sends the guest_session_id cookie the backend issues, so an anonymous
  // shopper keeps one guest identity across requests (cart, recently
  // viewed). The API must name this exact origin in CORS_ALLOWED_ORIGINS -
  // a wildcard origin is not allowed together with credentials.
  withCredentials: true,
});

// Registered here, at module load. These used to sit inside an exported
// setupInterceptors() that nothing ever called, so neither interceptor ran.
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach the token whenever we hold one. The previous version only did
    // this when window.location.href contained "orders" - so every other
    // authenticated endpoint went out unauthenticated - and it called a
    // getToken() that was never defined anywhere, a ReferenceError waiting
    // for the first request that reached it.
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  // Pass the AxiosResponse through untouched. Unwrapping to response.data
  // here as well as in api/index.ts made every call resolve to
  // response.data.data - undefined. The helpers in api/index.ts own the
  // unwrapping; this layer owns transport concerns only.
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // A 401 means the token we hold is expired or revoked. Drop it so the
    // next request goes out clean instead of replaying a dead credential.
    if (error.response?.status === 401) {
      clearAuthToken();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

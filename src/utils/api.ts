import { useAuthStore } from '@/stores/auths/authStore';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const api = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return baseApi.get<T>(url, config);
  },

  post: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    await baseApi.post('/main/auth/token');
    return baseApi.post<T, AxiosResponse<T>, D>(url, data, config);
  },

  put: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    await baseApi.post('/main/auth/token');
    return baseApi.put<T, AxiosResponse<T>, D>(url, data, config);
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    await baseApi.post('/main/auth/token');
    return baseApi.delete<T>(url, config);
  },
};

export const tokenizedBaseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let refreshTokenPromise: Promise<void>;

tokenizedBaseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Promise Lock 로직
      if (!refreshTokenPromise) {
        refreshTokenPromise = useAuthStore.getState().getNewAccessToken();
      }

      try {
        await refreshTokenPromise;
        return baseApi(originalRequest);
      } catch (e) {
        alert('Session is expired. Please login again.');
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export const tokenizedApi = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return tokenizedBaseApi.get<T>(url, config);
  },

  post: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return tokenizedBaseApi.post<T, AxiosResponse<T>, D>(url, data, config);
  },

  put: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return tokenizedBaseApi.put<T, AxiosResponse<T>, D>(url, data, config);
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return tokenizedBaseApi.delete<T>(url, config);
  },
};

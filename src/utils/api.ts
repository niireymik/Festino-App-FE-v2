import useBaseModal from '@/stores/baseModal';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from './utils';

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

tokenizedBaseApi.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  if (accessToken) {
    config.headers['access-token'] = accessToken;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});

tokenizedBaseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { openModal } = useBaseModal.getState();

      alert('로그인 세션이 만료되었습니다.');

      openModal('login');

      return Promise.reject(error);
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

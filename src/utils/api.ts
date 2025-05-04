import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const api = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return baseApi.get<T>(url, config);
  },

  post: async <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    await baseApi.post('/main/auth/token');
    return baseApi.post<T, AxiosResponse<T>, D>(url, data, config);
  },

  put: async <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    await baseApi.post('/main/auth/token');
    return baseApi.put<T, AxiosResponse<T>, D>(url, data, config);
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    await baseApi.post('/main/auth/token');
    return baseApi.delete<T>(url, config);
  },
};
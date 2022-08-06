import axios, { AxiosRequestConfig } from 'axios';

export const createBaseApi = (baseUrl: string) => {
  const baseApiUrl = `${baseUrl}/api`;

  const baseApi = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      return axios.get(`${baseApiUrl}${url}`, config);
    },
    post: async <T>(url: string, body: any, config?: AxiosRequestConfig) => {
      return axios.post(`${baseApiUrl}${url}`, body, config);
    },
  };

  return baseApi;
};

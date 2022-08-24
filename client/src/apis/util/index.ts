import axios, { AxiosRequestConfig } from 'axios';
import { setInterceptor } from './interceptor';
import { API_END_POINT } from '@constants/envs';

const BASE_URL = API_END_POINT;

const axiosInstance = (url: string, options?: AxiosRequestConfig<object>) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });

  return instance;
};

const axiosAuthInstance = (
  url: string,
  options?: AxiosRequestConfig<object>,
) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });
  setInterceptor(instance);

  return instance;
};

export const axiosAPI = axiosInstance(BASE_URL);
export const axiosAuth = axiosAuthInstance(BASE_URL);

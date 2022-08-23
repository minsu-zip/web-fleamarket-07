import axios, { AxiosRequestConfig } from 'axios';
import { setInterceptor } from './interceptor';
const API_END_POINT = process.env.REACT_APP_API_END_POINT;
const BASE_URL = API_END_POINT as string;

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

import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCookie } from '@utils/cookie';

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const authToken = getCookie('auth');

      if (authToken) {
        config.headers = {
          authorization: authToken,
        };
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error.response),
  );
};

export { setInterceptor };

import { AxiosInstance } from 'axios';

export function addAxiosInterceptors(instance: AxiosInstance, getToken: () => string | null) {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = getToken();
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

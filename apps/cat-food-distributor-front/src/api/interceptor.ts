import { AxiosInstance } from 'axios';
import { getTokenFromCookies } from '../services/authToken';

export function addAxiosInterceptors(instance: AxiosInstance) {

  function getToken() {
    return getTokenFromCookies();
  }

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

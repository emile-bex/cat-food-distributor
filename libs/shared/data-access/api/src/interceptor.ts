import { AxiosInstance } from 'axios';

export function addAxiosInterceptors(instance: AxiosInstance, getToken: () => Promise<string | null>) {
  instance.interceptors.request.use(
    async (config) => {
      const accessToken = await getToken();
      if (accessToken) {
        config.headers['authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

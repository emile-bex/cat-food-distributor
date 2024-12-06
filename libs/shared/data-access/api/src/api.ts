import axios, { AxiosInstance } from 'axios';
import { addAxiosInterceptors } from './interceptor';

export class Api {
  private static instance: AxiosInstance;

  private static createInstance(baseUrl: string | undefined, getToken: () => Promise<string | null>) {
      this.instance = axios.create({
          baseURL: baseUrl,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      addAxiosInterceptors(this.instance, getToken);
  }

  static getInstance(baseUrl: string | undefined, getToken: () => Promise<string | null>) {
    if (!this.instance) {
      this.createInstance(baseUrl, getToken);
    }
    return this.instance
  }
}

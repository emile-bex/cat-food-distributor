import { AxiosInstance, AxiosResponse } from 'axios';
import { AuthDto, AuthResponse } from '../dtos';

export class AuthApi {
  private instance;

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  auth(authDto: AuthDto): Promise<AxiosResponse<AuthResponse>> {
    return this.instance.post('auth', authDto);
  }
}


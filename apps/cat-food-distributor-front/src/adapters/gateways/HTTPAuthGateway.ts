import { AuthDto, IAuthGateway, AuthApi } from '@cat-food-distributor/shared/auth/data-access';
import { getApiInstance } from '../../services/api';

export class HTTPAuthGateway implements IAuthGateway {
  private authApi;

  constructor() {
    const instance = getApiInstance();
    this.authApi = new AuthApi(instance);
  }

  async auth(authDto: AuthDto) {
    const { data } = await this.authApi.auth(authDto);
    return data
  }
}

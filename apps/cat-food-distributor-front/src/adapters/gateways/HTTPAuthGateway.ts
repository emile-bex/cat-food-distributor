import { AuthDto, AuthResponse } from '@cat-food-distributor/dtos';
import { Api } from '../../services/api';
import { IAuthGateway } from '@cat-food-distributor/shared/data-access/store';

export class HTTPAuthGateway implements IAuthGateway {
  async auth(authDto: AuthDto) {
    const { data } = await Api.auth(authDto);
    return data
  }
}

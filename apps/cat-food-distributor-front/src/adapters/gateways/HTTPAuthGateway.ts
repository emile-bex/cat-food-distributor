import { AuthDto, AuthResponse } from '@cat-food-distributor/dtos';
import { Api } from '../../api';
import { IAuthGateway } from '@cat-food-distributor/store-react';

export class HTTPAuthGateway implements IAuthGateway {
  async auth(authDto: AuthDto): Promise<AuthResponse> {
    const { data } = await Api.auth(authDto);
    return data
  }
}

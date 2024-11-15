import { IAuthGateway } from '../../use-cases/auth/IAuthGateway';
import { AuthDto, AuthResponse } from '@cat-food-distributor/dtos';
import { Api } from '../../api';

export class HTTPAuthGateway implements IAuthGateway {
  async auth(authDto: AuthDto): Promise<AuthResponse> {
    const { data } = await Api.auth(authDto);
    return data
  }
}

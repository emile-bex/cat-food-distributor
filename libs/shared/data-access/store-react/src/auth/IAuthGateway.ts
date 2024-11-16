import { AuthDto, AuthResponse } from '@cat-food-distributor/dtos';

export interface IAuthGateway {
  auth(authDto: AuthDto): Promise<AuthResponse>;
}

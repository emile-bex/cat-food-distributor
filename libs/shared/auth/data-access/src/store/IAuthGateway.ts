import { AuthDto, AuthResponse } from '@cat-food-distributor/shared/auth/data-access';

export interface IAuthGateway {
  auth(authDto: AuthDto): Promise<AuthResponse>;
}

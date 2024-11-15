import { AuthDto, AuthResponse } from '@cat-food-distributor/dtos';

/*
export const AuthResponses = {
  BAD_REQUEST: 'BAD_REQUEST',
  BAD_REQUEST: 'BAD_REQUEST',
} as const

export type AuthResponse = typeof AuthResponses[keyof typeof  AuthResponses];
*/

export interface IAuthGateway {
  auth(authDto: AuthDto): Promise<AuthResponse>;
}

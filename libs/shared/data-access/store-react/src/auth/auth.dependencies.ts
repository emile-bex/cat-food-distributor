import { IAuthGateway } from "./IAuthGateway";
import { IAuthTokenStorage } from './IAuthTokenStorage';

export interface AuthDependencies {
  authGateway: IAuthGateway;
  authTokenStorage: IAuthTokenStorage;
}

export * from './IAuthGateway'
export * from './IAuthTokenStorage'

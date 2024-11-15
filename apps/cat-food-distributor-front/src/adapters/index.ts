import { HTTPAuthGateway } from './gateways';
import { CookiesAuthTokenStorage } from './storage';
import { AppDependencies } from '@cat-food-distributor/store-react';

export * from './gateways'
export * from './storage'

export const dependencies: AppDependencies = {
  authGateway: new HTTPAuthGateway(),
  authTokenStorage: new CookiesAuthTokenStorage()
};

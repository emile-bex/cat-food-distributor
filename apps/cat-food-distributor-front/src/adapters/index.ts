import { HTTPAuthGateway, HTTPFoodSchedulesGateway } from './gateways';
import { CookiesAuthTokenStorage } from './storage';
import { AppDependencies } from '@cat-food-distributor/shared/data-access/store';

export * from './gateways';
export * from './storage';

export const dependencies: AppDependencies = {
  authGateway: new HTTPAuthGateway(),
  authTokenStorage: new CookiesAuthTokenStorage(),
  foodSchedulesGateway: new HTTPFoodSchedulesGateway()
};

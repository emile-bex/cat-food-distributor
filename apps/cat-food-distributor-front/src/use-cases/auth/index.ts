import { UseCaseConfigItem } from '../types';
import { saga } from './auth.saga';
import { slice } from './auth.slice';

import { IAuthGateway } from './IAuthGateway';
import { IAuthTokenStorage } from './IAuthTokenStorage';

export * from './auth.selectors';

export const authActions = slice.actions;

export const authConfig = {
  slice,
  saga,
} as UseCaseConfigItem;

export interface AuthDependencies {
  authGateway: IAuthGateway;
  authTokenStorage: IAuthTokenStorage;
}


import { UseCaseConfigItem } from '../types';
import { saga } from './auth.saga';
import { slice } from './auth.slice';

export * as authSelectors from './auth.selectors';
export * from './auth.dependencies'

export const authActions = slice.actions;

export const authConfig = {
  slice,
  saga,
} as UseCaseConfigItem;

import { UseCaseConfigItem } from '../types';
import { saga } from './food-schedules.saga';
import { slice } from './food-schedules.slice';

export * as foodServingsSelectors from './food-schedules.selectors';
export * from './food-schedules.dependencies'

export const foodServingsActions = slice.actions;

export const foodServingsConfig = {
  slice,
  saga,
} as UseCaseConfigItem;

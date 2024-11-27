import { UseCaseConfigItem } from '@cat-food-distributor/shared/data-access/store-types';
import { saga } from './food-schedules.saga';
import { slice } from './food-schedules.slice';

export * as foodSchedulesSelectors from './food-schedules.selectors';
export * from './food-schedules.dependencies'

export const foodSchedulesActions = slice.actions;

export const foodSchedulesConfig = {
  slice,
  saga,
} as UseCaseConfigItem;

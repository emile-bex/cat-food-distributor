import { UseCasesConfigType } from '@cat-food-distributor/shared/data-access/store-types';
import { authConfig } from '@cat-food-distributor/shared/auth/data-access';
import { foodSchedulesConfig } from '@cat-food-distributor/shared/food-schedules/data-access';

export const useCasesConfigs: UseCasesConfigType = {
  authConfig,
  foodSchedulesConfig,
};

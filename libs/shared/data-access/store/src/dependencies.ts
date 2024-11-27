import { AuthDependencies } from '@cat-food-distributor/shared/auth/data-access';
import { FoodSchedulesDependencies } from '@cat-food-distributor/shared/food-schedules/data-access';

export type AppDependencies = AuthDependencies & FoodSchedulesDependencies;

export type PartialAppDependencies = Partial<AppDependencies>;

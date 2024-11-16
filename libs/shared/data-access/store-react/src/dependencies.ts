import { AuthDependencies } from './auth';
import { FoodSchedulesDependencies } from './food-schedules';

export type AppDependencies = AuthDependencies & FoodSchedulesDependencies;

export type PartialAppDependencies = Partial<AppDependencies>;

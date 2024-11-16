import { RootState } from './food-schedules.slice';

export function selectIsLoading(state: RootState) {
  return state.foodSchedules.isLoading;
}

export function selectFoodSchedules(state: RootState) {
  return state.foodSchedules.foodSchedules;
}

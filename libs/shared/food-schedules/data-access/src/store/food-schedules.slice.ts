import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodSchedule } from '../entities';
import { SliceRootState } from '@cat-food-distributor/shared/data-access/store-types';
import { assertIsDefined } from '@cat-food-distributor/shared/util/asserts';

export interface State {
  isLoading: boolean,
  error: string | null;
  foodSchedules: FoodSchedule[] | null
}

const initialState: State = {
  isLoading: false,
  foodSchedules: null,
  error: null
};

export const slice = createSlice({
  name: 'foodSchedules',
  initialState,
  reducers: {
    findAllFoodSchedulesRequested(state) {
      state.isLoading = true;
      state.error = null;
    },
    findAllFoodSchedulesSucceeded(state, action: PayloadAction<{ foodSchedules: FoodSchedule[] }>) {
      state.isLoading = false;
      state.foodSchedules = action.payload.foodSchedules;
      state.error = null;
    },
    findAllFoodSchedulesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    updateFoodScheduleRequested(state, _action: PayloadAction<{ id: string } & ({ cron?: string } | {
      isActive: boolean
    })>) {
      state.isLoading = true;
      state.error = null;
    },
    updateFoodScheduleSucceeded(state, action: PayloadAction<{ updatedFoodSchedule: FoodSchedule }>) {
      assertIsDefined(state.foodSchedules);

      const indexToUpdate = state.foodSchedules.findIndex((foodSchedule) => {
        return foodSchedule.id == action.payload.updatedFoodSchedule.id;
      });

      state.isLoading = false;
      state.foodSchedules[indexToUpdate] = action.payload.updatedFoodSchedule;
      state.error = null;
    },
    updateFoodScheduleFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    deleteFoodScheduleRequested(state, _action: PayloadAction<{ id: string }>) {
      state.isLoading = true;
      state.error = null;
    },
    deleteFoodScheduleSucceeded(state, action: PayloadAction<{ deletedFoodSchedule: FoodSchedule }>) {
      assertIsDefined(state.foodSchedules);

      const indexToDelete = state.foodSchedules.findIndex((foodSchedule) => {
        return foodSchedule.id == action.payload.deletedFoodSchedule.id;
      });

      state.isLoading = false;
      state.foodSchedules.splice(indexToDelete)
      state.error = null;
    },
    deleteFoodScheduleFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    }
  }
});

export type RootState = SliceRootState<typeof slice>;

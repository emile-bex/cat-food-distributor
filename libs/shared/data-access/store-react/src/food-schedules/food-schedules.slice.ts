import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodSchedule } from '@cat-food-distributor/entities';
import { SliceRootState } from '../types';

export interface State {
  isLoading: boolean,
  error: string | null;
  foodSchedules: FoodSchedule[] | null
}

const initialState: State = {
  isLoading: false,
  foodSchedules: null,
  error: null,
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
      state.isLoading = false
      state.foodSchedules = action.payload.foodSchedules;
      state.error = null;
    },
    findAllFoodSchedulesFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  }
});

export type RootState = SliceRootState<typeof slice>;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceRootState } from '../../utils/types/SliceRootState';

export interface State {
  isLoading: boolean,
  token: string | null;
  error: string | null;
}

const initialState: State = {
  isLoading: false,
  token: null,
  error: null,
};

export const slice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequested(state, action: PayloadAction<{ distributorId: string }>) {
      state.isLoading = true;
      state.error = null;
    },
    loginSucceeded(state, action: PayloadAction<{ accessToken: string }>) {
      state.isLoading = false
      state.token = action.payload.accessToken;
      state.error = null;
    },
    loginFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  }
});

export type RootState = SliceRootState<typeof slice>;

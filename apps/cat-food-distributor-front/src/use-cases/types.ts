import { createSlice } from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';
import { makeStore } from './store';

export type UseCaseConfigItem = {
  slice: ReturnType<typeof createSlice>;
  saga: Saga;
};

export type UseCasesConfigType = Record<string, UseCaseConfigItem>;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

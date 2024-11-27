import { createSlice, Slice } from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';

export type UseCaseConfigItem = {
  slice: ReturnType<typeof createSlice>;
  saga: Saga;
};

export type UseCasesConfigType = Record<string, UseCaseConfigItem>;

export type SliceRootState<S extends Slice> = {
  [Key in S['name']]: ReturnType<S['getInitialState']>;
};

import { RootState } from './auth.slice';

export function selectIsLoading(state: RootState) {
  return state.authentication.isLoading;
}

export function selectToken(state: RootState) {
  return state.authentication.token;
}

export function selectLoginError(state: RootState) {
  return state.authentication.error;
}

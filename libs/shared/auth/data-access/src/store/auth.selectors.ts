import { RootState } from './auth.slice';

export function selectIsLoading(state: RootState) {
  return state.authentication.isLoading;
}

export function selectToken(state: RootState) {
  return state.authentication.token;
}

export function selectIsAuthenticated(state: RootState) {
  return !!selectToken(state);
}

export function selectIsFetchingToken(state: RootState) {
  return state.authentication.isFetchingToken;
}

export function selectLoginError(state: RootState) {
  return state.authentication.error;
}

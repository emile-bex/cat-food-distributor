import { call, fork, getContext, put, takeLatest } from 'typed-redux-saga';
import { slice } from './auth.slice';
import { AuthDependencies } from './index';

const {
  loginRequested,
  loginSucceeded,
  loginFailed,
  setAccessToken
} = slice.actions;

function* loginRequestedSaga(action: ReturnType<typeof loginRequested>) {
  try {
    const dependencies: AuthDependencies = yield getContext('dependencies');
    const { authGateway } = dependencies;
    const response = yield* call(authGateway.auth, action.payload);

    yield* put(
      loginSucceeded({
        accessToken: response.token
      })
    );
  } catch (error) {
    console.error(error);
    yield* put(
      loginFailed({
        error: 'Invalid Distributor ID'
      })
    );
  }
}

function* loginSucceededSaga(action: ReturnType<typeof loginSucceeded>) {
  const dependencies: AuthDependencies = yield getContext('dependencies');
  const { authTokenStorage } = dependencies;

  authTokenStorage.setToken(action.payload.accessToken);
}

function* initSaga() {
  const dependencies: AuthDependencies = yield getContext('dependencies');
  const { authTokenStorage } = dependencies;

  const accessToken = authTokenStorage.getToken();

  yield* put(setAccessToken(accessToken));
}

export function* saga() {
  yield* fork(initSaga);
  yield* takeLatest(loginRequested, loginRequestedSaga);
  yield* takeLatest(loginSucceeded, loginSucceededSaga);
}

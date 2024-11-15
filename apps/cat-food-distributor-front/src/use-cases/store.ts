import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, spawn, call } from 'typed-redux-saga';
import { UseCaseConfigItem } from './types';
import { useCasesConfigs } from './config';
import { AppDependencies } from './dependencies';
import { CookiesAuthTokenStorage, HTTPAuthGateway } from '../adapters';

const useCasesList = Object.values(useCasesConfigs) as UseCaseConfigItem[];

const reducers = useCasesList.reduce(
  (acc, { slice }) => ({
    ...acc,
    [slice.name]: slice.reducer
  }),
  {}
);

const dependencies: AppDependencies = {
  authGateway: new HTTPAuthGateway(),
  authTokenStorage: new CookiesAuthTokenStorage()
};

const sagaMiddleware = createSagaMiddleware({
  context: { dependencies }
});

export const makeStore = () => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    reducer: reducers
  });

  function* rootSaga() {
    yield* all(
      useCasesList
        .filter((useCase) => !!useCase.saga)
        .map((useCase) =>
          spawn(function* () {
            while (true) {
              try {
                yield* call(useCase.saga);
                break;
              } catch (error) {
                store.dispatch({
                  type: 'SAGA_ERROR',
                  error: error?.toString?.(),
                  useCaseName: useCase.slice.name
                });
              }
            }
          })
        )
    );
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

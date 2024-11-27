import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, spawn, call } from 'typed-redux-saga';
import { UseCaseConfigItem } from '../../store-types/src/types';
import { useCasesConfigs } from './config';
import { AppDependencies } from './dependencies';

const useCasesList = Object.values(useCasesConfigs) as UseCaseConfigItem[];

const reducers = useCasesList.reduce(
  (acc, { slice }) => ({
    ...acc,
    [slice.name]: slice.reducer
  }),
  {}
);


export const makeStore = (dependencies: AppDependencies) => {
  const sagaMiddleware = createSagaMiddleware({
    context: { dependencies }
  });

  const store = configureStore({
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(sagaMiddleware);
    },
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

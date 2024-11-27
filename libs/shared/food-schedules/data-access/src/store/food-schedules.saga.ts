import { call, getContext, put, takeLatest } from 'typed-redux-saga';
import { slice } from './food-schedules.slice';
import { FoodSchedulesDependencies } from './food-schedules.dependencies';

const {
  findAllFoodSchedulesRequested,
  findAllFoodSchedulesSucceeded,
  findAllFoodSchedulesFailed,
} = slice.actions;

function* findAllFoodSchedulesRequestedSaga(action: ReturnType<typeof findAllFoodSchedulesRequested>) {
  try {
    const dependencies: FoodSchedulesDependencies = yield getContext('dependencies');
    const { foodSchedulesGateway } = dependencies;
    const response = yield* call(() => foodSchedulesGateway.findAllFoodSchedules());

    yield* put(
      findAllFoodSchedulesSucceeded({
        foodSchedules: response.foodSchedules
      })
    );
  } catch (error) {
    console.error(error);
    yield* put(
      findAllFoodSchedulesFailed({
        error: 'An error has occurred'
      })
    );
  }
}

export function* saga() {
  yield* takeLatest(findAllFoodSchedulesRequested, findAllFoodSchedulesRequestedSaga);
}

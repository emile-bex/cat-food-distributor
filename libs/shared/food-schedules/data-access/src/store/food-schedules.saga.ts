import { call, getContext, put, takeLatest } from 'typed-redux-saga';
import { slice } from './food-schedules.slice';
import { FoodSchedulesDependencies } from './food-schedules.dependencies';

const {
  findAllFoodSchedulesRequested,
  findAllFoodSchedulesSucceeded,
  findAllFoodSchedulesFailed,
  updateFoodScheduleRequested,
  updateFoodScheduleSucceeded,
  updateFoodScheduleFailed,
  deleteFoodScheduleRequested,
  deleteFoodScheduleSucceeded,
  deleteFoodScheduleFailed
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

function* updateFoodScheduleRequestedSaga(action: ReturnType<typeof updateFoodScheduleRequested>) {
  try {
    const dependencies: FoodSchedulesDependencies = yield getContext('dependencies');
    const { foodSchedulesGateway } = dependencies;

    const {id, ...foodSchedule} = action.payload;

    const response = yield* call(() => foodSchedulesGateway.updateFoodSchedule(id, foodSchedule));

    yield* put(
      updateFoodScheduleSucceeded({
        updatedFoodSchedule: response.updatedFoodSchedule
      })
    );
  } catch (error) {
    console.error(error);
    yield* put(
      updateFoodScheduleFailed({
        error: 'An error has occurred'
      })
    );
  }
}

function* deleteFoodScheduleRequestedSaga(action: ReturnType<typeof deleteFoodScheduleRequested>) {
  try {
    const dependencies: FoodSchedulesDependencies = yield getContext('dependencies');
    const { foodSchedulesGateway } = dependencies;

    const {id} = action.payload;

    const response = yield* call(() => foodSchedulesGateway.deleteFoodSchedule(id));

    yield* put(
      deleteFoodScheduleSucceeded({
        deletedFoodSchedule: response.deletedFoodSchedule
      })
    );
  } catch (error) {
    console.error(error);
    yield* put(
      deleteFoodScheduleFailed({
        error: 'An error has occurred'
      })
    );
  }
}

export function* saga() {
  yield* takeLatest(findAllFoodSchedulesRequested, findAllFoodSchedulesRequestedSaga);
  yield* takeLatest(updateFoodScheduleRequested, updateFoodScheduleRequestedSaga);
  yield* takeLatest(deleteFoodScheduleRequested, deleteFoodScheduleRequestedSaga);
}

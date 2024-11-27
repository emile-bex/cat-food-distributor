'use client';

import {
  foodSchedulesActions,
  foodSchedulesSelectors,
  useAppDispatch,
  useAppSelector
} from '@cat-food-distributor/shared/data-access/store';
import { useEffect } from 'react';
import { assertIsDefined } from '../../utils/misc/asserts';
import { FoodSchedules } from './FoodSchedules';
import { Spinner } from '../components';

export function Home() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(foodSchedulesSelectors.selectIsLoading);
  const error = useAppSelector(foodSchedulesSelectors.selectError);
  const foodSchedules = useAppSelector(foodSchedulesSelectors.selectFoodSchedules);

  useEffect(() => {
    if (!foodSchedules) {
      dispatch(foodSchedulesActions.findAllFoodSchedulesRequested());
    }
  }, [dispatch, foodSchedules]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!foodSchedules || isLoading) {
    return <Spinner />;
  }

  assertIsDefined(foodSchedules);

  return <FoodSchedules foodSchedules={foodSchedules} />;
}

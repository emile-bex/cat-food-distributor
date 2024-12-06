'use client';

import { assertIsDefined } from '@cat-food-distributor/shared/util/asserts';
import { FoodScheduleList } from './FoodSchedules/FoodScheduleList';
import { Spinner } from '../components';
import { useFoodSchedules } from './FoodSchedules/useFoodSchedules';
import { Typography } from '@mui/material';
import { FoodScheduleItem } from './FoodSchedules/FoodScheduleItem';

export function Home() {
  const {
    foodSchedules,
    toggleFoodSchedule,
    updateFoodSchedule,
    deleteFoodSchedule,
    isLoading,
    error
  } = useFoodSchedules();

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!foodSchedules || isLoading) {
    return <Spinner />;
  }

  assertIsDefined(foodSchedules);

  const foodSchedulesList = foodSchedules.map((foodSchedule) => (
      <FoodScheduleItem
        key={foodSchedule.id}
        foodSchedule={foodSchedule}
        onActivateClick={() => toggleFoodSchedule(foodSchedule.id, foodSchedule.isActive)}
        onEditClick={() => updateFoodSchedule(foodSchedule.id, foodSchedule.cron)}
        onDeleteClick={() => {
          deleteFoodSchedule(foodSchedule.id);
        }}
      />
    ))
  ;


  return <FoodScheduleList foodSchedules={foodSchedulesList} />;
}

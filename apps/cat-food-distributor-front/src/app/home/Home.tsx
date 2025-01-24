import { assertIsDefined } from '@cat-food-distributor/shared/util/asserts';
import { FoodScheduleList } from './FoodSchedules/FoodScheduleList/FoodScheduleList';
import { Spinner } from '../components';
import { useFoodSchedules } from './FoodSchedules/useFoodSchedules';
import { Container, Fab, Typography } from '@mui/material';
import { FoodScheduleItem } from './FoodSchedules/FoodScheduleList/FoodScheduleItem/FoodScheduleItem';
import { NotificationAlert } from '../components/NotificationAlert';
import { Add } from '@mui/icons-material';

export function Home() {
  const {
    foodSchedules,
    createFoodSchedule,
    toggleFoodSchedule,
    updateFoodSchedule,
    deleteFoodSchedule,
    isLoading,
    error
  } = useFoodSchedules();

  if (!foodSchedules || isLoading) {
    return <>
      <Spinner />
      <NotificationAlert message={error} type="error" />
    </>;
  }

  assertIsDefined(foodSchedules);

  const foodSchedulesList = foodSchedules.map((foodSchedule) => (
      <FoodScheduleItem
        key={foodSchedule.id}
        foodSchedule={foodSchedule}
        onActivateClick={() => toggleFoodSchedule(foodSchedule.id, foodSchedule.isActive)}
        onEditClick={() => updateFoodSchedule(foodSchedule.id, foodSchedule.cron)}
        onDeleteClick={() => deleteFoodSchedule(foodSchedule.id)}
      />
    ))
  ;


  return <Container>
    <FoodScheduleList foodSchedules={foodSchedulesList} />
    <NotificationAlert message={error} type="error" />
    <Fab color="primary" size="small">
      <Add onClick={createFoodSchedule} />
    </Fab>
  </Container>;
}

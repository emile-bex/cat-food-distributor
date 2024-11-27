import { toString as cronToString } from 'cronstrue';
import { FoodSchedule } from '@cat-food-distributor/entities';

interface FoodSchedulesProps {
  foodSchedules: FoodSchedule[];
}

export function FoodSchedules({ foodSchedules }: FoodSchedulesProps) {
  if (foodSchedules.length === 0) {
    <div>No defined schedules</div>;
  }

  return (
    <div>
      {foodSchedules.map((foodSchedule) => {
        return (
          <div key={foodSchedule.id}>
            <span>{foodSchedule.id}</span>
            <span>{foodSchedule.distributorId}</span>
            <span>{foodSchedule.isActive}</span>
            <span>{cronToString(foodSchedule.cron)}</span>
          </div>
        );
      })}
    </div>);
}

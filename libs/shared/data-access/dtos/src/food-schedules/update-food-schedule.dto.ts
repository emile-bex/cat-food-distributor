import { IsBoolean } from 'class-validator';
import { FoodSchedule } from '@cat-food-distributor/entities';

export class UpdateFoodScheduleDto {
  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  cron: string;
}

export class UpdateFoodScheduleResponse {
  foodSchedule: FoodSchedule;
}

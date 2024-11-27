import { IsBoolean } from 'class-validator';
import { FoodSchedule } from '../entities';

export class UpdateFoodScheduleDto {
  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  cron: string;
}

export class UpdateFoodScheduleResponse {
  updatedFoodSchedule: FoodSchedule;
}

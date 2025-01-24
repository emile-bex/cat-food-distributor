import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { FoodSchedule } from '../entities';

export class UpdateFoodScheduleDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  cron?: string;
}

export class UpdateFoodScheduleResponse {
  updatedFoodSchedule: FoodSchedule;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodScheduleDto } from './create-food-schedule.dto';

export class UpdateFoodScheduleDto extends PartialType(CreateFoodScheduleDto) {
  cron: string;
  isActive: boolean;
}

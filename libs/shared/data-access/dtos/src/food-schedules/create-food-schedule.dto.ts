import { IsMACAddress, Matches } from 'class-validator';
import {
  FoodSchedule
} from '@cat-food-distributor/entities';

export class CreateFoodScheduleDto {
  @IsMACAddress()
  distributorId: string;

  @Matches(/((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/g)
  cron: string;
}

export class CreateFoodScheduleResponse {
  foodSchedule: FoodSchedule;
}

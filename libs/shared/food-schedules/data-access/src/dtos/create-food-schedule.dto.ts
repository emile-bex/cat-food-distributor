import { IsMACAddress, Matches } from 'class-validator';
import {
  FoodSchedule
} from '../entities';

export class CreateFoodScheduleDto {
  @IsMACAddress()
  distributorId: string;

  @Matches(/((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/g)
  cron: string;
}

export class CreateFoodScheduleResponse {
  createdFoodSchedule: FoodSchedule;
}

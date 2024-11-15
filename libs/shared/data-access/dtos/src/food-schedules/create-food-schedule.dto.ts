import { IsMACAddress, Matches } from 'class-validator';

export class CreateFoodScheduleDto {
  @IsMACAddress()
  distributorId: string;

  @Matches(/((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/g)
  cron: string;
}

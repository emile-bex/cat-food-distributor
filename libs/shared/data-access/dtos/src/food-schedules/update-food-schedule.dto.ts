import { IsBoolean } from 'class-validator';

export class UpdateFoodScheduleDto {
  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  cron: string;
}

import { IsBoolean } from 'class-validator';

export class UpdateFoodServingDto {
  @IsBoolean()
  isConfirmed: boolean;
}

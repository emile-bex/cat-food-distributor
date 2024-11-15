import { IsUUID } from 'class-validator';

export class ConfirmFoodServingDto {
  @IsUUID()
  foodServingId: string;
}

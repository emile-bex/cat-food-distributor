import { IsMACAddress } from 'class-validator';

export class CreateFoodServingDto {
  @IsMACAddress()
  distributorId: string
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodServingDto } from './create-food-serving.dto';

export class UpdateFoodServingDto extends PartialType(CreateFoodServingDto){
  isConfirmed: boolean;
}

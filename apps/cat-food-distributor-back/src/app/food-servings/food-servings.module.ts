import { Module } from '@nestjs/common';
import { FoodServingsService } from './food-servings.service';
import { FoodServing } from "../../../../../libs/shared/data-access/entities/src/food-servings/food-serving.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([FoodServing])],
  providers: [FoodServingsService],
  exports: [FoodServingsService]
})
export class FoodServingsModule {}

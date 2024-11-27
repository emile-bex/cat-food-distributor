import { Module } from '@nestjs/common';
import { FoodServingsService } from './food-servings.service';
import { FoodServing } from "../../../../../libs/shared/food-servings/data-access/src/entities/food-serving.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([FoodServing])],
  providers: [FoodServingsService],
  exports: [FoodServingsService]
})
export class FoodServingsModule {}

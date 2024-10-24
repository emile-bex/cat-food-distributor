import { Module } from '@nestjs/common';
import { FoodServingsService } from './food-servings.service';
import { FoodServingsController } from './food-servings.controller';
import { FoodServing } from "./entities/food-serving.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EmitorModule } from "../emitor/emitor.module"

@Module({
  imports: [TypeOrmModule.forFeature([FoodServing]), EmitorModule],
  controllers: [FoodServingsController],
  providers: [FoodServingsService],
  exports: [FoodServingsService]
})
export class FoodServingsModule {}

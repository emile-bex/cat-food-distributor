import { Module } from '@nestjs/common'
import { FoodSchedulesService } from './food-schedules.service'
import { FoodSchedulesController } from './food-schedules.controller'
import { TypeOrmModule } from "@nestjs/typeorm"
import { FoodSchedule } from "./entities/food-schedule.entity"
import { FoodServingsModule } from '../food-servings/food-servings.module';
import { DistributorsModule } from '../distributors/distributors.module';

@Module({
  imports: [TypeOrmModule.forFeature([FoodSchedule]), FoodServingsModule, DistributorsModule],
  controllers: [FoodSchedulesController],
  providers: [FoodSchedulesService],
  exports: [FoodSchedulesService],
})
export class FoodSchedulesModule {
}

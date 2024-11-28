import { Module } from '@nestjs/common';

import { FoodServingsModule } from './food-servings/food-servings.module';
import { DistributorsModule } from './distributors/distributors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodSchedulesModule } from './food-schedules/food-schedules.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

import { dataSourceOptions } from '../../typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ScheduleModule.forRoot(),
    AuthModule,
    FoodServingsModule,
    DistributorsModule,
    FoodSchedulesModule
  ],
  controllers: []
})
export class AppModule {
}

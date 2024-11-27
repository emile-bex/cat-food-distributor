import { Module } from '@nestjs/common';

import { FoodServingsModule } from './food-servings/food-servings.module';
import { DistributorsModule } from './distributors/distributors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodSchedulesModule } from './food-schedules/food-schedules.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { FoodServing } from '@cat-food-distributor/shared/food-servings/data-access';
import { Distributor } from '@cat-food-distributor/shared/distributors/data-access';
import { FoodSchedule } from '@cat-food-distributor/shared/food-schedules/data-access';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [FoodServing, Distributor, FoodSchedule],
    }),
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

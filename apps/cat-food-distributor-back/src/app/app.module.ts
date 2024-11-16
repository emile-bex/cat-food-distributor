import { Module } from '@nestjs/common';

import { FoodServingsModule } from './food-servings/food-servings.module';
import { DistributorsModule } from './distributors/distributors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodServing, Distributor, FoodSchedule } from '@cat-food-distributor/entities';
import { FoodSchedulesModule } from './food-schedules/food-schedules.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

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
      synchronize: true
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

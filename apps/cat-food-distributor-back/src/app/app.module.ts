import { Module } from '@nestjs/common'

import { FoodServingsModule } from './food-servings/food-servings.module'
import { DistributorsModule } from './distributors/distributors.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FoodServing } from './food-servings/entities/food-serving.entity'
import { EmitorModule } from "./emitor/emitor.module"
import { Distributor } from "./distributors/entities/distributor.entity"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [FoodServing, Distributor],
      synchronize: true,
    }),
    FoodServingsModule,
    DistributorsModule,
    EmitorModule,
  ],
  controllers: [],
})
export class AppModule {
}

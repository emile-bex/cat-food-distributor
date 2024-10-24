import { Module } from '@nestjs/common'
import { DistributorsService } from './distributors.service'
import { DistributorsGateway } from './distributors.gateway'
import { FoodServingsModule } from "../food-servings/food-servings.module"
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Distributor } from "./entities/distributor.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Distributor]), JwtModule.register({
    secret: process.env.SECRET,
  }), FoodServingsModule],
  providers: [DistributorsGateway, DistributorsService],
})
export class DistributorsModule {
}

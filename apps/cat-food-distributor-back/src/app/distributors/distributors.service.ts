import { Injectable } from '@nestjs/common'
import { FoodServingsService } from "../food-servings/food-servings.service"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Distributor } from "./entities/distributor.entity"
import { CreateDistributorDto } from "./dto/create-distributor.dto"

@Injectable()
export class DistributorsService {
  constructor(@InjectRepository(Distributor)
              private distributorRepository: Repository<Distributor>, private foodServingsService: FoodServingsService, private jwtService: JwtService) {
  }

  create(createDistributorDto: CreateDistributorDto) {
    return this.distributorRepository.create(createDistributorDto)
  }

  findOneByDistributorId(distributorId: string) {
    return this.distributorRepository.findOneBy({distributorId})
  }

  upsertByDistributorId(createDistributorDto: CreateDistributorDto) {
    return this.distributorRepository.upsert(createDistributorDto, ["distributorId"]);
  }

  deleteBySocketId(socketId: string) {
    return this.distributorRepository.delete({socketId: socketId});
  }

  checkIdentification(token: string) {
    try {
      this.jwtService.verify(token)
      const {id} = this.jwtService.decode(token)
      return id
    } catch (err) {
      console.error(err)
      return false
    }
  }

  foodServedConfirmation(id: number) {
    return this.foodServingsService.update(id, {isConfirmed: true})
  }
}

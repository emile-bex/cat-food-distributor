import { Injectable } from '@nestjs/common'
import { CreateFoodServingDto } from './dto/create-food-serving.dto'
import { UpdateFoodServingDto } from './dto/update-food-serving.dto'
import { InjectRepository } from "@nestjs/typeorm"
import { FoodServing } from "./entities/food-serving.entity"
import { Repository } from "typeorm"
import { EmitorService } from "../emitor/emitor.service"
import moment from 'moment'

@Injectable()
export class FoodServingsService {
  constructor(
    @InjectRepository(FoodServing)
    private foodServingRepository: Repository<FoodServing>,
    private emitorService: EmitorService,
  ) {
  }

  create(createFoodServingDto: CreateFoodServingDto) {
    return this.foodServingRepository.insert({...createFoodServingDto, dateTime: moment().toISOString()})
  }

  findOne(id: string) {
    return this.foodServingRepository.findOneBy({id})
  }

  update(id: number, updateFoodServingDto: UpdateFoodServingDto) {
    return this.foodServingRepository.update(id, updateFoodServingDto)
  }

  serveFood(distributorId: string) {
   return this.emitorService.serveFood(distributorId)
  }
}

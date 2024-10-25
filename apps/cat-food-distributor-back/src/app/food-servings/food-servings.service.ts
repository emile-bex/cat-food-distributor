import { Injectable } from '@nestjs/common';
import { CreateFoodServingDto } from './dto/create-food-serving.dto';
import { UpdateFoodServingDto } from './dto/update-food-serving.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodServing } from './entities/food-serving.entity';
import { Repository } from 'typeorm';
import moment from 'moment';

@Injectable()
export class FoodServingsService {
  constructor(
    @InjectRepository(FoodServing)
    private foodServingRepository: Repository<FoodServing>
  ) {
  }

  create(createFoodServingDto: CreateFoodServingDto) {
    const foodServingToCreate = this.foodServingRepository.create({ ...createFoodServingDto, dateTime: moment().toISOString() })
    return this.foodServingRepository.save(foodServingToCreate);
  }

  findOne(id: string) {
    return this.foodServingRepository.findOneBy({ id });
  }

  update(id: string, updateFoodServingDto: UpdateFoodServingDto) {
    const foodServingToUpdate = this.foodServingRepository.create({...updateFoodServingDto, id })
    return this.foodServingRepository.save(foodServingToUpdate);
  }
}

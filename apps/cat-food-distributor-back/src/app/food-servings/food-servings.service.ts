import { Injectable } from '@nestjs/common';
import { CreateFoodServingDto, UpdateFoodServingDto } from '@cat-food-distributor/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodServing } from '@cat-food-distributor/entities';
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
    const foodServingToCreate = this.foodServingRepository.create({
      ...createFoodServingDto,
      dateTime: moment().toISOString()
    });
    return this.foodServingRepository.save(foodServingToCreate);
  }

  findAllByDistributorIdAndNotConfirmed(distributorId: string) {
    return this.foodServingRepository.findBy({
      distributorId, isConfirmed: false
    });
  }

  findOneByIdAndDistributorId(id: string, distributorId: string) {
    return this.foodServingRepository.findOneBy({ id, distributorId });
  }

  async update(id: string, updateFoodServingDto: UpdateFoodServingDto) {
    await this.foodServingRepository.update(id, updateFoodServingDto);
    return this.foodServingRepository.findOneBy({ id });
  }
}

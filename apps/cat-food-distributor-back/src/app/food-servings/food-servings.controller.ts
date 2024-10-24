import {
  Controller,
  Post,
  Body,



} from '@nestjs/common';
import { FoodServingsService } from './food-servings.service';
import { CreateFoodServingDto } from './dto/create-food-serving.dto';

@Controller('food-servings')
export class FoodServingsController {
  constructor(private readonly foodServingsService: FoodServingsService) {}

  @Post()
  async create(@Body() createFoodServingDto: CreateFoodServingDto) {
    const createdFoodServing = await this.foodServingsService.create(createFoodServingDto);
    this.foodServingsService.serveFood(createFoodServingDto.distributorId)
    return createdFoodServing
  }

}

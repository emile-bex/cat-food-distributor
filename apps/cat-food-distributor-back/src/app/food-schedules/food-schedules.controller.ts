import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, NotFoundException
} from '@nestjs/common';
import { FoodSchedulesService } from './food-schedules.service';
import { CreateFoodScheduleDto } from './dto/create-food-schedule.dto';
import { UpdateFoodScheduleDto } from './dto/update-food-schedule.dto';
import { DistributorId } from '../auth/distributor-id.decorator';

@Controller('food-schedules')
export class FoodSchedulesController {
  constructor(private readonly foodSchedulesService: FoodSchedulesService) {
  }

  @Post()
  async create(@DistributorId() distributorId: string, @Body() createFoodScheduleDto: CreateFoodScheduleDto) {
    const createdFoodSchedule = await this.foodSchedulesService.create({ distributorId, ...createFoodScheduleDto });
    this.foodSchedulesService.createJob(createdFoodSchedule);
    return createdFoodSchedule;
  }

  @Get()
  findAll(@DistributorId() distributorId: string) {
    return this.foodSchedulesService.findAllByDistributorId(distributorId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foodSchedule = await this.foodSchedulesService.findOne(id);
    if (!foodSchedule) {
      throw new NotFoundException();
    }

    return foodSchedule;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFoodScheduleDto: UpdateFoodScheduleDto
  ) {
    const foodScheduleToUpdate = this.foodSchedulesService.findOne(id);

    if (!foodScheduleToUpdate) {
      throw new NotFoundException();
    }

    const updatedFoodSchedule = await this.foodSchedulesService.update(id, updateFoodScheduleDto);
    this.foodSchedulesService.updateJob(updatedFoodSchedule);
    return updatedFoodSchedule;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const foodScheduleToRemove = this.foodSchedulesService.findOne(id);

    if (!foodScheduleToRemove) {
      throw new NotFoundException();
    }

    const deletedFoodSchedule = await this.foodSchedulesService.remove(id);
    this.foodSchedulesService.deleteJob(deletedFoodSchedule);
    return deletedFoodSchedule;
  }
}

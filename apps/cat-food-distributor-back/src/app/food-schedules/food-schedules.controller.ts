import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, NotFoundException, ForbiddenException, ParseUUIDPipe
} from '@nestjs/common';
import { FoodSchedulesService } from './food-schedules.service';
import { CreateFoodScheduleDto, UpdateFoodScheduleDto } from '@cat-food-distributor/dtos';
import { DistributorId } from '../auth/distributor-id.decorator';

@Controller('food-schedules')
export class FoodSchedulesController {
  constructor(private readonly foodSchedulesService: FoodSchedulesService) {
  }

  @Post()
  async create(@DistributorId() distributorId: string, @Body() createFoodScheduleDto: CreateFoodScheduleDto) {
    if (distributorId !== createFoodScheduleDto.distributorId) {
      throw new ForbiddenException();
    }
    const createdFoodSchedule = await this.foodSchedulesService.create(createFoodScheduleDto);
    this.foodSchedulesService.createJob(createdFoodSchedule);
    return createdFoodSchedule;
  }

  @Get()
  findAll(@DistributorId() distributorId: string) {
    return this.foodSchedulesService.findAllByDistributorId(distributorId);
  }

  @Get(':id')
  async findOne(@DistributorId() distributorId: string, @Param('id', ParseUUIDPipe) id: string) {
    const foodSchedule = await this.foodSchedulesService.findOneByIdAndDistributorId(id, distributorId);

    if (!foodSchedule) {
      throw new NotFoundException();
    }

    return foodSchedule;
  }

  @Patch(':id')
  async update(
    @DistributorId() distributorId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFoodScheduleDto: UpdateFoodScheduleDto
  ) {
    const foodScheduleToUpdate = this.foodSchedulesService.findOneByIdAndDistributorId(id, distributorId);

    if (!foodScheduleToUpdate) {
      throw new NotFoundException();
    }

    const updatedFoodSchedule = await this.foodSchedulesService.update(id, updateFoodScheduleDto);
    this.foodSchedulesService.updateJob(updatedFoodSchedule);
    return updatedFoodSchedule;
  }

  @Delete(':id')
  async remove(@DistributorId() distributorId: string, @Param('id', ParseUUIDPipe) id: string) {
    const foodScheduleToRemove = this.foodSchedulesService.findOneByIdAndDistributorId(id, distributorId);

    if (!foodScheduleToRemove) {
      throw new NotFoundException();
    }

    const deletedFoodSchedule = await this.foodSchedulesService.remove(id);
    this.foodSchedulesService.deleteJob(deletedFoodSchedule);
    return deletedFoodSchedule;
  }
}

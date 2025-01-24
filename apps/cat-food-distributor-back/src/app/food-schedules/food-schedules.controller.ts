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
import {
  CreateFoodScheduleDto,
  CreateFoodScheduleResponse, DeleteFoodScheduleResponse,
  FindAllFoodSchedulesResponse, FindOneFoodScheduleResponse,
  UpdateFoodScheduleDto, UpdateFoodScheduleResponse
} from '@cat-food-distributor/shared/food-schedules/data-access';
import { DistributorId } from '../auth/distributor-id.decorator';


@Controller('food-schedules')
export class FoodSchedulesController {
  constructor(private readonly foodSchedulesService: FoodSchedulesService) {
  }

  @Post()
  async create(@DistributorId() distributorId: string, @Body() createFoodScheduleDto: CreateFoodScheduleDto): Promise<CreateFoodScheduleResponse> {
    const createdFoodSchedule = await this.foodSchedulesService.create(distributorId, createFoodScheduleDto);
    this.foodSchedulesService.createJob(createdFoodSchedule);

    return { createdFoodSchedule };
  }

  @Get()
  async findAll(@DistributorId() distributorId: string): Promise<FindAllFoodSchedulesResponse> {
    const foodSchedules = await this.foodSchedulesService.findAllByDistributorId(distributorId);

    return { foodSchedules };
  }

  @Get(':id')
  async findOne(@DistributorId() distributorId: string, @Param('id', ParseUUIDPipe) id: string): Promise<FindOneFoodScheduleResponse> {
    const foodSchedule = await this.foodSchedulesService.findOneByIdAndDistributorId(id, distributorId);

    if (!foodSchedule) {
      throw new NotFoundException();
    }

    return { foodSchedule };
  }

  @Patch(':id')
  async update(
    @DistributorId() distributorId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFoodScheduleDto: UpdateFoodScheduleDto
  ): Promise<UpdateFoodScheduleResponse> {
    const foodScheduleToUpdate = this.foodSchedulesService.findOneByIdAndDistributorId(id, distributorId);

    if (!foodScheduleToUpdate) {
      throw new NotFoundException();
    }

    const updatedFoodSchedule = await this.foodSchedulesService.update(id, updateFoodScheduleDto);
    this.foodSchedulesService.updateJob(updatedFoodSchedule);
    return { updatedFoodSchedule };
  }

  @Delete(':id')
  async remove(@DistributorId() distributorId: string, @Param('id', ParseUUIDPipe) id: string): Promise<DeleteFoodScheduleResponse> {
    const foodScheduleToRemove = this.foodSchedulesService.findOneByIdAndDistributorId(id, distributorId);

    if (!foodScheduleToRemove) {
      throw new NotFoundException();
    }

    const deletedFoodSchedule = await this.foodSchedulesService.remove(id);
    this.foodSchedulesService.deleteJob(deletedFoodSchedule);

    return { deletedFoodSchedule };
  }
}

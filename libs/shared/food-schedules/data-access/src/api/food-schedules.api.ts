import { AxiosInstance, AxiosResponse } from 'axios';
import {
  CreateFoodScheduleDto,
  CreateFoodScheduleResponse, DeleteFoodScheduleResponse,
  FindAllFoodSchedulesResponse, UpdateFoodScheduleDto, UpdateFoodScheduleResponse
} from '@cat-food-distributor/shared/food-schedules/data-access';

export class FoodSchedulesApi {
  private instance;

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  findAllFoodSchedules(): Promise<AxiosResponse<FindAllFoodSchedulesResponse>> {
    return this.instance.get('food-schedules');
  }

  createFoodSchedule(createFoodScheduleDto: CreateFoodScheduleDto): Promise<AxiosResponse<CreateFoodScheduleResponse>> {
    return this.instance.post('food-schedules', createFoodScheduleDto);
  }

  updateFoodSchedule(foodScheduleId: string, updateFoodScheduleDto: UpdateFoodScheduleDto): Promise<AxiosResponse<UpdateFoodScheduleResponse>> {
    return this.instance.patch(`food-schedules/${foodScheduleId}`, updateFoodScheduleDto);
  }

  deleteFoodSchedule(foodScheduleId: string): Promise<AxiosResponse<DeleteFoodScheduleResponse>> {
    return this.instance.delete(`food-schedule/${foodScheduleId}`);
  }

}

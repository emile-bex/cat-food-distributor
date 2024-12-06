import {
  CreateFoodScheduleDto,
  UpdateFoodScheduleDto,
  IFoodSchedulesGateway,
  FoodSchedulesApi
} from '@cat-food-distributor/shared/food-schedules/data-access';
import { getApiInstance } from '../../services/api';

export class HTTPFoodSchedulesGateway implements IFoodSchedulesGateway {
  private foodSchedulesApi;

  constructor() {
    const instance = getApiInstance();
    this.foodSchedulesApi = new FoodSchedulesApi(instance);
  }

  async findAllFoodSchedules() {
    const { data } = await  this.foodSchedulesApi.findAllFoodSchedules();
    return data;
  }

  async createFoodSchedule(createFoodScheduleDto: CreateFoodScheduleDto) {
    const { data } = await this.foodSchedulesApi.createFoodSchedule(createFoodScheduleDto);
    return data;
  }

  async updateFoodSchedule(foodScheduleId: string, updateFoodScheduleDto: UpdateFoodScheduleDto) {
    const { data } = await this.foodSchedulesApi.updateFoodSchedule(foodScheduleId, updateFoodScheduleDto);
    return data;
  }

  async deleteFoodSchedule(foodScheduleId: string) {
    const { data } = await this.foodSchedulesApi.deleteFoodSchedule(foodScheduleId);
    return data;
  }
}

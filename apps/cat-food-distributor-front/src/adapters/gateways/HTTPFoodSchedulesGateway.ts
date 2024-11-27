import {
  CreateFoodScheduleDto,
  CreateFoodScheduleResponse, DeleteFoodScheduleResponse,
  FindAllFoodSchedulesResponse, UpdateFoodScheduleDto, UpdateFoodScheduleResponse
} from '@cat-food-distributor/dtos';
import { Api } from '../../services/api';
import { IFoodSchedulesGateway } from '@cat-food-distributor/shared/data-access/store';

export class HTTPFoodSchedulesGateway implements IFoodSchedulesGateway {
  async findAllFoodSchedules(): Promise<FindAllFoodSchedulesResponse> {
    const { data } = await Api.findAllFoodSchedules();
    return data;
  }

  async createFoodSchedule(createFoodScheduleDto: CreateFoodScheduleDto): Promise<CreateFoodScheduleResponse> {
    const { data } = await Api.createFoodSchedule(createFoodScheduleDto);
    return data;
  }

  async updateFoodSchedule(foodScheduleId: string, updateFoodScheduleDto: UpdateFoodScheduleDto): Promise<UpdateFoodScheduleResponse> {
    const { data } = await Api.updateFoodSchedule(foodScheduleId, updateFoodScheduleDto);
    return data;
  }

  async deleteFoodSchedule(foodScheduleId: string): Promise<DeleteFoodScheduleResponse> {
    const { data } = await Api.deleteFoodSchedule(foodScheduleId);
    return data;
  }
}

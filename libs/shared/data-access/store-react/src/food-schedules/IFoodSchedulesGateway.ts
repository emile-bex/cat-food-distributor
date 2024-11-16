import {
  CreateFoodScheduleDto,
  CreateFoodScheduleResponse,
  DeleteFoodScheduleResponse,
  FindAllFoodSchedulesResponse, UpdateFoodScheduleDto, UpdateFoodScheduleResponse
} from '@cat-food-distributor/dtos';

export interface IFoodSchedulesGateway {
  findAllFoodSchedules(): Promise<FindAllFoodSchedulesResponse>;
  createFoodSchedule(createFoodScheduleDto: CreateFoodScheduleDto): Promise<CreateFoodScheduleResponse>;
  updateFoodSchedule(foodScheduleId: string, updateFoodSchedule: UpdateFoodScheduleDto): Promise<UpdateFoodScheduleResponse>;
  deleteFoodSchedule(foodScheduleId: string): Promise<DeleteFoodScheduleResponse>;
}

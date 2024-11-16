import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  AuthDto,
  CreateFoodScheduleDto,
  CreateFoodScheduleResponse,
  UpdateFoodScheduleDto, UpdateFoodScheduleResponse, DeleteFoodScheduleResponse,
  FindAllFoodSchedulesResponse
} from '@cat-food-distributor/dtos';
import { addAxiosInterceptors } from './interceptor';
import { AuthResponse } from '@cat-food-distributor/dtos';

export class Api {
  private instance: AxiosInstance;

  constructor(baseUrl: string | undefined, getToken: () => string | null) {
    this.instance = axios.create({
        baseURL: baseUrl,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    addAxiosInterceptors(this.instance, getToken);
  }


  auth(authDto: AuthDto): Promise<AxiosResponse<AuthResponse>> {
    return this.instance.post('auth', authDto);
  }

  findAllFoodSchedules(): Promise<AxiosResponse<FindAllFoodSchedulesResponse>> {
    return this.instance.post('food-schedules');
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

import axios, { AxiosResponse } from 'axios';
import { AuthDto, CreateFoodScheduleDto, UpdateFoodScheduleDto } from '@cat-food-distributor/dtos';
import { addAxiosInterceptors } from './interceptor';
import { AuthResponse } from '@cat-food-distributor/dtos';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
);

addAxiosInterceptors(instance);

export function auth(authDto: AuthDto): Promise<AxiosResponse<AuthResponse>> {
  return instance.post('auth', authDto);
}

export function createFoodSchedule(createFoodScheduleDto: CreateFoodScheduleDto) {
  return instance.post('food-schedules', createFoodScheduleDto);
}

export function updateFoodSchedule(updateFoodScheduleDto: UpdateFoodScheduleDto) {
  return instance.patch('food-schedules', updateFoodScheduleDto);
}

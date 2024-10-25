import { Test, TestingModule } from '@nestjs/testing';
import { FoodSchedulesService } from './food-schedules.service';

describe('FoodSchedulesService', () => {
  let service: FoodSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodSchedulesService],
    }).compile();

    service = module.get<FoodSchedulesService>(FoodSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FoodSchedulesController } from './food-schedules.controller';
import { FoodSchedulesService } from './food-schedules.service';

describe('FoodSchedulesController', () => {
  let controller: FoodSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodSchedulesController],
      providers: [FoodSchedulesService],
    }).compile();

    controller = module.get<FoodSchedulesController>(FoodSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

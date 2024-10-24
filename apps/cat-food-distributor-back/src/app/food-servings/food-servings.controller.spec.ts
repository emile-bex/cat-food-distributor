import { Test, TestingModule } from '@nestjs/testing';
import { FoodServingsController } from './food-servings.controller';
import { FoodServingsService } from './food-servings.service';

describe('FoodServingsController', () => {
  let controller: FoodServingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodServingsController],
      providers: [FoodServingsService],
    }).compile();

    controller = module.get<FoodServingsController>(FoodServingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

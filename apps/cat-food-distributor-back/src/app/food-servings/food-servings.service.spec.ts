import { Test, TestingModule } from '@nestjs/testing';
import { FoodServingsService } from './food-servings.service';

describe('FoodServingsService', () => {
  let service: FoodServingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodServingsService],
    }).compile();

    service = module.get<FoodServingsService>(FoodServingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

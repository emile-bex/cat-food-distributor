import { Test, TestingModule } from '@nestjs/testing';
import { EmitorService } from './emitor.service';

describe('EmitorService', () => {
  let service: EmitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmitorService],
    }).compile();

    service = module.get<EmitorService>(EmitorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

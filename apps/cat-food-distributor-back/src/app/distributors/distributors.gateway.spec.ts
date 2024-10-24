import { Test, TestingModule } from '@nestjs/testing';
import { DistributorsGateway } from './distributors.gateway';
import { DistributorsService } from './distributors.service';

describe('DistributorGateway', () => {
  let gateway: DistributorsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributorsGateway, DistributorsService],
    }).compile();

    gateway = module.get<DistributorsGateway>(DistributorsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Distributor } from '../distributors/entities/distributor.entity';

export const DistributorId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const distributor: Distributor = request.distributor;
    return distributor['distributorId']
  }
);

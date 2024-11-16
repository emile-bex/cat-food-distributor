import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Distributor } from '../../../../../libs/shared/data-access/entities/src/distributors/distributor.entity';

export const DistributorId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const distributor: Distributor = request.distributor;
    return distributor['distributorId']
  }
);

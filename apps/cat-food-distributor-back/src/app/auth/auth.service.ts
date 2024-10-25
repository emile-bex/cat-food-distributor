

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DistributorsService } from '../distributors/distributors.service';

@Injectable()
export class AuthService {
  constructor(
    private distributorsService: DistributorsService,
    private jwtService: JwtService
  ) {}

  async signIn(
    distributorId: string
  ): Promise<{ token: string }> {
    const distributor = await this.distributorsService.findOneByDistributorId(distributorId);
    if (!distributor?.isAuthorized) {
      throw new UnauthorizedException();
    }
    const payload = { sub: distributorId };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}

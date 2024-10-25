import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { DistributorsModule } from '../distributors/distributors.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    DistributorsModule,
    JwtModule.register({
      secret: process.env.API_SECRET
    })
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }, AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
}

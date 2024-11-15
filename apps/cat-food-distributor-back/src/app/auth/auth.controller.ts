
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { AuthDto, AuthResponse } from '@cat-food-distributor/dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @Public()
  signIn(@Body() body: AuthDto): Promise<AuthResponse> {
    return this.authService.signIn(body.distributorId);
  }
}

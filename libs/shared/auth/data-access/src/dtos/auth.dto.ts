import { IsMACAddress } from 'class-validator';

export class AuthDto {
  @IsMACAddress()
  distributorId: string
}

export class AuthResponse {
  token: string;
}

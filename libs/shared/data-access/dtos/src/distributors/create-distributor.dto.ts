import { IsBoolean, IsMACAddress, IsString } from 'class-validator';

export class CreateDistributorDto {
  @IsString()
  socketId: string;

  @IsMACAddress()
  distributorId: string;

  @IsBoolean()
  isAuthorized: boolean;

  @IsBoolean()
  isConnected: boolean;
}

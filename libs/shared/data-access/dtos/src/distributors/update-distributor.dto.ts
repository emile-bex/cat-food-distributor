import { IsBoolean, IsString } from 'class-validator';

export class UpdateDistributorDto {
  @IsString()
  socketId: string

  @IsBoolean()
  isConnected: boolean;
}

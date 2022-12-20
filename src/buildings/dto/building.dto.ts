import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class GetBuildingsDto {
  @ApiProperty({ default: 10 })
  @IsNumberString()
  limit: number;

  @ApiProperty({ default: 1 })
  @IsNumberString()
  startAfter: number;
}

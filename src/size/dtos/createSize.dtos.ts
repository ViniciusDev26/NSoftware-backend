import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export abstract class createSizeDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @Type(() => Number)
  companyId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class GetOrdertDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  page: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  userId?: string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  companyId: number;
}

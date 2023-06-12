import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class GetOrdertDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;

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
  @IsOptional()
  companyId: number;

  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty()
  priority: boolean;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  status: string;

  @Type(() => String)
  @ApiProperty()
  @IsString()
  obs: string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  sizeId: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  productId: number;
}

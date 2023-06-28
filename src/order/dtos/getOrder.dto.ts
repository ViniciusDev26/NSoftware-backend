import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class GetOrdertDTO {
  @IsString()
  @ApiProperty()
  id: string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  page: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  userId?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  companyId: string;

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

  @IsString()
  @ApiProperty()
  sizeId: string;

  @IsString()
  @ApiProperty()
  productId: string;
}

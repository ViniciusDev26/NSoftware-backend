import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export abstract class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @ApiProperty()
  @Type(() => String)
  name: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  value: number;

  @IsString()
  @ApiProperty()
  @Type(() => String)
  image: string;

  @IsString()
  @IsNotEmpty()
  sizeName: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export abstract class companiesDTO {
  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  companyId: number;

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

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  recipeId: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  orderId: number;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  sizeId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export abstract class CreateProductDTO {
  @IsString({ each: true })
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @ApiProperty()
  @Type(() => String)
  name: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  price: number;

  @IsString({ each: true })
  @IsNotEmpty()
  sizeName: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsBoolean()
  @Type(() => Boolean)
  onlyCombo: boolean;
}

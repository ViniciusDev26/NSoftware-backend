import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCombroDTO {
  @IsNotEmpty()
  @IsString()
  companyId: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString({ each: true })
  productsId: string;
}

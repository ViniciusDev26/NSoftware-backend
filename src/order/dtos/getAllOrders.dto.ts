import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class getAllOrdersDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @IsNumber()
  @Type(() => Number)
  page: number;
}

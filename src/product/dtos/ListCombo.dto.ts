import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ListComboDTO {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsString()
  @IsNotEmpty()
  companyId: string;
}

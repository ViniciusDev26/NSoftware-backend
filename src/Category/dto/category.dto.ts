import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CategoryDTO {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  category: string;

  @ApiProperty()
  @IsNumber()
  companyId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CategoryDTO {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  category: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  companyId: number;
}

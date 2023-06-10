import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export abstract class getCompanyDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;
}

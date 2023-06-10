import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export abstract class getEmployeeDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  codeEmployee: number;
}

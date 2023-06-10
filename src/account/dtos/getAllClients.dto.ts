import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export abstract class getAllClientsDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  companyId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export abstract class CreateAccountDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  companyId: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  codeEmployee: number;

  @IsMobilePhone('pt-BR')
  @IsOptional()
  @ApiProperty()
  contact: string;
}

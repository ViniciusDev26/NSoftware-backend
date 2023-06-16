import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  companyId: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  codeEmployee: number;
}

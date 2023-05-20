import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/shared/enums/Role';

export abstract class CreateAccountDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class uploadEmployeeDTO {
  @IsString()
  id: string;
  @IsString()
  companyId: string;
  @IsString()
  AddressId: string;
  @IsString()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  password: string;
  @IsString()
  roleId: string;
  @IsNumber()
  wage: number;
  @IsString()
  obs: string;
  @IsNumber()
  @Type(() => Number)
  codeEmployee: number;
}

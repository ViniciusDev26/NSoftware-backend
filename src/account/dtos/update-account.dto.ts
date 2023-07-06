import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateAccountDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  roleId: string;

  @IsNumber()
  @Type(() => Number)
  wage: number;
  @IsString()
  addressId: string;
}

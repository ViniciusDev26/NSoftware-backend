import { IsEmail, IsString } from 'class-validator';

export abstract class CreateAccountDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

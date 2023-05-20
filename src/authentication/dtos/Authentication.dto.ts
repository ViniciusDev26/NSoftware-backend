import { IsEmail, IsString } from 'class-validator';

export class AuthenticationDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

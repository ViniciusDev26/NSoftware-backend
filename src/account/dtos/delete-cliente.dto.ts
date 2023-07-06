import { IsEmail, IsNotEmpty } from 'class-validator';

export class deteleClienteDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

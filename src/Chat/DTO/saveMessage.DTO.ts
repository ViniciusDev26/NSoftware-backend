import { IsNotEmpty, IsString } from 'class-validator';

export class SaveMessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

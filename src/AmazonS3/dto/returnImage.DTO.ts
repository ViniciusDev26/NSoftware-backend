import { IsNotEmpty, IsString } from 'class-validator';

export class ReturnImageDTO {
  @IsString()
  @IsNotEmpty()
  key: string;
}

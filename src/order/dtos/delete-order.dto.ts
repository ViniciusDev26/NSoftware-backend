import { IsNotEmpty, IsString } from 'class-validator';

export class deleteOrderDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

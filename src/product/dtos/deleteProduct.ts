import { IsNotEmpty, IsString } from 'class-validator';

export class deleteProductDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

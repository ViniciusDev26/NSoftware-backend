import { IsNotEmpty, IsNumber } from 'class-validator';

export abstract class GetProductById {
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}

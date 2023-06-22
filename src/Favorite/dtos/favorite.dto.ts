import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class FavoriteDTO {
  @IsString()
  @ApiProperty()
  @Type(() => String)
  userId: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  productId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AddressDTO {
  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  AccountId: string;

  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value))
  lat: string;

  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value))
  lng: string;

  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  street: string;

  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => Number(value), { toPlainOnly: true })
  houseNumber: number;

  @IsString()
  @ApiProperty()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  district: string;
}

import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class uploadAddressDTO {
  @IsString()
  @IsNotEmpty()
  AccountId: string;
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  lat: string;
  @IsString()
  lng: string;
  @IsString()
  district: string;
  @IsNumber()
  @Type(() => Number)
  houseNumber: number;
  @IsOptional()
  @IsString()
  obs: string;
  @IsString()
  street: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class editCompanyDTO {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  companyId: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @ApiProperty()
  companyName: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @ApiProperty()
  access: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty()
  district: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  houseNumber: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty()
  lat: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty()
  lng: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty()
  street: string;
}

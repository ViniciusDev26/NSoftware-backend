import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export abstract class createCompanyDTO {
  @Type(() => String)
  @IsString()
  @ApiProperty()
  'companyCode': string;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  'companyName': string;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  'access': string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  'codeEmployee': number;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  'district': string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  'houseNumber': number;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  'street': string;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  'lat': string;

  @Type(() => String)
  @IsString()
  @ApiProperty()
  'lng': string;
}

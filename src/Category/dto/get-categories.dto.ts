import { IsNotEmpty, IsString } from 'class-validator';

export class getCategoriesDTO {
  @IsString()
  @IsNotEmpty()
  companyId: string;
}

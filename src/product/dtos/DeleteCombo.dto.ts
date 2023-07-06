import { IsNotEmpty, IsString } from 'class-validator';

export class deleteComboDTO {
    @IsString()
    @IsNotEmpty()
    id: string;
}

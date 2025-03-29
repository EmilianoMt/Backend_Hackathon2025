import { IsString } from "class-validator";

export class CreateReportDto {
    
    @IsString()
    title: string;

    @IsString()
    ubicacion: string;

    @IsString()
    userId: string; 

    @IsString()
    file: string;

    @IsString()
    analysis: string;
}

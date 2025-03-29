import { IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    
    @IsString()
    title: string;

    @IsString()
    ubicacion: string;

    @IsString()
    userId: string; 

    @IsOptional()
    @IsString()
    file?: string;

    @IsString()
    analysis: string;
}

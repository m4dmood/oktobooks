import { IsNotEmpty, IsNumber, IsString } from "class-validator";

 export class SetStatusDto {
    
    @IsNumber()
    @IsNotEmpty()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    status: 'to-read' | 'reading' | 'read';
 }
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Book } from '../book.entity';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    year: string;

}
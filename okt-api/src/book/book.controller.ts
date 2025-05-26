import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SetStatusDto } from './dto/set-status.dto';
import { Book } from './book.entity';

@Controller('book')
export class BookController {

    constructor(private bookService: BookService) {}

    @Get('all')
    findAll() {
        return this.bookService.findAll();
    }

    @Get('one')
    findOne(@Query('id') id: number) {
        return this.bookService.findOne(id);
    }

    @Get('status')
    findByStatus(@Query('status') status: Book['status']) {
        return this.bookService.searchByStatus(status);
    }
    
    @Post('new')
    create(@Body() dto: CreateBookDto) {
        console.log("Controller receiving onject:\n", dto);
        return this.bookService.create(dto);
    }

    @Patch('set-status')
    setStatus(@Body() dto: SetStatusDto) {
        return this.bookService.update(dto.id, dto.status);
    }

    @Delete('remove')
    remove(@Query('id') id: number) {
        return this.bookService.remove(id);
    }
}

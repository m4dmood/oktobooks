import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}

    // async findByUser(userId: number) {
    //     return await this.bookRepository.find({ where: { user: { id: userId } } });
    // }

    async findAll() {
        return await this.bookRepository.findAndCount();
    }

    async findOne(id: number) {
        return await this.bookRepository.findOne({ where: { id: id } });
    }

    async searchByStatus(status: Book['status']) {
        return await this.bookRepository.findAndCount({ where: { status: status } });
    }

    async create(dto: CreateBookDto) {
        console.log("Saving new book:\n", dto);
        const book = this.bookRepository.create({
            title: dto.title,
            author: dto.author,
            year: dto.year,
            status: 'to-read'
        });

        return await this.bookRepository.save(book);
    }

    async update(id: number, status: 'to-read' | 'reading' | 'read') {
        let book = await this.bookRepository.findOne({ where: { id: id } });
        if (book) {
            book.status = status;
            return await this.bookRepository.save(book);
        } else {
            throw new NotFoundException("Not found");
        }
    }

    async remove(id: number) {
        const toDelete = await this.bookRepository.delete(id);
        if (toDelete.affected === 0) {
            throw new NotFoundException("Not found");
        }
    }
}

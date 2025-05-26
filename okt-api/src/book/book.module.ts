import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [TypeOrmModule.forFeature([Book])]
})
export class BookModule {}

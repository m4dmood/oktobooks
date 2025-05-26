import { User } from 'src/user/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'books' })
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: string;

  @Column()
  status: 'to-read' | 'reading' | 'read';

  /* @ManyToOne(() => User, user => user.books, { eager: false })
  @Column({ name: 'user_id' })
  user: User; */
}

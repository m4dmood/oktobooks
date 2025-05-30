import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    
    constructor(
            @InjectRepository(User)
            private readonly userRepository: Repository<User>
        ) {}


    async findByUsername(username: string) {
        return await this.userRepository.findOne({ where: { username: username } });
    }
}

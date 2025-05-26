import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user/user.entity';
import { UserService } from 'src/user/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}

import { Library } from './../library/library.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Library])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

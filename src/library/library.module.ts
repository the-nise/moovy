import { User } from './../user/user.entity';
import { Library } from './library.entity';
import { MovieClient } from './../clients/movie.client';
import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryController } from './library.controller';
import { LibraryRepository } from './library.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Library])],
  controllers: [LibraryController],
  providers: [LibraryService, MovieClient, LibraryRepository],
})
export class LibraryModule {}

import { User } from './../user/user.entity';
import { Library } from './library.entity';
import { MovieClient } from './../clients/movie.client';
import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryController } from './library.controller';
import { Review } from 'src/reviews/reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Library, Review])],
  controllers: [LibraryController],
  providers: [LibraryService, MovieClient],
})
export class LibraryModule {}

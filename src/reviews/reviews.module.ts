import { FileStorageService } from './file-storage.service';
import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';

import { User } from '../user/user.entity';
import { Library } from '../library/library.entity';
import { Review } from './reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Library, Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService, FileStorageService],
})
export class ReviewsModule {}

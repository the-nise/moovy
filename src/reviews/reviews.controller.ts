import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { Review } from './reviews.entity';
import { ReviewsService } from './reviews.service';
import { Blob } from 'buffer';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async createReview(
    @Body('userId') userId: number,
    @Body('libraryId') libraryId: number,
    @Body('reviewAudio') reviewAudio: Blob,
  ): Promise<Review> {
    return this.reviewsService.createReview({ userId, libraryId, reviewAudio });
  }

  @Delete(':id')
  async removeReview(@Param('id') reviewId: number): Promise<void> {
    return this.reviewsService.removeReview(reviewId);
  }
}

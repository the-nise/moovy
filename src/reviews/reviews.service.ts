import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './reviews.entity';
import { Library } from 'src/library/library.entity';
import { FileStorageService } from './file-storage.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private fileStorageService: FileStorageService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
  ) {}

  async createReview(
    userId: number,
    libraryId: number,
    reviewAudio: Blob,
  ): Promise<Review> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const library = await this.libraryRepository.findOne({
      where: { id: libraryId },
    });
    if (!library) {
      throw new Error(`Library does not contain this movie.`);
    }

    const review = new Review();
    review.user = user;
    review.library = library;
    review.syncStatus = 'pending';

    const audioFilePath = await this.fileStorageService.saveFile(
      reviewAudio,
      `../../content`,
      'reviews',
    );

    review.audioFilePath = audioFilePath;

    return this.reviewRepository.save(review);
  }

  async removeReview(reviewId: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    await this.reviewRepository.remove(review);

    await this.fileStorageService.deleteFile(review.audioFilePath);
  }
}
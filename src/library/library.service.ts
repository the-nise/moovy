/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Library } from './library.entity';
import { MovieClient } from './../clients/movie.client';
import { FileStorageService } from './file-storage.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
    private fileStorageService: FileStorageService,
  ) {}
  async findAllMoviesAddedToLibrary({
    userId,
  }: {
    userId: number;
  }): Promise<Library[]> {
    try {
      return this.libraryRepository
        .createQueryBuilder()
        .where({ user: userId })
        .getMany();
    } catch (error) {
      console.error(`Error finding movies in library: ${error.message}`);
    }
  }

  async findOneMovie({
    userId,
    movieId,
  }: {
    userId: number;
    movieId: string;
  }): Promise<Library | undefined> {
    return this.libraryRepository
      .createQueryBuilder()
      .where({ user: userId, movie: movieId })
      .getOne();
  }

  async addMovieToLibrary({
    movieId,
    userId,
  }: {
    movieId: string;
    userId: number;
  }): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error(`User with ID ${userId} does not exist.`);

    const movieInLibrary = await this.libraryRepository
      .createQueryBuilder('library')
      .where('library.movie = :movieId', { movieId })
      .andWhere('library.userId = :userId', { userId })
      .getOne();
    if (movieInLibrary) throw new Error('Movie is already in the library');

    const movieClient = new MovieClient();
    const movie = await movieClient.getMovie(movieId);

    const newMovie = new Library();
    newMovie.user = user;
    newMovie.movie = movie.imdbID;
    newMovie.hasReview = false;
    await this.libraryRepository.save(newMovie);
  }

  async removeMovieFromLibrary({
    userId,
    movieId,
  }: {
    userId: number;
    movieId: string;
  }): Promise<void> {
    const movieInLibrary = await this.libraryRepository
      .createQueryBuilder('library')
      .where('library.movie = :movieId', { movieId })
      .andWhere('library.userId = :userId', { userId })
      .getOne();
    if (!movieInLibrary) {
      throw new Error('Movie is not in the library');
    }

    await this.libraryRepository
      .createQueryBuilder()
      .delete()
      .from(Library)
      .where('id = :id', { id: movieInLibrary.id })
      .execute();
  }

  async createReview({
    userId,
    movieId,
    file,
  }: {
    userId: number;
    movieId: string;
    file: Express.Multer.File;
  }): Promise<Library> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const library = await this.libraryRepository.findOne({
      where: { movie: movieId },
    });
    if (!library) {
      throw new Error(`Library does not contain this movie.`);
    }

    library.user = user;
    library.syncStatus = 'PENDING';
    await this.libraryRepository.save(library);

    try {
      const audioFilePath = `${path.resolve()}\\content\\${userId}.${movieId}.${
        file.originalname
      }`;
      fs.writeFileSync(audioFilePath, file.buffer);

      library.hasReview = true;
      library.audioFilePath = audioFilePath;
      library.syncStatus = 'SYNCED';

      await this.libraryRepository.save(library);
    } catch (error) {
      library.syncStatus = 'FAILED_SYNC';
      await this.libraryRepository.save(library);

      throw new Error(`Couldnt save movie to library, error: ${error}`);
    }
    return library;
  }

  async removeReview({
    userId,
    movieId,
  }: {
    movieId: string;
    userId: number;
  }): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const library = await this.libraryRepository.findOne({
      where: { movie: movieId, user: { id: userId } },
    });
    if (!library) {
      throw new Error('Movie is not in the library');
    }

    try {
      fs.unlinkSync(library.audioFilePath);

      library.hasReview = false;
      library.audioFilePath = null;
      library.syncStatus = null;
      await this.libraryRepository.update({ id: library.id }, library);
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting your review, try again.
        Error: ${error}`,
      );
    }
  }

  async rateMovie() {}

  async derateMovie() {}
}

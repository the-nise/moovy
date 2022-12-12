import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Library } from './library.entity';
import { MovieClient } from './../clients/movie.client';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
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
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const movieClient = new MovieClient();
    const movie = await movieClient.getMovie(movieId);

    const isMovieInLibrary = await this.libraryRepository.findOne({
      where: { movie: movieId },
    });
    if (isMovieInLibrary) {
      throw new Error('Movie is already in the library');
    }

    const newMovie = new Library();
    newMovie.user = user;
    newMovie.movie = movie.imdbID;
    await this.libraryRepository.save(newMovie);
  }

  async removeMovieFromLibrary({
    movieId,
    userId,
  }: {
    movieId: string;
    userId: number;
  }): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const movieInLibrary = await this.libraryRepository.findOne({
      where: { movie: movieId, user: { id: userId } },
    });
    if (!movieInLibrary) {
      throw new Error('Movie is not in the library');
    }

    await this.libraryRepository.delete(movieInLibrary);
  }
}

import { Repository } from 'typeorm';
import { Library } from './library.entity';

export class LibraryRepository extends Repository<Library> {
  async findAllMoviesAddedToLibrary(userId: number): Promise<Library[]> {
    return this.createQueryBuilder().where({ user: userId }).getMany();
  }

  async findOneMovie(
    userId: number,
    movieId: string,
  ): Promise<Library | undefined> {
    return this.createQueryBuilder()
      .where({ user: userId, movie: movieId })
      .getOne();
  }
}

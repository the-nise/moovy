import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Repository } from 'typeorm';
import { Library } from '../library/library.entity';
import { Movie } from '../models/movie.model';

@Injectable()
export class LibraryService {
  create(createLibraryDto: CreateLibraryDto) {
    return 'This action adds a new library';
  }

  async addMovie(user: User, movie: Movie): Promise<void> {
    const library = await this.libraryRepository.findOne({ where: { user } });
    if (library) {
      library.movies.push(movie);
      await this.libraryRepository.save(library);
    }
  }

  findAll() {
    return `This action returns all library`;
  }

  findOne(id: number) {
    return `This action returns a #${id} library`;
  }

  update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return `This action updates a #${id} library`;
  }

  remove(id: number) {
    return `This action removes a #${id} library`;
  }
}

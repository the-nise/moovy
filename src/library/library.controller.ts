import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { Library } from './library.entity';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post(':userId')
  async addMovieToLibrary(
    @Param('userId') userId: number,
    @Body('movieId') movieId: string,
  ): Promise<void> {
    try {
      return this.libraryService.addMovieToLibrary({ movieId, userId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  findAllMoviesAddedToLibrary(
    @Param('userId') userId: number,
  ): Promise<Library[]> {
    try {
      return this.libraryService.findAllMoviesAddedToLibrary({ userId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId/:movieId')
  async findOneMovie(
    @Param('userId') userId: number,
    @Param('movieId') movieId: string,
  ): Promise<Library | undefined> {
    try {
      return this.libraryService.findOneMovie({ userId, movieId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':userId/:movieId')
  async removeMovieFromLibrary(
    @Param('userId') userId: number,
    @Param('movieId') movieId: string,
  ): Promise<void> {
    try {
      return this.libraryService.removeMovieFromLibrary({ movieId, userId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

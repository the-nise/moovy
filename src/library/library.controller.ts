import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { Library } from './library.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';

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
      throw new BadRequestException(error);
    }
  }

  @Get(':userId')
  findAllMoviesAddedToLibrary(
    @Param('userId') userId: number,
  ): Promise<Library[]> {
    try {
      return this.libraryService.findAllMoviesAddedToLibrary({ userId });
    } catch (error) {
      throw new BadRequestException(error);
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
      throw new BadRequestException(error);
    }
  }

  @Put('upload/:userId/:movieId')
  @UseInterceptors(FileInterceptor('file'))
  async createReview(
    @Param('userId') userId: number,
    @Param('movieId') movieId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Library> {
    try {
      return this.libraryService.createReview({ userId, movieId, file });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':userId/:movieId')
  async removeReview(
    @Param('userId') userId: number,
    @Param('movieId') movieId: string,
  ): Promise<void> {
    return this.libraryService.removeReview({ userId, movieId });
  }

  @Delete(':userId/:movieId')
  async removeMovieFromLibrary(
    @Param('userId') userId: number,
    @Param('movieId') movieId: string,
  ): Promise<void> {
    try {
      return this.libraryService.removeMovieFromLibrary({ userId, movieId });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

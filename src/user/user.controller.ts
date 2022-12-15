import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create({ createUserDto });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne({ id: +id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    try {
      await this.userService.update({ id, updateUserDto });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.userService.remove(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

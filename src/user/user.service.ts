import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({
    createUserDto,
  }: {
    createUserDto: CreateUserDto;
  }): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new Error('User already registered');
    }
    const user = new User();
    Object.assign(user, { ...createUserDto } as User);
    const dbUser = await this.userRepository.save(user);
    return dbUser;
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find({
        select: ['id', 'firstName', 'lastName', 'email', 'isOwner'],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne({ id }: { id: number }) {
    try {
      return this.userRepository.findOne({
        where: { id: id },
        select: ['id', 'firstName', 'lastName', 'email', 'isOwner'],
      });
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async update({
    id,
    updateUserDto,
  }: {
    id: number;
    updateUserDto: UpdateUserDto;
  }): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    try {
      Object.assign(user, { ...updateUserDto } as User);
      await this.userRepository.save(user);
    } catch (error) {
      throw new Error(
        `Doesnt match given user's object format. Error: ${error}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }
}

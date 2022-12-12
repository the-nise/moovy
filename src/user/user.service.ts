import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Library } from '../library/library.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new Error('User already registered');
    }

    const library = await new Library();

    const user = await new User();
    Object.assign(user, { ...createUserDto } as User);
    const dbUser = await this.userRepository.save(user);

    library.user = dbUser;

    await this.libraryRepository.save(library);
    return dbUser;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User doesnt exist');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

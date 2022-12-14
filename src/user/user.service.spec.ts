import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'gato@email.com',
        password: 'gato-password',
        firstName: 'Gato',
        lastName: 'Miau',
        isOwner: true,
      };

      const user = await service.create({ createUserDto });

      expect(user).toMatchObject(createUserDto);
    });

    it('should throw an error if the user already exists', async () => {
      const userData = {
        email: 'gato@email.com',
        password: 'test-password',
        firstName: 'Gato',
        lastName: 'Miau',
        isOwner: true,
      };
      const user = new User();
      Object.assign(user, userData);

      await userRepository.save(user);

      try {
        await service.create({ createUserDto: userData });
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('User already registered');
      }
    });
  });
});

import { Test } from '@nestjs/testing';
import { UserController } from '../users.controller';
import { CreateUserUseCase } from '../useCases/create-user.usecase';
import { CreateUserDTO } from '../DTO/create-user.dto';
import { IUserRepository } from '../repository/interface/user.repository.interface';
import { JwtModule } from '@nestjs/jwt';
import { IPasswordHash } from '../../utils/hash/passwordHash.interface';
import { UploadAvatarUserUseCase } from '../useCases/upload-avatar-user.usecase';
import { IStorage } from '../../utils/storage/storage';
import { randomUUID } from 'crypto';

describe('User Controller', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        UploadAvatarUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: IStorage,
          useValue: {
            upload: jest.fn(),
          },
        },
        {
          provide: IPasswordHash,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('Should be able to create a new User', async () => {
    const body: CreateUserDTO = {
      email: 'email@test.com',
      name: 'name_test',
      password: '12345',
      username: 'username_test',
    };

    jest.spyOn(userRepository, 'create').mockResolvedValue({
      ...body,
      id: randomUUID(),
    });
    const result = await userController.createUser(body);

    expect(result).toHaveProperty('username');
  });
});

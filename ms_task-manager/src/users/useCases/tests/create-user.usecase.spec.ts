import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.usecase';
import { CreateUserDTO } from '../../DTO/create-user.dto';
import { IUserRepository } from '../../repository/interface/user.repository.interface';
import { IPasswordHash } from '../../../utils/hash/passwordHash.interface';
import { UserMemoryRepository } from '../../repository/user.memory.repository';

describe('Create User useCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserMemoryRepository,
        },
        {
          provide: IPasswordHash,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('Should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      email: 'email@test.com',
      name: 'test',
      password: '1234',
      username: 'test',
    };

    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('id');
  });

  it('Should not be able to create a new user if username already exists', async () => {
    const userMock: CreateUserDTO = {
      email: 'emaial@test.com',
      name: 'test',
      password: '1234',
      username: 'testa',
    };

    await createUserUseCase.execute(userMock);

    expect(createUserUseCase.execute(userMock)).rejects.toThrowError();
  });
});

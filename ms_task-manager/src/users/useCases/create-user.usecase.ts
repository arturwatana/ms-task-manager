import { CreateUserDTO } from '../DTO/create-user.dto';
import { User } from '../model/user.model';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { IUserRepository } from '../repository/interface/user.repository.interface';
import { IPasswordHash } from '../../utils/hash/passwordHash.interface';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);
  constructor(
    private userRepository: IUserRepository,
    private passwordHash: IPasswordHash,
  ) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByUsernameOrEmail(
      data,
    );
    if (userAlreadyExists) {
      this.logger.error(`User ${data.username} already exists...`, data);
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }

    const user = User.create(data);

    user.password = await this.passwordHash.hash(user.password);

    return await this.userRepository.create(user);
  }
}

import { PrismaService } from 'src/utils/db/prisma.service';
import { CreateUserDTO } from '../DTO/create-user.dto';
import { User } from '../model/user.model';
import { IUserRepository } from './interface/user.repository.interface';
import { Injectable } from '@nestjs/common';
import BcryptHash from 'src/utils/hash/bcrypt.hash';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(
    private prismaService: PrismaService,
    private passwordHash: BcryptHash,
  ) {}

  async create(data: User): Promise<User> {
    return await this.prismaService.user.create({
      data,
    });
  }
  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    return user || null;
  }
  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    return user || null;
  }

  async findByUsernameOrEmail(data: CreateUserDTO) {
    const userAlreadyExists = this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.email,
          },
        ],
      },
    });

    return userAlreadyExists;
  }

  async comparePasswords(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await this.passwordHash.compare(password, userPassword);
  }

  async uploadAvatar(id: string, path: string): Promise<void> {
    await this.prismaService.user.update({
      data: {
        avatarUrl: path,
      },
      where: {
        id,
      },
    });
  }
}

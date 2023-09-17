import { CreateUserDTO } from '../DTO/create-user.dto';
import { User } from '../model/user.model';
import { IUserRepository } from './interface/user.repository.interface';

export class UserMemoryRepository implements IUserRepository {
  users: User[] = [];

  async create(data: User): Promise<User> {
    this.users.push(data);
    return data;
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByUsername(username: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async findByUsernameOrEmail(data: CreateUserDTO): Promise<User> {
    const findedUser = this.users.find(
      (user) => user.username === data.username || user.email === data.email,
    );

    return findedUser || null;
  }
  comparePasswords(password: string, userPassword: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  uploadAvatar(id: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

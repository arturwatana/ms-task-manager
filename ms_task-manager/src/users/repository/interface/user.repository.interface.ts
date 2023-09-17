import { CreateUserDTO } from '../../DTO/create-user.dto';
import { User } from '../../model/user.model';

export abstract class IUserRepository {
  abstract create(data: User): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findByUsernameOrEmail(data: CreateUserDTO): Promise<User | null>;
  abstract comparePasswords(
    password: string,
    userPassword: string,
  ): Promise<boolean>;
  abstract uploadAvatar(id: string, path: string): Promise<void>;
}

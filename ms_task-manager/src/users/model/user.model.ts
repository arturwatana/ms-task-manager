import { randomUUID } from 'crypto';
import { CreateUserDTO } from '../DTO/create-user.dto';

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;

  private constructor(data: CreateUserDTO) {
    this.id = randomUUID();
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
  }

  static create(data: CreateUserDTO) {
    const user = new User(data);
    return user;
  }
}

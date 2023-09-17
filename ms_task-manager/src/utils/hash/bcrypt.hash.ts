import * as bcrypt from 'bcrypt';
import { IPasswordHash } from './passwordHash.interface';

export default class BcryptHash implements IPasswordHash {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}

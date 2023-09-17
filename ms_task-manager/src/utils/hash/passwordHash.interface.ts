export abstract class IPasswordHash {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, userPassword: string): Promise<boolean>;
}

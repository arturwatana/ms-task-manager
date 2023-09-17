import { FileDTO } from 'src/users/DTO/create-user.dto';

export abstract class IStorage {
  abstract upload(file: FileDTO, folder: string): Promise<any>;
}

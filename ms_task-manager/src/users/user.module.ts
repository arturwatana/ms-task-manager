import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';
import { UserController } from './users.controller';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import BcryptHash from 'src/utils/hash/bcrypt.hash';
import { IUserRepository } from './repository/interface/user.repository.interface';
import { UserPrismaRepository } from './repository/user.repository';
import { UploadAvatarUserUseCase } from './useCases/upload-avatar-user.usecase';
import { IStorage } from 'src/utils/storage/storage';
import { SupabaseStorage } from 'src/utils/storage/supabase.storage';
import { IPasswordHash } from '../utils/hash/passwordHash.interface';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    BcryptHash,
    UploadAvatarUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
    {
      provide: IPasswordHash,
      useClass: BcryptHash,
    },
  ],
  exports: [
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}

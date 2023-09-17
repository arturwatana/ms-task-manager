import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/db/prisma.service';
import { TaskUserController } from './task-user.controller';
import { ITaskUserRepository } from './repositories/task-user.repository';
import { TaskUserPrismaRepository } from './repositories/implementations/task-user.prisma.repository';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';

@Module({
  imports: [],
  controllers: [TaskUserController],
  providers: [
    PrismaService,
    CreateTaskUserUseCase,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class TaskUserModule {}

import { Module } from '@nestjs/common';
import { NotificationTaskUserSchedule } from './notification-task-user.schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { ITaskUserRepository } from '../../tasks/repositories/task-user.repository';
import { TaskUserPrismaRepository } from '../../tasks/repositories/implementations/task-user.prisma.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    NotificationTaskUserSchedule,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['127.0.0.1:9092'],
          },
          consumer: {
            groupId: 'gp_app_task_manager',
          },
        },
      },
    ]),
  ],
})
export class ScheduleTaskModule {}

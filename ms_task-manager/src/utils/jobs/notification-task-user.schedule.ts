import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ITaskUserRepository } from 'src/tasks/repositories/task-user.repository';

type MessageDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskUserRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}
  @Cron(CronExpression.EVERY_12_HOURS)
  async getAllTasksDay() {
    const allTasks = await this.taskRepository.findAllByDay();
    if (allTasks) {
      allTasks.forEach(async (task) => {
        const message: MessageDTO = {
          description: task.task.description,
          email: task.user.email,
          endAt: task.task.endAt,
          startAt: task.task.startAt,
          name: task.user.name,
          title: task.task.title,
        };
        await this.notificationClient.emit('task_notification', message);
      });
    }
  }
}

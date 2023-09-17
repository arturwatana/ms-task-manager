import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from 'src/tasks/dto/task-user.dto';
import { ITaskUserRepository } from '../task-user.repository';
import { PrismaService } from 'src/utils/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from '../../../utils/dateFormat/date';

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prismaService: PrismaService) {}
  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    return await this.prismaService.taskUser.create({
      data: {
        task: {
          create: {
            description: data.description,
            endAt: data.endAt,
            priority: data.priority,
            startAt: data.startAt,
            status: data.status,
            title: data.title,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }
  async findAllByDay(): Promise<TaskUserNotificationDTO[]> {
    const allTasks = await this.prismaService.taskUser.findMany({
      where: {
        AND: [
          {
            task: {
              startAt: {
                gte: startOfDay(),
                lte: endOfDay(),
              },
            },
          },
        ],
      },
      include: {
        task: {
          select: {
            startAt: true,
            endAt: true,
            title: true,
            description: true,
          },
        },
        user: true,
      },
    });
    return allTasks;
  }
}

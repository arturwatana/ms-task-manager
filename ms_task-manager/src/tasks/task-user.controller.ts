import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskUserSchemaDTO } from './dto/task-user.schema';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserRequestWithoutUserId } from './dto/task-user.dto';
@Controller('/tasks')
export class TaskUserController {
  constructor(private taskUserUseCase: CreateTaskUserUseCase) {}
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(CreateTaskUserSchemaDTO))
  @Post('/')
  async create(
    @Body() data: TaskUserRequestWithoutUserId,
    @Request() req: any,
  ) {
    return this.taskUserUseCase.execute({
      ...data,
      userId: req.user.sub,
    });
  }
}

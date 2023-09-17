import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { CreateUserDTO, FileDTO } from './DTO/create-user.dto';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import {
  CreateUserResponseSchemaDTO,
  createUserSchema,
} from './model/user.schema';
import { CreateUserValidationPipe } from './pipes/create-user.pipes';
import { IUserRepository } from './repository/interface/user.repository.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarUserUseCase } from './useCases/upload-avatar-user.usecase';
import { AuthGuard } from '../auth/auth.guard';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

const schemaUserSwagger = zodToOpenAPI(createUserSchema);

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userRepository: IUserRepository,
    private readonly uploadAvatartUserUseCase: UploadAvatarUserUseCase,
  ) {}
  @Get()
  @UseGuards(AuthGuard)
  async getUsers() {
    return this.userRepository.getAll();
  }

  @Post()
  @ApiBody({
    description: 'Criacao de um usuario',
    schema: schemaUserSwagger,
  })
  @ApiResponse({ status: 201, description: 'Usuario cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Usuario já cadastrado' })
  @UsePipes(new CreateUserValidationPipe(createUserSchema))
  async createUser(@Body() data: CreateUserDTO) {
    const user = await this.createUserUseCase.execute(data);
    return CreateUserResponseSchemaDTO.parse(user);
  }

  @Put('/avatar')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const result = await this.uploadAvatartUserUseCase.execute({
      file,
      idUser: req.user.sub,
    });
    return result;
  }
}

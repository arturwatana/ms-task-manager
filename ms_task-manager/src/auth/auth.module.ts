import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IUserRepository } from 'src/users/repository/interface/user.repository.interface';
import { UserPrismaRepository } from 'src/users/repository/user.repository';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTCONSTANTS,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

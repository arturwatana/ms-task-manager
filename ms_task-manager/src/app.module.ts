import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskUserModule } from './tasks/tasks-user.module';
import { ScheduleTaskModule } from './utils/jobs/schedule.module';
import { PrismaModule } from './utils/db/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    TaskUserModule,
    ScheduleTaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

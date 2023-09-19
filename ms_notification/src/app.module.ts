import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'estefania16@ethereal.email',
          pass: 'JWxvgwtyrA9gDj6gcT',
        },
        secure: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

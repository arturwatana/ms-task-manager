import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

type NotificationDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  @EventPattern('task_notification')
  async taskNotication(data: NotificationDTO) {
    const result = await this.mailerService.sendMail({
      to: data.email,
      html: `
        <body>
        <h1>Olá ${data.name}</h1>

        <span> Voce tem uma tarefa para hoje</span></br>
        <span> Titulo: ${data.title}</span></br>
        <span> Descricao: ${data.description}</span></br>
        <span> Inicio: ${data.startAt}</span></br>
        <span> Fim: ${data.endAt}</span>

        </body>
      `,
      subject: 'Notificacao de tarefa',
      from: 'taskmanager@nestjscurso.com.br',
    });
    console.log(result);
  }
}

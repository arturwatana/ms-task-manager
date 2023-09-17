// import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Title is required',
  }),
  priority: z.enum(['MEDIA', 'BAIXA', 'ALTA'], {
    required_error: 'Priority is required',
  }),
  status: z.enum(['PENDENTE', 'ANDAMENTO', 'CONCLUIDA'], {
    required_error: 'Status is required',
  }),
  startAt: z
    .string({
      required_error: 'Start date is required',
    })
    .transform((item) => new Date(item)),
  endAt: z
    .string({
      required_error: 'End date is required',
    })
    .transform((item) => new Date(item)),
});

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) {}

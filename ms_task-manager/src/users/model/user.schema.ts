import { z } from 'zod';

export const createUserSchema = z
  .object({
    username: z.string({
      required_error: 'Username is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
  .required();

export type CreateUserZodSchema = z.infer<typeof createUserSchema>;

export const CreateUserResponseSchemaDTO = createUserSchema.omit({
  password: true,
});

export type CreateUserResponseSchemaDTO = z.infer<
  typeof CreateUserResponseSchemaDTO
>;

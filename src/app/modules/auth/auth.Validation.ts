import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is require!',
    }),
    password: z.string({
      required_error: 'Password is require!',
    }),
  }),
});

export const LoginValidation = {
  loginZodSchema,
};

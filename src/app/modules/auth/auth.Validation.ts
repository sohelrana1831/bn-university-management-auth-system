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
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is require!',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};

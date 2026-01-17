import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required', invalid_type_error: 'Password must be a string' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
export type TLoginInput = z.infer<typeof loginSchema>;

export const loginFormSchema = toTypedSchema(loginSchema);

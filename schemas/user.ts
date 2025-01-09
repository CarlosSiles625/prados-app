import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3).max(255),
  cedula: z.string(),
  password: z.string(),
});

export type UserForm = z.infer<typeof UserSchema>;

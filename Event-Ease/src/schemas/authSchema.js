import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be of atleast 3 characters" }),
  email: z.email({ message: `Invalid email adress` }),
  password: z
    .string()
    .min(6, { message: "Password must be of atleast 3 characters" }),
});

export const loginSchema = z.object({
  email: z.email({ message: `Invalid email adress` }),
  password: z
    .string()
    .min(6, { message: "Password must be of atleast 3 characters" }),
});

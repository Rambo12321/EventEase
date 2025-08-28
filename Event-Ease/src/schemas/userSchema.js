import z from "zod";

export const userSchema = z.object({
  email: z.email({ message: `Invalid email adress` }),
  password: z
    .string()
    .min(6, { message: "Password must be of atleast 6 characters" }),
  name: z
    .string()
    .min(3, { message: "name should be of atleast 3 characters" }),
  role: z
    .enum(["ADMIN", "USER", "ORGANIZER"], {
      message: "Wrong Role Provided",
    })
    .optional(),
});

export const updateUserSchema = userSchema.partial();
